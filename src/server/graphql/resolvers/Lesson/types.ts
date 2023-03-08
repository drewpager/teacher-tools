import { ObjectId } from "mongodb";
import { Lesson } from "../../../lib/types";
export interface LessonArgs {
  id: string;
}

export interface CreateLessonInput {
  title: string;
  meta: string;
  category: string[];
  video: string;
  image: string;
  startDate: string;
  endDate: string;
  creator: string;
}

export interface CreateLessonArgs {
  input: CreateLessonInput;
}

export interface AllLessonsArgs {
  limit: number;
  page: number;
}

export interface AllLessonsData {
  total: number;
  result: Lesson[];
  totalCount: number;
}

export interface BookmarkLesson {
  id: string;
}
