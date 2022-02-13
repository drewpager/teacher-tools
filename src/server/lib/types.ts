import { Collection, ObjectId } from "mongodb";

export interface Lesson {
  _id: ObjectId;
  category: string[];
  title: string;
  meta: string;
  video: string;
  image: string;
  startDate: number;
  endDate: number;
}

export interface Database {
  lessons: Collection<Lesson>;
}