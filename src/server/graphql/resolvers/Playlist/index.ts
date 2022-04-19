import { Database, Playlist } from "../../../lib/types";
import { PlaylistArgs } from "./types";
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
    }
  },
  Playlist: {
    id: (playlist: Playlist): string => {
      return playlist._id.toString();
    }
  }
}