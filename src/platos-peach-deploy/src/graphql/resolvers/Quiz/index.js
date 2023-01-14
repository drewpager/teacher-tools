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
exports.quizResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.quizResolvers = {
    Query: {
        quiz: (_root, { id }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const quiz = yield db.quizzes.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!quiz) {
                throw new Error("Failed to query quiz");
            }
            return quiz;
        }),
        allquizzes: (_root, { limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                total: 0,
                result: [],
                totalCount: 0
            };
            let cursor = yield db.quizzes.find({});
            const count = cursor;
            cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
            cursor = cursor.limit(limit);
            data.total = yield cursor.count();
            data.result = yield cursor.toArray();
            data.totalCount = yield count.count();
            return data;
        }),
    },
    Quiz: {
        id: (quiz) => {
            return quiz._id;
        }
    },
    Mutation: {
        createQuiz: (_root, { input }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const id = new mongodb_1.ObjectId();
            try {
                const insertQuiz = yield db.quizzes.insertOne(Object.assign({ _id: id }, input));
                const insertedQuiz = insertQuiz ? yield db.quizzes.findOne({ _id: insertQuiz.insertedId }) : false;
                if (!insertedQuiz) {
                    throw new Error(`Failed to insert quiz!`);
                }
                return insertedQuiz;
            }
            catch (err) {
                throw new Error(`Failed with error: ${err}`);
            }
        })
    }
};
