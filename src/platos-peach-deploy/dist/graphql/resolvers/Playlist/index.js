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
exports.playlistResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.playlistResolvers = {
    Query: {
        playlist: (_root, { id }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const playlist = yield db.playlists.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!playlist) {
                throw new Error("Failed to find playlist!");
            }
            return playlist;
        }),
        allplaylists: (_root, { limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                total: 0,
                result: [],
                totalCount: 0,
            };
            let cursor = yield db.playlists.find({});
            const totalCount = cursor;
            cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
            cursor = cursor.limit(limit);
            data.total = yield cursor.count();
            data.result = yield cursor.toArray();
            data.totalCount = yield totalCount.count();
            return data;
        }),
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
        lessonPlan: (_root, { input }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const id = new mongodb_1.ObjectId();
            try {
                const insertResult = yield db.playlists.insertOne(Object.assign({ _id: id }, input));
                const insertedResult = insertResult
                    ? yield db.playlists.findOne({ _id: insertResult.insertedId })
                    : false;
                if (!insertedResult) {
                    throw new Error("Failed to insert new lesson plan!");
                }
                // TODO: get viewer id instead of hardcoded value
                yield db.users.updateOne({ _id: "116143759549242008910" }, { $push: { playlists: insertedResult } });
                return insertedResult;
            }
            catch (e) {
                throw new Error(`Failed to insert lesson plan ${e}`);
            }
        }),
        updatePlan: (_root, { id, input }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const playlist = yield db.playlists.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, input);
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
        }),
        deletePlaylist: (_root, { id }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const deletePlaylist = yield db.playlists.deleteOne({
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
        }),
    },
};
