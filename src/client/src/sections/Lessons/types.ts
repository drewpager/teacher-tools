export interface Lesson {
  id: string;
  category: [string[]]; // multiple cateogries
  title: string;
  meta: string;
  video: string;
  image: string;
  startDate: number;
  endDate: number;
}

export type LessonsData = {
  lessons: Lesson[];
}

export interface DeleteLessonData {
  deleteLesson: Lesson;
}

export interface DeleteLessonVariables {
  id: string
}