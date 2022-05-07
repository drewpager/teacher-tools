import { Database, Lesson, Playlist, User } from "../../../lib/types";
import { CreateLessonArgs, CreateLessonInput, LessonArgs } from "./types";
import { authorize } from "../../../lib/utils/index";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { Viewer } from "../../../../client/src/graphql/generated";

const verifyCreateLessonInput = ({ title, category, meta, video }: CreateLessonInput) => {
  if (title.length > 160) {
    throw new Error("Title must not exceed 160 characters in length!")
  }

  if (category.length < 1) {
    throw new Error("Please add at least one category.")
  }

  // if (meta.length < 160) {
  //   throw new Error("Please add more information to provide students with context about this lesson.")
  // }

  if (video.length < 1) {
    throw new Error("Please add a video!")
  }
}

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
    createLesson: async (
      viewer: Viewer,
      { input }: CreateLessonArgs,
      { db }: { db: Database } 
    ): Promise<Lesson> => {
      const id = new ObjectId();
      // creator: "116143759549242008910"
      // const viewerId = viewer && viewer.id ? viewer.id : "116143759549242008910"; 

      try {
        verifyCreateLessonInput(input);
      
        const insertResult = await db.lessons.insertOne({
          _id: id,
          ...input,
          // creator: viewerId
          creator: "116143759549242008910"
        });
        
        const insertedResult = insertResult ? await db.lessons.findOne({ _id: insertResult.insertedId }) : false;
        
        if (!insertedResult) {
          throw new Error("Lesson is undefined");
        }

        await db.users.updateOne(
          { _id: "116143759549242008910" },
          { $push: { lessons: insertedResult }}
        )

        return insertedResult;
      } catch(e) {
        throw new Error(`Failed to insert lesson: ${e}`);
      }
    }
  }
};
