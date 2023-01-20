"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.quizResolvers = {
    Query: {
        quiz: async (_root, { id }, { db }) => {
            const quiz = await db.quizzes.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!quiz) {
                throw new Error("Failed to query quiz");
            }
            return quiz;
        },
        allquizzes: async (_root, { limit, page }, { db }) => {
            const data = {
                total: 0,
                result: [],
                totalCount: 0
            };
            let cursor = await db.quizzes.find({});
            const count = cursor;
            cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
            cursor = cursor.limit(limit);
            data.total = await cursor.count();
            data.result = await cursor.toArray();
            data.totalCount = await count.count();
            return data;
        },
    },
    Quiz: {
        id: (quiz) => {
            return quiz._id;
        }
    },
    Mutation: {
        createQuiz: async (_root, { input }, { db }) => {
            const id = new mongodb_1.ObjectId();
            try {
                const insertQuiz = await db.quizzes.insertOne({
                    _id: id,
                    ...input
                });
                const insertedQuiz = insertQuiz ? await db.quizzes.findOne({ _id: insertQuiz.insertedId }) : false;
                if (!insertedQuiz) {
                    throw new Error(`Failed to insert quiz!`);
                }
                return insertedQuiz;
            }
            catch (err) {
                throw new Error(`Failed with error: ${err}`);
            }
        }
    }
};
