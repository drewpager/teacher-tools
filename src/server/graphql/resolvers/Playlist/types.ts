import { Playlist, Lesson } from "../../../lib/types";
export interface PlaylistArgs {
  id: string;
}

export interface PlaylistsArgs {
  limit: number;
  page: number;
}
export interface PlaylistsData {
  total: number;
  result: Playlist[];
  totalCount: number;
}

export interface LessonPlanInput {
  name: string;
  creator: string;
  plan: Lesson[];
}

export interface CreatePlanArgs {
  input: LessonPlanInput;
}
