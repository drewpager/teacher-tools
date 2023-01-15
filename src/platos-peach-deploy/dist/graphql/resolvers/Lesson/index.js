"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        lesson: (_root, { id }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const lesson = yield db.lessons.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!lesson) {
                throw new Error("Lesson cannot be found!");
            }
            return lesson;
        }),
        allLessons: (_root, { page, limit }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                total: 0,
                result: [],
                totalCount: 0,
            };
            let cursor = yield db.lessons.find({});
            const count = cursor;
            cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
            cursor = cursor.limit(limit);
            data.total = yield cursor.count();
            data.result = yield cursor.toArray();
            data.totalCount = yield count.count();
            return data;
        }),
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
        creator: (playlist, _args, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const creator = yield db.users.findOne({ _id: playlist.creator });
                if (!creator) {
                    throw new Error("Creator can't be found!");
                }
                const viewer = yield (0, index_1.authorize)(db, req);
                if (viewer && viewer._id === playlist.creator) {
                    playlist.authorized = true;
                }
                return creator._id;
            }
            catch (err) {
                throw new Error(`You are either not the creator or not logged in: ${err}!`);
            }
        }),
    },
    Mutation: {
        createLesson: (viewer, { input }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const id = new mongodb_1.ObjectId();
            //TODO: Fix Viewer resolution vs hard coded id
            if (viewer && viewer._id) {
                const viewerId = viewer._id;
                console.log("ViewerId: ", viewerId);
            }
            // const viewerId = viewer && viewer.id ? viewer.id : "116143759549242008910";
            try {
                verifyCreateLessonInput(input);
                const insertResult = yield db.lessons.insertOne(Object.assign(Object.assign({ _id: id }, input), { 
                    // creator: viewerId
                    creator: "116143759549242008910" }));
                const insertedResult = insertResult
                    ? yield db.lessons.findOne({ _id: insertResult.insertedId })
                    : false;
                if (!insertedResult) {
                    throw new Error("Lesson is undefined");
                }
                yield db.users.updateOne({ _id: "116143759549242008910" }, { $push: { lessons: insertedResult } });
                return insertedResult;
            }
            catch (e) {
                throw new Error(`Failed to insert lesson: ${e}`);
            }
        }),
        deleteLesson: (viewer, { id }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const deletedLesson = yield db.lessons.deleteOne({
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
        }),
    },
    DateScalar: GraphQLDate,
};
