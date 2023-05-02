import {
  Database,
  Playlist,
  Lesson,
  Quiz,
  LessonPlan,
} from "../../../lib/types";
import {
  PlaylistArgs,
  PlaylistsArgs,
  PlaylistsData,
  CreatePlanArgs,
  UpdateParams,
} from "./types";
import { ObjectId } from "mongodb";

export const playlistResolvers = {
  Query: {
    playlist: async (
      _root: undefined,
      { id }: PlaylistArgs,
      { db }: { db: Database }
    ): Promise<Playlist> => {
      const playlist = await db.playlists.findOne({ _id: new ObjectId(id) });

      if (!playlist) {
        throw new Error("Failed to find playlist!");
      }

      return playlist;
    },
    allplaylists: async (
      _root: undefined,
      { limit, page }: PlaylistsArgs,
      { db }: { db: Database }
    ): Promise<PlaylistsData> => {
      const data: PlaylistsData = {
        total: 0,
        result: [],
        totalCount: 0,
      };

      let cursor = await db.playlists.find({});
      const totalCount = cursor;

      cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
      cursor = cursor.limit(limit);

      data.total = await cursor.count();
      data.result = await cursor.toArray();
      data.totalCount = await totalCount.count();

      return data;
    },
  },
  Playlist: {
    id: (playlist: Playlist) => {
      return playlist._id;
    },
    name: (playlist: Playlist) => {
      return playlist.name;
    },
  },
  LessonPlanUnion: {
    __resolveType(obj: any, context: any, info: any) {
      if (obj.startDate) {
        return "Lesson";
      }

      if (obj.questions) {
        return "Quiz";
      }

      return null;
    },
  },
  Mutation: {
    lessonPlan: async (
      _root: undefined,
      { input, viewerId }: CreatePlanArgs,
      { db }: { db: Database }
    ): Promise<Playlist> => {
      const id = new ObjectId();

      try {
        const insertResult = await db.playlists.insertOne({
          _id: id,
          ...input,
        });

        const insertedResult = insertResult
          ? await db.playlists.findOne({ _id: insertResult.insertedId })
          : false;

        if (!insertedResult) {
          throw new Error("Failed to insert new lesson plan!");
        }

        await db.users.updateOne(
          { _id: viewerId },
          { $push: { playlists: insertedResult } }
        );

        return insertedResult;
      } catch (e) {
        throw new Error(`Failed to insert lesson plan ${e}`);
      }
    },
    updatePlan: async (
      _root: undefined,
      { id, input }: UpdateParams,
      { db }: { db: Database }
    ): Promise<Playlist> => {
      const ide = new ObjectId(id);
      try {
        const playlist = await db.playlists.findOneAndUpdate(
          { _id: ide },
          {
            $set: {
              name: input.name,
              creator: input.creator,
              plan: input.plan,
            },
          }
        );

        // if (!playlist) {
        //   throw new Error(`Playlist Database update failed`);
        // }

        const insertedResult = playlist
          ? await db.playlists.findOne({ _id: ide })
          : false;

        if (!insertedResult) {
          throw new Error(`Sorry, but I Failed to update this playlist!`);
        }

        return { ...insertedResult };
      } catch (e) {
        throw new Error(`Failed to update playlist ${e}`);
      }
    },
    deletePlaylist: async (
      _root: undefined,
      { id }: PlaylistArgs,
      { db }: { db: Database }
    ): Promise<boolean | undefined> => {
      try {
        const deletePlaylist = await db.playlists.deleteOne({
          _id: new ObjectId(id),
        });

        if (!deletePlaylist) {
          throw new Error("Playlist deletion didn't work!");
        }

        return deletePlaylist.acknowledged;
      } catch (error) {
        throw new Error(`Failed to delete playlist: ${error}`);
      }
    },
  },
};
