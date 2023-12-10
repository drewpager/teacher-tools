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
  content: Content;
  public: boolean;
  pdf?: string;
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
  public: boolean;
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
  public: boolean;
}

export interface Playlist {
  _id: ObjectId;
  name: string;
  plan: LessonPlan[];
  creator: string;
  public: boolean;
  premium: boolean;
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
  articles?: Article[];
  authorized?: boolean;
  bookmarks?: any[];
  package?: Package;
}

export interface Article {
  _id: ObjectId;
  title: string;
  content: any;
  creator: string;
  public: boolean;
  pdf?: string;
}

export interface Database {
  lessons: Collection<Lesson>;
  users: Collection<User>;
  playlists: Collection<Playlist>;
  quizzes: Collection<Quiz>;
  articles: Collection<Article>;
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
  articles?: Article[];
  bookmarks?: any[];
}
export interface Content {
  blocks: Blocks[];
  entityMap: EntityMapping;
}

export interface EntityMapping {
  entityMap: EntityMap;
}

export interface Blocks {
  key: string;
  text: string;
  type: string;
  depth: number;
  inlineStyleRanges: InlineStyleRanges[];
  entityRanges: EntityRanges[];
}

export interface EntityMap {
  type: string;
  mutability: string;
  data: DataInput;
}

export interface DataInput {
  src: string;
  width: string;
  alignment: string;
  height: string;
  url: string;
  targetOption: string;
}

export interface InlineStyleRanges {
  offset: number;
  length: number;
  style: string;
}

export interface EntityRanges {
  offset: number;
  length: number;
  key: number;
}
