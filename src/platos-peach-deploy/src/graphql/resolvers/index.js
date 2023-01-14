"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const Viewer_1 = require("./Viewer");
const Lesson_1 = require("./Lesson");
const User_1 = require("./User");
const Playlist_1 = require("./Playlist");
const Quiz_1 = require("./Quiz");
exports.resolvers = (0, lodash_merge_1.default)(Viewer_1.viewerResolvers, Lesson_1.lessonResolvers, User_1.userResolvers, Playlist_1.playlistResolvers, Quiz_1.quizResolvers);
