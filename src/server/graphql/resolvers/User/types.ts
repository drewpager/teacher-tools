import { Playlist, Lesson } from '../../../lib/types';

export interface UserArgs {
  id: string;
}

export interface UserPlaylistArgs {
  limit: number;
  page: number;
}

export interface UserPlaylistData {
  total: number;
  result: Playlist[];
  totalCount: number;
}

export interface UserLessonArgs {
  limit: number;
  page: number;
}

export interface UserLessonData {
  total: number;
  result: Lesson[];
}