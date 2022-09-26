import { Playlist, Lesson, Quiz } from "../../../lib/types";
export interface PlaylistArgs {
  id: string;
}

export interface PlaylistsArgs {
  limit: number;
  page: number;
}
export interface PlaylistsData {
  total: number;
  result: Playlist[] | Quiz[];
  totalCount: number;
}

export interface LessonPlanInput {
  name: string;
  creator: string;
  plan: Lesson[] | Quiz[];
}

export interface CreatePlanArgs {
  input: LessonPlanInput;
}

export interface UpdatePlanArgs {
  id: string;
  creator: string;
  plan: Playlist[] | Quiz[];
  name: string;
}

export interface UpdateParams {
  id: string;
  input: UpdatePlanArgs;
}
