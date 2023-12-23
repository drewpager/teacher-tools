import { Database, Quiz, Viewer } from "../../../lib/types";
import {
  QuizArgs,
  QuizzesArgs,
  QuizzesData,
  CreateQuizArgs,
  GenerateQuizArgs,
} from "./types";
import { ObjectId } from "mongodb";
import { OpenAIQuiz } from "../../../lib/api";

export const quizResolvers = {
  Query: {
    quiz: async (
      _root: undefined,
      { id }: QuizArgs,
      { db }: { db: Database }
    ): Promise<Quiz> => {
      const quiz = await db.quizzes.findOne({ _id: new ObjectId(id) });

      if (!quiz) {
        throw new Error("Failed to query quiz");
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
        totalCount: 0,
      };

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
    },
  },
  Mutation: {
    createQuiz: async (
      _root: undefined,
      { input }: CreateQuizArgs,
      { db }: { db: Database }
    ): Promise<Quiz> => {
      const id = new ObjectId();
      try {
        const insertQuiz = await db.quizzes.insertOne({
          _id: id,
          ...input,
        });

        const insertedQuiz = insertQuiz
          ? await db.quizzes.findOne({ _id: insertQuiz.insertedId })
          : false;

        if (!insertedQuiz) {
          throw new Error(`Failed to insert quiz!`);
        }

        return insertedQuiz;
      } catch (err) {
        throw new Error(`Failed with error: ${err}`);
      }
    },
    deleteQuiz: async (
      _root: undefined,
      { id }: QuizArgs,
      { db }: { db: Database }
    ): Promise<boolean | undefined> => {
      try {
        const deletedQuiz = await db.quizzes.deleteOne({
          _id: new ObjectId(id),
        });

        if (!deletedQuiz) {
          throw new Error("Failed to delete quiz");
        }

        return deletedQuiz.acknowledged;
      } catch (error) {
        throw new Error(`Failed to start deleting quiz: ${error}`);
      }
    },
    generateQuiz: async (
      _root: undefined,
      { numMCQuestions, numTFQuestions, subject }: GenerateQuizArgs
    ): // { db }: { db: Database }
    Promise<JSON | any> => {
      try {
        const quiz = await OpenAIQuiz({
          numMCQuestions,
          numTFQuestions,
          subject,
        });
        const message = quiz;
        return message;
      } catch (err) {
        throw new Error(`Failed to generate quiz: ${err}`);
      }
    },
  },
};
