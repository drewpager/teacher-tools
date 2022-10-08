import { Database, Quiz } from "../../../lib/types";
import { QuizArgs, QuizzesArgs, QuizzesData } from "./types";
import { ObjectId } from "mongodb";

export const quizResolvers = {
  Query: {
    quiz: async (
      _root: undefined,
      { id }: QuizArgs,
      { db }: { db: Database } 
    ): Promise<Quiz> => {
      const quiz = await db.quizzes.findOne({ _id: new ObjectId(id)});

      if (!quiz) {
        throw new Error("Failed to query quiz")
      }

      return quiz;
    },
    allquizzes: async (
      _root: undefined,
      { limit, page }: QuizzesArgs,
      { db }: { db: Database }
    ): Promise<QuizzesData> => {
      const data: QuizzesData = {
        total: 0,
        result: [],
        totalCount: 0
      }
  
      let cursor = await db.quizzes.find({});
      const count = cursor;
  
      cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
      cursor = cursor.limit(limit);
  
      data.total = await cursor.count();
      data.result = await cursor.toArray();
      data.totalCount = await count.count();
  
      return data;
    },
  },
  Quiz: {
    id: (quiz: Quiz) => {
      return quiz._id;
    }
  }
}