import { Collection, ObjectId } from "mongodb";

export interface LessonPlan {
  // lesson: Lesson;
  // quiz: Quiz;
  // plan: Lesson[] | Quiz[];
  _id: ObjectId;
  category: string[];
  title: string;
  meta: string;
  video: string;
  image: string;
  startDate: string;
  endDate: string;
  creator: string;
  questions: Questions[];
}

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

export interface Answers {
  answerText: string;
  isCorrect: boolean;
}
export interface Questions {
  question: string;
  answerOptions: Answers[];
  answerType: string;
}

export interface Quiz {
  _id: ObjectId;
  title: string;
  questions: Questions[];
  creator: string;
}

export interface Playlist {
  _id: ObjectId;
  name: string;
  plan: LessonPlan[];
  creator: string;
  authorized?: boolean; // https://www.newline.co/courses/tinyhouse-react-masterclass-part-2/building-the-listing-resolvers
}

export interface Package {
  amount: number;
  cadence: string;
  status: string;
  since: number;
  trialEnd: number;
}

export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  watched: string[];
  paymentId?: string | null;
  playlists?: Playlist[];
  lessons?: Lesson[];
  quizzes?: Quiz[];
  authorized?: boolean;
  bookmarks?: any[];
  package?: Package;
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
  paymentId?: string | null;
  didRequest: boolean;
  playlists?: Playlist[];
  lessons?: Lesson[];
  quizzes?: Quiz[];
  bookmarks?: any[];
}
