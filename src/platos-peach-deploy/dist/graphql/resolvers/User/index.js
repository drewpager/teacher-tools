"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const utils_1 = require("../../../lib/utils/");
exports.userResolvers = {
    Query: {
        user: async (_root, { id }, { db, req }) => {
            try {
                const user = await db.users.findOne({ _id: id });
                if (!user) {
                    throw new Error("User can't be found");
                }
                const viewer = await (0, utils_1.authorize)(db, req);
                if (viewer && viewer._id === user._id) {
                    user.authorized = true;
                }
                return user;
            }
            catch (error) {
                throw new Error(`Failed to query user: ${error}`);
            }
        },
    },
    User: {
        id: (user) => {
            return user._id;
        },
        hasPayment: (user) => {
            return Boolean(user.paymentId);
        },
        playlists: async (user, { limit, page }, { db }) => {
            try {
                // if (!user.authorized) {
                //   return null;
                // }
                const data = {
                    total: 0,
                    result: [],
                    totalCount: 0,
                };
                let cursor = await db.playlists.find({ creator: { $in: [user._id] } });
                const countTotal = await db.playlists.find({
                    creator: { $in: [user._id] },
                });
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = await cursor.count();
                data.result = await cursor.toArray();
                data.totalCount = await countTotal.count();
                return data;
            }
            catch (e) {
                throw new Error(`Failed to query user playlists: ${e}`);
            }
        },
        lessons: async (user, { limit, page }, { db }) => {
            try {
                const data = {
                    total: 0,
                    result: [],
                    totalCount: 0,
                };
                let cursor = await db.lessons.find({
                    creator: { $in: [user._id] },
                });
                const totalCount = await db.lessons.find({
                    creator: { $in: [user._id] },
                });
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = await cursor.count();
                data.result = await cursor.toArray();
                data.totalCount = await totalCount.count();
                // if (data.total === 0) {
                //   return null;
                // }
                return data;
            }
            catch (e) {
                throw new Error(`Failed to query user lessons: ${e}`);
            }
        },
        quizzes: async (user, { limit, page }, { db }) => {
            try {
                const data = {
                    total: 0,
                    result: [],
                    totalCount: 0,
                };
                let cursor = await db.quizzes.find({
                    creator: { $in: [user._id] },
                });
                const totalCount = await db.quizzes.find({
                    creator: { $in: [user._id] },
                });
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = await cursor.count();
                data.result = await cursor.toArray();
                data.totalCount = await totalCount.count();
                return data;
            }
            catch (e) {
                throw new Error(`Failed to query quizzes ${e}`);
            }
        },
    },
};
