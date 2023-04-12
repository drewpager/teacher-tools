import { Playlist, Lesson, Quiz, LessonPlan } from "../../../lib/types";
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
}

export interface UpdatePlanArgs {
  creator: string;
  plan: LessonPlan[];
  name: string;
}

export interface UpdateParams {
  id: string;
  input: UpdatePlanArgs;
}
