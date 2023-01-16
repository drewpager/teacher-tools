"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.playlistResolvers = {
    Query: {
        playlist: async (_root, { id }, { db }) => {
            const playlist = await db.playlists.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!playlist) {
                throw new Error("Failed to find playlist!");
            }
            return playlist;
        },
        allplaylists: async (_root, { limit, page }, { db }) => {
            const data = {
                total: 0,
                result: [],
                totalCount: 0,
            };
            let cursor = await db.playlists.find({});
            const totalCount = cursor;
            cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
            cursor = cursor.limit(limit);
            data.total = await cursor.count();
            data.result = await cursor.toArray();
            data.totalCount = await totalCount.count();
            return data;
        },
    },
    Playlist: {
        id: (playlist) => {
            return playlist._id;
        },
        name: (playlist) => {
            return playlist.name;
        },
    },
    LessonPlanUnion: {
        __resolveType(obj, context, info) {
            if (obj.startDate) {
                return "Lesson";
            }
            if (obj.questions) {
                return "Quiz";
            }
            return null;
        },
    },
    Mutation: {
        lessonPlan: async (_root, { input }, { db }) => {
            const id = new mongodb_1.ObjectId();
            try {
                const insertResult = await db.playlists.insertOne({
                    _id: id,
                    ...input,
                });
                const insertedResult = insertResult
                    ? await db.playlists.findOne({ _id: insertResult.insertedId })
                    : false;
                if (!insertedResult) {
                    throw new Error("Failed to insert new lesson plan!");
                }
                // TODO: get viewer id instead of hardcoded value
                await db.users.updateOne({ _id: "116143759549242008910" }, { $push: { playlists: insertedResult } });
                return insertedResult;
            }
            catch (e) {
                throw new Error(`Failed to insert lesson plan ${e}`);
            }
        },
        updatePlan: async (_root, { id, input }, { db }) => {
            try {
                const playlist = await db.playlists.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, input);
                if (playlist.ok === 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                throw new Error(`Failed to update playlist ${e}`);
            }
        },
        deletePlaylist: async (_root, { id }, { db }) => {
            try {
                const deletePlaylist = await db.playlists.deleteOne({
                    _id: new mongodb_1.ObjectId(id),
                });
                if (!deletePlaylist) {
                    throw new Error("Playlist deletion didn't work!");
                }
                return deletePlaylist.acknowledged;
            }
            catch (error) {
                throw new Error(`Failed to delete playlist: ${error}`);
            }
        },
    },
};
