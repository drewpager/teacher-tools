import { Playlist } from "../../../lib/types";

export const playlistResolvers = {
  Playlist: {
    id: (playlist: Playlist): string => {
      return playlist._id.toString();
    }
  }
}