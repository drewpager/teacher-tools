import { Collection, ObjectId } from "mongodb";

export interface Lesson {
  _id: ObjectId;
  category: string[];
  title: string;
  meta: string;
  video: string;
  image: string;
  startDate: string;
  endDate: string;
  creator: string;
}

export interface Questions {
  question: string, 
  correctAnswer: string,
  answerOptions: string[],
  answerType: string
}

export interface Quiz {
  _id: ObjectId;
  questions: Questions[];
}

export interface Playlist {
  _id: ObjectId;
  name: string;
  plan: Lesson[] | Quiz[];
  creator: string;
  authorized?: boolean; // https://www.newline.co/courses/tinyhouse-react-masterclass-part-2/building-the-listing-resolvers
}

export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  watched: string[];
  paymentId?: string;
  playlists?: Playlist[];
  lessons?: Lesson[];
  quizzes?: Quiz[];
  authorized?: boolean;
}

export interface Database {
  lessons: Collection<Lesson>;
  users: Collection<User>;
  playlists: Collection<Playlist>;
  quizzes: Collection<Quiz>;
}

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string;
  paymentId?: string;
  didRequest: boolean;
  playlists?: Playlist[];
  lessons?: Lesson[];
  quizzes?: Quiz[];
}