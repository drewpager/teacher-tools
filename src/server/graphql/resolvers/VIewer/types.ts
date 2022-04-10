import { Playlist, Lesson } from "../../../lib/types";

export interface LogInArgs {
  input: { code: string } | null;
}

export interface PlaylistArgs {
  limit: number;
  page: number;
}

export interface PlaylistArgsData {
  total: number;
  result: Playlist[];
}
