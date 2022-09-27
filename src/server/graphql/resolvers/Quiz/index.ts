import { Database, Quiz } from "../../../lib/types";
import { QuizArgs } from "./types";
import { ObjectId } from "mongodb";

export const quizResolvers = {
  Query: {
    quizzes: async (
      _root: undefined,
      { id }: QuizArgs,
      { db }: { db: Database } 
    ): Promise<Quiz> => {
      const quiz = await db.quizzes.findOne({ _id: new ObjectId(id)});

      if (!quiz) {
        throw new Error("Failed to query quiz")
      }

      return quiz;
    }
  }
}