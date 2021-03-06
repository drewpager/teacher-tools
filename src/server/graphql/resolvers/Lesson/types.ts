import { Lesson } from '../../../lib/types';
export interface LessonArgs {
  id: string;
}

export interface CreateLessonInput {
  id: string;
  title: string;
  meta: string;
  category: string[];
  video: string;
  image: string;
  startDate: number;
  endDate: number;
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
}