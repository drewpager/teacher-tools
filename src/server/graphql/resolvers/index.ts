import merge from "lodash.merge";
import { viewerResolvers } from "./Viewer";
import { lessonResolvers } from "./Lesson";
import { userResolvers } from "./User";
import { playlistResolvers } from "./Playlist";
import { quizResolvers } from "./Quiz";
import { articleResolvers } from "./Article";

export const resolvers = merge(
  viewerResolvers,
  lessonResolvers,
  userResolvers,
  playlistResolvers,
  quizResolvers,
  articleResolvers
);
