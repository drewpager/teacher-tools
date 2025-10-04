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
  UserPaymentArgs,
  AllUsersArgs,
  AllUsersData,
  UserArticleData,
  UserArticleArgs,
} from "./types";
import { authorize } from "../../../lib/utils";
import { User, Database, Lesson, Viewer, Package } from "../../../lib/types";
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
    allUsers: async (
      _root: undefined,
      { page, limit }: AllUsersArgs,
      { db }: { db: Database }
    ): Promise<AllUsersData> => {
      const data: AllUsersData = {
        total: 0,
        result: [],
        totalCount: 0,
      };

      let cursor = await db.users.find({});
      cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
      cursor = cursor.limit(limit);

      data.result = await cursor.toArray();
      data.total = data.result.length;
      data.totalCount = await db.users.countDocuments({});

      return data;
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

        let cursor = await db.playlists
          .find({ creator: { $in: [user._id] } })
          .sort({ _id: -1 });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.result = await cursor.toArray();
        data.total = data.result.length;
        data.totalCount = await db.playlists.countDocuments({
          creator: { $in: [user._id] },
        });

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

        let cursor = await db.lessons
          .find({
            creator: { $in: [user._id] },
          })
          .sort({ _id: -1 });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.result = await cursor.toArray();
        data.total = data.result.length;
        data.totalCount = await db.lessons.countDocuments({
          creator: { $in: [user._id] },
        });

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
        let cursor = await db.quizzes
          .find({
            creator: { $in: [user._id] },
          })
          .sort({ _id: -1 });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.result = await cursor.toArray();
        data.total = data.result.length;
        data.totalCount = await db.quizzes.countDocuments({
          creator: { $in: [user._id] },
        });

        return data;
      } catch (e) {
        throw new Error(`Failed to query quizzes ${e}`);
      }
    },
    articles: async (
      user: User,
      { limit, page }: UserArticleArgs,
      { db }: { db: Database }
    ): Promise<UserArticleData | null> => {
      try {
        const data: UserArticleData = {
          total: 0,
          result: [],
          totalCount: 0,
        };
        let cursor = await db.articles
          .find({
            creator: { $in: [user._id] },
          })
          .sort({ _id: -1 });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.result = await cursor.toArray();
        data.total = data.result.length;
        data.totalCount = await db.articles.countDocuments({
          creator: { $in: [user._id] },
        });

        return data;
      } catch (e) {
        throw new Error(`Failed to query articles ${e}`);
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
    package: (user: User) => {
      return user.package;
    },
  },
  Mutation: {
    addPayment: async (
      _root: undefined,
      { id }: UserPaymentArgs,
      { db }: { db: Database }
    ): Promise<Viewer | string> => {
      // const viewerId = "118302753872778003967";
      const viewerId = id;

      try {
        const userObj = await db.users.findOne({
          _id: viewerId,
        });

        if (!userObj) {
          throw new Error("User can't be found");
        }

        const contactEmail = userObj.contact;

        const customer = await stripe.customers.search({
          query: `email:\'${contactEmail}\'`,
        });

        if (!customer) {
          throw new Error("Customer can't be found");
        }

        if (customer.data.length === 0) {
          const customerId = undefined;
          const amount = 0;
          const cadence = "N/A";
          const status = "inactive";
          const since = 0;
          const trial_end = 0;

          const customerPay = await db.users.findOneAndUpdate(
            { _id: `${viewerId}` },
            {
              $set: {
                paymentId: customerId,
                package: {
                  amount: amount,
                  cadence: cadence,
                  status: status,
                  since: since,
                  trialEnd: trial_end,
                },
              },
            }
          );

          return customerPay ? viewerId : "Payment details unavailable";
        }

        const subscriptions = await stripe.customers.retrieve(
          `${customer.data[0].id}`,
          {
            expand: ["subscriptions"],
          }
        );

        // Check if subscription data exists and has the expected structure
        if (
          !subscriptions.subscriptions ||
          !subscriptions.subscriptions.data ||
          subscriptions.subscriptions.data.length === 0 ||
          !subscriptions.subscriptions.data[0] ||
          !subscriptions.subscriptions.data[0].plan
        ) {
          // Handle case where subscription data is not available
          const customerId = customer?.data[0].id;
          const amount = 0;
          const cadence = "N/A";
          const status = "inactive";
          const since = 0;
          const trial_end = 0;

          const customerPay = await db.users.findOneAndUpdate(
            { _id: `${viewerId}` },
            {
              $set: {
                paymentId: customerId,
                package: {
                  amount: amount,
                  cadence: cadence,
                  status: status,
                  since: since,
                  trialEnd: trial_end,
                },
              },
            }
          );

          return customerPay ? viewerId : "Payment details unavailable";
        }

        const amount = subscriptions.subscriptions.data[0].plan.amount;
        const cadence = subscriptions.subscriptions.data[0].plan.interval;
        const status = subscriptions.subscriptions.data[0].status;
        const since = subscriptions.subscriptions.data[0].created;
        const trial_end = subscriptions.subscriptions.data[0].trial_end;

        const customerId = customer?.data[0].id;

        const customerPay = await db.users.findOneAndUpdate(
          { _id: `${viewerId}` },
          {
            $set: {
              paymentId: customerId,
              package: {
                amount: amount,
                cadence: cadence,
                status: status,
                since: since,
                trialEnd: trial_end,
              },
            },
          }
        );

        if (!customerPay.value) {
          const customerId = undefined;
          const amount = 0;
          const cadence = "N/A";
          const status = "inactive";
          const since = 0;
          const trial_end = 0;

          const customerPay = await db.users.findOneAndUpdate(
            { _id: `${viewerId}` },
            {
              $set: {
                paymentId: customerId,
                package: {
                  amount: amount,
                  cadence: cadence,
                  status: status,
                  since: since,
                  trialEnd: trial_end,
                },
              },
            }
          );

          return customerPay ? viewerId : "Payment details unavailable";
        }

        return customerPay.value && customerId;
      } catch (err) {
        throw new Error(`Error adding payment in Mutation: ${err}`);
      }
    },
    deleteAllBookmarks: async (
      user: User,
      { id }: UserArgs,
      { db }: { db: Database }
    ): Promise<string> => {
      try {
        if (user?.bookmarks?.length === 0) {
          throw new Error("No bookmarks to delete");
        }

        const deleteBookmarks = await db.users.findOneAndUpdate(
          { _id: `${id}` },
          { $set: { bookmarks: [] } }
        );

        return deleteBookmarks.ok
          ? "Bookmarks deleted"
          : "Failed to delete bookmarks";
      } catch (error) {
        throw new Error(`Failed to delete all bookmarks: ${error}`);
      }
    },
  },
};
