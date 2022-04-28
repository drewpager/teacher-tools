export interface LessonArgs {
  id: string;
}

export interface CreateLessonInput {
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