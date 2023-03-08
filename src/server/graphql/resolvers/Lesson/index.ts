import { Database, Lesson, Playlist, User, Viewer } from "../../../lib/types";
import {
  AllLessonsArgs,
  AllLessonsData,
  BookmarkLesson,
  CreateLessonArgs,
  CreateLessonInput,
  LessonArgs,
} from "./types";
import { authorize } from "../../../lib/utils/index";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { GraphQLScalarType, Kind } from "graphql";

const dateRegex =
  // /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])|-[1-9]\d{0,11}|[1-9]\d{0,4}/
  /\=(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])|-[1-9]\d{0,11}|[1-9]\d{0,4}|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))|(Present)/;

const validate = (value: any) => {
  if (typeof value !== "string") {
    throw new Error(`Value is not a string ${value}`);
  }

  if (!dateRegex.test(value)) {
    throw new Error(`Value is not formatted as a date ${value}`);
  }

  return value;
};

const parseLiteral = (ast: any) => {
  if (ast.kind !== Kind.STRING) {
    throw new Error(`Query error: can only parse strings but got ${ast.kind}`);
  }

  return validate(ast.value);
};

const GraphQLDateConfig = {
  name: "DateScalar",
  description: "A valid date object",
  serialize: validate,
  parseValue: validate,
  parseLiteral,
};

const GraphQLDate = new GraphQLScalarType(GraphQLDateConfig);

const verifyCreateLessonInput = ({
  title,
  category,
  meta,
  video,
  startDate,
  endDate,
}: CreateLessonInput) => {
  if (title.length > 160) {
    throw new Error("Title must not exceed 160 characters in length!");
  }

  if (category.length < 1) {
    throw new Error("Please add at least one category.");
  }

  if (!dateRegex.test(startDate)) {
    throw new Error("Please format date as Year-Month-Day (YYYY-MM-DD)");
  }

  if (!dateRegex.test(endDate)) {
    throw new Error("Please format date as Year-Month-Day (YYYY-MM-DD)");
  }

  // if (meta.length < 160) {
  //   throw new Error("Please add more information to provide students with context about this lesson.")
  // }

  if (video.length < 1) {
    throw new Error("Please add a video!");
  }
};

export const lessonResolvers = {
  Query: {
    lesson: async (
      _root: undefined,
      { id }: LessonArgs,
      { db }: { db: Database }
    ): Promise<Lesson> => {
      const lesson = await db.lessons.findOne({ _id: new ObjectId(id) });

      if (!lesson) {
        throw new Error("Lesson cannot be found!");
      }

      return lesson;
    },
    allLessons: async (
      _root: undefined,
      { page, limit }: AllLessonsArgs,
      { db }: { db: Database }
    ): Promise<AllLessonsData> => {
      const data: AllLessonsData = {
        total: 0,
        result: [],
        totalCount: 0,
      };

      let cursor = await db.lessons.find({});
      const count = cursor;

      cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
      cursor = cursor.limit(limit);

      data.total = await cursor.count();
      data.result = await cursor.toArray();
      data.totalCount = await count.count();

      return data;
    },
  },
  Lesson: {
    id: (lesson: Lesson) => {
      return lesson._id;
    },
  },
  Playlist: {
    id: (playlist: Playlist) => {
      return playlist._id;
    },
    creator: async (
      playlist: Playlist,
      _args: Record<string, unknown>,
      { db, req }: { db: Database; req: Request }
    ): Promise<string> => {
      try {
        const creator = await db.users.findOne({ _id: playlist.creator });

        if (!creator) {
          throw new Error("Creator can't be found!");
        }

        const viewer = await authorize(db, req);
        if (viewer && viewer._id === playlist.creator) {
          playlist.authorized = true;
        }

        return creator._id;
      } catch (err) {
        throw new Error(
          `You are either not the creator or not logged in: ${err}!`
        );
      }
    },
  },
  Mutation: {
    createLesson: async (
      _root: undefined,
      { input }: CreateLessonArgs,
      { db }: { db: Database }
    ): Promise<Lesson> => {
      const id = new ObjectId();

      // const viewerId = viewer && viewer.id ? viewer.id : "116143759549242008910";
      try {
        verifyCreateLessonInput(input);

        const insertResult = await db.lessons.insertOne({
          _id: id,
          ...input,
        });

        const insertedResult = insertResult
          ? await db.lessons.findOne({ _id: insertResult.insertedId })
          : false;

        if (!insertedResult) {
          throw new Error("Lesson is undefined");
        }

        await db.users.updateOne(
          { _id: `${input.creator}` },
          { $push: { lessons: insertedResult } }
        );

        return insertedResult;
      } catch (e) {
        throw new Error(`Failed to insert lesson: ${e}`);
      }
    },
    deleteLesson: async (
      viewer: Viewer,
      { id }: LessonArgs,
      { db }: { db: Database }
    ): Promise<boolean | undefined> => {
      try {
        const deletedLesson = await db.lessons.deleteOne({
          _id: new ObjectId(id),
        });

        if (!deletedLesson) {
          throw new Error("Failed to delete lesson");
        }

        return deletedLesson.acknowledged;
      } catch (error) {
        throw new Error(`Failed to start deleting lesson: ${error}`);
      }
    },

    bookmarkLesson: async (
      viewer: Viewer,
      { id }: BookmarkLesson,
      { db }: { db: Database }
    ): Promise<boolean | undefined> => {
      try {
        const data = await db.lessons.findOne({
          _id: new ObjectId(id),
        });
        const bookmark = await db.users.updateOne(
          { _id: viewer._id },
          { $push: { bookmarks: data } }
        );

        if (!bookmark) {
          throw new Error("Failed to bookmark lesson");
        }

        return bookmark.acknowledged;
      } catch (error) {
        throw new Error(`Failed to bookmark lesson entirely: ${error}`);
      }
    },
  },
  DateScalar: GraphQLDate,
};
