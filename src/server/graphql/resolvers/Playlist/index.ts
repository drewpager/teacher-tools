import { Database, Playlist, Quiz } from "../../../lib/types";
import { PlaylistArgs, PlaylistsArgs, PlaylistsData, CreatePlanArgs, UpdateParams } from "./types";
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
        totalCount: 0
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
  },
  Mutation: {
    lessonPlan: async (
      _root: undefined,
      { input }: CreatePlanArgs,
      { db }: { db: Database }
    ): Promise<Playlist | Quiz> => {
      const id = new ObjectId();
      input.plan.map((lesson) => {
        lesson._id = new ObjectId(lesson._id)
      })
      try {
        const insertResult = await db.playlists.insertOne({
          _id: id,
          ...input
        })

        const insertedResult = insertResult ? await db.playlists.findOne({ _id: insertResult.insertedId }) : false;

        if (!insertedResult) {
          throw new Error("Failed to insert new lesson plan!")
        }

        // TODO: get viewer id instead of hardcoded value
        await db.users.updateOne(
          { _id: "116143759549242008910"},
          { $push: { playlists: insertedResult }}
        )

        return insertedResult;
      } catch (e) {
        throw new Error(`Failed to insert lesson plan ${e}`)
      }
    },
    updatePlan: async (
      _root: undefined,
      { id, input }: UpdateParams,
      { db }: { db: Database }
    ): Promise<boolean> => {
      try {
        const playlist = await db.playlists.findOneAndUpdate({ _id: new ObjectId(id) }, input)

        if (playlist.ok === 1) {
          return true
        } else {
          return false
        }
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
        const deletePlaylist = await db.playlists.deleteOne({ _id: new ObjectId(id) })

        if (!deletePlaylist) {
          throw new Error("Playlist deletion didn't work!");
        }
        
        return deletePlaylist.acknowledged;
      } catch (error) {
        throw new Error(`Failed to delete playlist: ${error}`);
      }
    }
  }
};
