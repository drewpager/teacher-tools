import { Quiz, Questions } from "../../../lib/types";

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

export interface CreateQuizInput {
  title: string;
  questions: Questions[];
  creator: string;
  public: boolean;
}

export interface CreateQuizArgs {
  input: CreateQuizInput;
}
