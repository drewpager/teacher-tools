import e, { Request } from "express";
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
  UserPaymentArgs,
} from "./types";
import { authorize } from "../../../lib/utils";
import { User, Database, Lesson } from "../../../lib/types";
import { ObjectId } from "mongodb";
const stripe = require("stripe")(`${process.env.S_SECRET_KEY}`);

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
    paymentId: (user: User) => {
      return user.paymentId;
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
      {}: BookmarkLessonArgs,
      { db }: { db: Database }
    ): Promise<Lesson[] | null> => {
      try {
        const cursor = await db.users.distinct("bookmarks", {
          _id: `${user._id}`,
        });

        return cursor;
      } catch (e) {
        throw new Error(`Failed to bookmark anything ${e}`);
      }
    },
  },
  Mutation: {
    addPayment: async (
      _root: undefined,
      { paymentId, viewer, user }: UserPaymentArgs,
      { db }: { db: Database }
    ): Promise<boolean> => {
      const customer = await stripe.customers.search({
        query: `email:\'${user.contact}\'`,
      });

      try {
        if (!customer) {
          throw new Error("Customer not found");
        }

        const customerPay = await db.users.findOneAndUpdate(
          { _id: `${viewer}` },
          { $set: { paymentId: `${customer.data[0].id}` } }
        );
        return customerPay.value ? true : false;

        // const userPay = await db.users.findOneAndUpdate(
        //   { _id: `${viewer}` },
        //   { $set: { paymentId: `${paymentId}` } }
        // );
        // return userPay.value ? true : false;
      } catch (err) {
        throw new Error(`Error adding payment in Mutation: ${err}`);
      }
    },
  },
};
