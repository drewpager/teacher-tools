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
exports.userResolvers = void 0;
const utils_1 = require("../../../lib/utils/");
exports.userResolvers = {
    Query: {
        user: (_root, { id }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield db.users.findOne({ _id: id });
                if (!user) {
                    throw new Error("User can't be found");
                }
                const viewer = yield (0, utils_1.authorize)(db, req);
                if (viewer && viewer._id === user._id) {
                    user.authorized = true;
                }
                return user;
            }
            catch (error) {
                throw new Error(`Failed to query user: ${error}`);
            }
        }),
    },
    User: {
        id: (user) => {
            return user._id;
        },
        hasPayment: (user) => {
            return Boolean(user.paymentId);
        },
        playlists: (user, { limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // if (!user.authorized) {
                //   return null;
                // }
                const data = {
                    total: 0,
                    result: [],
                    totalCount: 0,
                };
                let cursor = yield db.playlists.find({ creator: { $in: [user._id] } });
                const countTotal = yield db.playlists.find({
                    creator: { $in: [user._id] },
                });
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = yield cursor.count();
                data.result = yield cursor.toArray();
                data.totalCount = yield countTotal.count();
                return data;
            }
            catch (e) {
                throw new Error(`Failed to query user playlists: ${e}`);
            }
        }),
        lessons: (user, { limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = {
                    total: 0,
                    result: [],
                    totalCount: 0,
                };
                let cursor = yield db.lessons.find({
                    creator: { $in: [user._id] },
                });
                const totalCount = yield db.lessons.find({
                    creator: { $in: [user._id] },
                });
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = yield cursor.count();
                data.result = yield cursor.toArray();
                data.totalCount = yield totalCount.count();
                // if (data.total === 0) {
                //   return null;
                // }
                return data;
            }
            catch (e) {
                throw new Error(`Failed to query user lessons: ${e}`);
            }
        }),
        quizzes: (user, { limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = {
                    total: 0,
                    result: [],
                    totalCount: 0,
                };
                let cursor = yield db.quizzes.find({
                    creator: { $in: [user._id] },
                });
                const totalCount = yield db.quizzes.find({
                    creator: { $in: [user._id] },
                });
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = yield cursor.count();
                data.result = yield cursor.toArray();
                data.totalCount = yield totalCount.count();
                return data;
            }
            catch (e) {
                throw new Error(`Failed to query quizzes ${e}`);
            }
        }),
    },
};
