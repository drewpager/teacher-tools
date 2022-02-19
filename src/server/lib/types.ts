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

export interface Playlist {
  _id: ObjectId;
  name: string;
  plan: Lesson[];
}

export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  watched: string[];
  payment?: string;
  playlists?: Playlist[];
}

export interface Database {
  lessons: Collection<Lesson>;
  users: Collection<User>;
}