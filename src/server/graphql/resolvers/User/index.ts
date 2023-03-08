import { Request } from "express";
import {
  UserArgs,
  UserPlaylistArgs,
  UserPlaylistData,
  UserLessonArgs,
  UserLessonData,
  UserQuizData,
  UserQuizArgs,
  BookmarkLessonArgs,
  BookmarkLessonData,
} from "./types";
import { authorize } from "../../../lib/utils/";
import { User, Database } from "../../../lib/types";

export const userResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });

        if (!user) {
          throw new Error("User can't be found");
        }

        const viewer = await authorize(db, req);

        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
  },
  User: {
    id: (user: User) => {
      return user._id;
    },
    hasPayment: (user: User) => {
      return Boolean(user.paymentId);
    },
    playlists: async (
      user: User,
      { limit, page }: UserPlaylistArgs,
      { db }: { db: Database }
    ): Promise<UserPlaylistData | null> => {
      try {
        // if (!user.authorized) {
        //   return null;
        // }

        const data: UserPlaylistData = {
          total: 0,
          result: [],
          totalCount: 0,
        };

        let cursor = await db.playlists.find({ creator: { $in: [user._id] } });
        const countTotal = await db.playlists.find({
          creator: { $in: [user._id] },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();
        data.totalCount = await countTotal.count();

        return data;
      } catch (e) {
        throw new Error(`Failed to query user playlists: ${e}`);
      }
    },
    lessons: async (
      user: User,
      { limit, page }: UserLessonArgs,
      { db }: { db: Database }
    ): Promise<UserLessonData | null> => {
      try {
        const data: UserLessonData = {
          total: 0,
          result: [],
          totalCount: 0,
        };

        let cursor = await db.lessons.find({
          creator: { $in: [user._id] },
        });
        const totalCount = await db.lessons.find({
          creator: { $in: [user._id] },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();
        data.totalCount = await totalCount.count();

        // if (data.total === 0) {
        //   return null;
        // }

        return data;
      } catch (e) {
        throw new Error(`Failed to query user lessons: ${e}`);
      }
    },
    quizzes: async (
      user: User,
      { limit, page }: UserQuizArgs,
      { db }: { db: Database }
    ): Promise<UserQuizData | null> => {
      try {
        const data: UserQuizData = {
          total: 0,
          result: [],
          totalCount: 0,
        };
        let cursor = await db.quizzes.find({
          creator: { $in: [user._id] },
        });

        const totalCount = await db.quizzes.find({
          creator: { $in: [user._id] },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();
        data.totalCount = await totalCount.count();

        return data;
      } catch (e) {
        throw new Error(`Failed to query quizzes ${e}`);
      }
    },
    bookmarks: async (
      user: User,
      { limit, page }: BookmarkLessonArgs,
      { db }: { db: Database }
    ): Promise<BookmarkLessonData | null> => {
      try {
        const data: BookmarkLessonData = {
          total: 0,
          result: [],
          totalCount: 0,
        };

        const cursor = await db.users.distinct("bookmarks", { _id: user._id });
        // const totalCount = await db.lessons.find({ _id: id });

        // cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        // cursor = cursor.limit(limit);

        data.total = cursor.length;
        data.result = cursor;
        data.totalCount = cursor.length;

        // db.users.updateOne({ _id: user._id }, { $push: { bookmarks: data } });
        return data;
      } catch (e) {
        throw new Error(`Failed to bookmark anything ${e}`);
      }
    },
  },
};
