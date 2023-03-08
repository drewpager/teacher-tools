import { MongoClient } from "mongodb";
import { Database, Lesson, User, Playlist, Quiz } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);
  const db = client.db("main");

  return {
    lessons: db.collection<Lesson>("lessons"),
    users: db.collection<User>("users"),
    playlists: db.collection<Playlist>("playlists"),
    quizzes: db.collection<Quiz>("quizzes"),
  };
};
