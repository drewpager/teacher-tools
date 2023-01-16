"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongodb_1 = require("mongodb");
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectDatabase = async () => {
    const client = await mongodb_1.MongoClient.connect(url);
    const db = client.db("main");
    return {
        lessons: db.collection("lessons"),
        users: db.collection("users"),
        playlists: db.collection("playlists"),
        quizzes: db.collection("quizzes"),
    };
};
exports.connectDatabase = connectDatabase;
