import { Playlist, Lesson, Quiz } from "../../../lib/types";

export interface QuizArgs {
  id: string;
}

export interface QuizzesArgs {
  limit: number;
  page: number;
}

export interface QuizzesData {
  total: number;
  result: Quiz[];
  totalCount: number;
}