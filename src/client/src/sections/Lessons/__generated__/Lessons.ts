/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Lessons
// ====================================================

export interface Lessons_lessons {
  __typename: "Lesson";
  id: string;
  category: string[];
  title: string;
  meta: string;
  video: string;
  image: string;
  startDate: string;
  endDate: string;
}

export interface Lessons {
  lessons: Lessons_lessons[];
}
