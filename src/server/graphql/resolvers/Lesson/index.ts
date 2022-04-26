import { Database, Lesson, Playlist, User } from "../../../lib/types";
import { LessonArgs } from "./types";
import { authorize } from "../../../lib/utils/index";
import { Request } from "express";
import { ObjectId } from "mongodb";

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
  },
  Lesson: {
    id: (lesson: Lesson): string => {
      return lesson._id.toString();
    },
  },
  Playlist: {
    id: (playlist: Playlist): string => {
      return playlist._id.toString();
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
    createLesson: (): string => {
      return "Mutate.lesson";
    }
  }
};
