import { Playlist, Lesson, Quiz, LessonPlan, Viewer } from "../../../lib/types";
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
  plan: LessonPlan[];
}

export interface CreatePlanArgs {
  input: LessonPlanInput;
  viewerId: string;
}

export interface UpdatePlanArgs {
  creator: string;
  plan: LessonPlan[];
  name: string;
}

export interface UpdateParams {
  input: LessonPlanInput;
  id: string;
}

export interface CopyPlaylistArgs {
  id: string;
  viewerId: string;
}
