/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_playlists_result_plan {
  __typename: "Lesson";
  id: string | null;
  title: string | null;
  video: string | null;
  startDate: number | null;
  endDate: number | null;
}

export interface User_user_playlists_result {
  __typename: "Playlist";
  id: string | null;
  name: string;
  plan: (User_user_playlists_result_plan | null)[];
}

export interface User_user_playlists {
  __typename: "Playlists";
  total: number;
  result: User_user_playlists_result[];
}

export interface User_user_lessons_result {
  __typename: "Lesson";
  id: string | null;
  category: (string | null)[] | null;
  title: string | null;
  meta: string | null;
  video: string | null;
  startDate: number | null;
  endDate: number | null;
  creator: string | null;
}

export interface User_user_lessons {
  __typename: "Lessons";
  total: number;
  result: User_user_lessons_result[];
}

export interface User_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  contact: string;
  hasPayment: boolean;
  playlists: User_user_playlists | null;
  lessons: User_user_lessons | null;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
  playlistsPage: number;
  lessonsPage: number;
  limit: number;
}
