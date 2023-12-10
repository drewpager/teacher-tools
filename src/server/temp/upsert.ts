require("dotenv").config();

import { connectDatabase } from "../database";
import { Lesson, User, Playlist, Quiz } from "../lib/types";
import { ObjectId } from "mongodb";

const upsert = async () => {
  try {
    const db = await connectDatabase();

    console.log("running upsert");

    const updated = db.playlists.updateMany(
      { creator: "112129642735396482304" },
      { $set: { premium: false } }
    );

    if ((await updated).acknowledged) {
      console.log("updated");
    }
  } catch (err) {
    throw new Error("failed to upsert database");
  }
};

upsert();
