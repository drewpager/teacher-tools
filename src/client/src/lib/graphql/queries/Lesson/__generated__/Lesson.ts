/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Lesson
// ====================================================

export interface Lesson_lesson {
  __typename: "Lesson";
  id: string | null;
  category: (string | null)[] | null;
  title: string | null;
  meta: string | null;
  video: string | null;
  image: string | null;
  startDate: number | null;
  endDate: number | null;
}

export interface Lesson {
  lesson: Lesson_lesson;
}

export interface LessonVariables {
  id: string;
}
