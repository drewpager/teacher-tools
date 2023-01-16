"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonResolvers = void 0;
const index_1 = require("../../../lib/utils/index");
const mongodb_1 = require("mongodb");
const graphql_1 = require("graphql");
const dateRegex = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])|-[1-9]\d{0,11}|[1-9]\d{0,4}/;
const validate = (value) => {
    if (typeof value !== "string") {
        throw new Error(`Value is not a string ${value}`);
    }
    if (!dateRegex.test(value)) {
        throw new Error(`Value is not formatted as a date ${value}`);
    }
    return value;
};
const parseLiteral = (ast) => {
    if (ast.kind !== graphql_1.Kind.STRING) {
        throw new Error(`Query error: can only parse strings but got ${ast.kind}`);
    }
    return validate(ast.value);
};
const GraphQLDateConfig = {
    name: "DateScalar",
    description: "A valid date object",
    serialize: validate,
    parseValue: validate,
    parseLiteral,
};
const GraphQLDate = new graphql_1.GraphQLScalarType(GraphQLDateConfig);
const verifyCreateLessonInput = ({ title, category, meta, video, startDate, endDate, }) => {
    if (title.length > 160) {
        throw new Error("Title must not exceed 160 characters in length!");
    }
    if (category.length < 1) {
        throw new Error("Please add at least one category.");
    }
    if (!dateRegex.test(startDate)) {
        throw new Error("Please format date as Year-Month-Day (YYYY-MM-DD)");
    }
    if (!dateRegex.test(endDate)) {
        console.log("ERROR WILL ROBINSON!");
        throw new Error("Please format date as Year-Month-Day (YYYY-MM-DD)");
    }
    // if (meta.length < 160) {
    //   throw new Error("Please add more information to provide students with context about this lesson.")
    // }
    if (video.length < 1) {
        throw new Error("Please add a video!");
    }
};
exports.lessonResolvers = {
    Query: {
        lesson: async (_root, { id }, { db }) => {
            const lesson = await db.lessons.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!lesson) {
                throw new Error("Lesson cannot be found!");
            }
            return lesson;
        },
        allLessons: async (_root, { page, limit }, { db }) => {
            const data = {
                total: 0,
                result: [],
                totalCount: 0,
            };
            let cursor = await db.lessons.find({});
            const count = cursor;
            cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
            cursor = cursor.limit(limit);
            data.total = await cursor.count();
            data.result = await cursor.toArray();
            data.totalCount = await count.count();
            return data;
        },
    },
    Lesson: {
        id: (lesson) => {
            return lesson._id;
        },
    },
    Playlist: {
        id: (playlist) => {
            return playlist._id;
        },
        creator: async (playlist, _args, { db, req }) => {
            try {
                const creator = await db.users.findOne({ _id: playlist.creator });
                if (!creator) {
                    throw new Error("Creator can't be found!");
                }
                const viewer = await (0, index_1.authorize)(db, req);
                if (viewer && viewer._id === playlist.creator) {
                    playlist.authorized = true;
                }
                return creator._id;
            }
            catch (err) {
                throw new Error(`You are either not the creator or not logged in: ${err}!`);
            }
        },
    },
    Mutation: {
        createLesson: async (viewer, { input }, { db }) => {
            const id = new mongodb_1.ObjectId();
            //TODO: Fix Viewer resolution vs hard coded id
            if (viewer && viewer._id) {
                const viewerId = viewer._id;
                console.log("ViewerId: ", viewerId);
            }
            // const viewerId = viewer && viewer.id ? viewer.id : "116143759549242008910";
            try {
                verifyCreateLessonInput(input);
                const insertResult = await db.lessons.insertOne({
                    _id: id,
                    ...input,
                    // creator: viewerId
                    creator: "116143759549242008910",
                });
                const insertedResult = insertResult
                    ? await db.lessons.findOne({ _id: insertResult.insertedId })
                    : false;
                if (!insertedResult) {
                    throw new Error("Lesson is undefined");
                }
                await db.users.updateOne({ _id: "116143759549242008910" }, { $push: { lessons: insertedResult } });
                return insertedResult;
            }
            catch (e) {
                throw new Error(`Failed to insert lesson: ${e}`);
            }
        },
        deleteLesson: async (viewer, { id }, { db }) => {
            try {
                const deletedLesson = await db.lessons.deleteOne({
                    _id: new mongodb_1.ObjectId(id),
                });
                if (!deletedLesson) {
                    throw new Error("Failed to delete lesson");
                }
                return deletedLesson.acknowledged;
            }
            catch (error) {
                throw new Error(`Failed to start deleting lesson: ${error}`);
            }
        },
    },
    DateScalar: GraphQLDate,
};
