require("dotenv").config();

import { connectDatabase } from "../server/database";

const unseed = async () => {
  try {
    console.log("Unseeding...");
    const db = await connectDatabase();

    db.lessons.deleteMany({});
    // db.users.deleteMany({})
    // db.quizzes.deleteMany({})

    console.log("Successfully unseeded DB!");
  } catch (error) {
    throw new Error("Failed to unseed properly!");
  }
};

unseed();
