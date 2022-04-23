import { Database, Playlist } from "../../../lib/types";
import { PlaylistArgs, PlaylistsArgs, PlaylistsData } from "./types";
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
      };

      let cursor = await db.playlists.find({});

      cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
      cursor = cursor.limit(limit);

      data.total = await cursor.count();
      data.result = await cursor.toArray();

      return data;
    },
  },
  Playlist: {
    id: (playlist: Playlist): string => {
      return playlist._id.toString();
    },
  },
};
