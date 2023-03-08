import { ObjectId } from "mongodb";
import { Playlist, Lesson, Quiz } from "../../../lib/types";

export interface UserArgs {
  id: string;
}

export interface UserPlaylistArgs {
  limit: number;
  page: number;
}

export interface UserPlaylistData {
  total: number;
  result: Playlist[];
  totalCount: number;
}

export interface UserLessonArgs {
  limit: number;
  page: number;
}

export interface UserLessonData {
  total: number;
  result: Lesson[];
  totalCount: number;
}

export interface UserQuizData {
  total: number;
  result: Quiz[];
  totalCount: number;
}

export interface UserQuizArgs {
  limit: number;
  page: number;
}

export interface BookmarkLessonArgs {
  limit: number;
  page: number;
}

export interface BookmarkLessonData {
  total: number;
  result: Lesson[];
  totalCount: number;
}
