import DataLoader from "dataloader";
import { Database, Lesson, Playlist, Quiz, Article } from "../types";

// Batch function for loading playlists by creator IDs
const batchPlaylistsByCreator = async (
  db: Database,
  creatorIds: readonly string[]
) => {
  const playlists = await db.playlists
    .find({ creator: { $in: [...creatorIds] } })
    .toArray();

  // Map results back to the order of input IDs
  const playlistsByCreator = new Map<string, Playlist[]>();
  for (const playlist of playlists) {
    const creatorId = playlist.creator;
    if (!playlistsByCreator.has(creatorId)) {
      playlistsByCreator.set(creatorId, []);
    }
    playlistsByCreator.get(creatorId)!.push(playlist);
  }

  return creatorIds.map((id) => playlistsByCreator.get(id) || []);
};

// Batch function for loading lessons by creator IDs
const batchLessonsByCreator = async (
  db: Database,
  creatorIds: readonly string[]
) => {
  const lessons = await db.lessons
    .find({ creator: { $in: [...creatorIds] } })
    .toArray();

  const lessonsByCreator = new Map<string, Lesson[]>();
  for (const lesson of lessons) {
    const creatorId = lesson.creator;
    if (!lessonsByCreator.has(creatorId)) {
      lessonsByCreator.set(creatorId, []);
    }
    lessonsByCreator.get(creatorId)!.push(lesson);
  }

  return creatorIds.map((id) => lessonsByCreator.get(id) || []);
};

// Batch function for loading quizzes by creator IDs
const batchQuizzesByCreator = async (
  db: Database,
  creatorIds: readonly string[]
) => {
  const quizzes = await db.quizzes
    .find({ creator: { $in: [...creatorIds] } })
    .toArray();

  const quizzesByCreator = new Map<string, Quiz[]>();
  for (const quiz of quizzes) {
    const creatorId = quiz.creator;
    if (!quizzesByCreator.has(creatorId)) {
      quizzesByCreator.set(creatorId, []);
    }
    quizzesByCreator.get(creatorId)!.push(quiz);
  }

  return creatorIds.map((id) => quizzesByCreator.get(id) || []);
};

// Batch function for loading articles by creator IDs
const batchArticlesByCreator = async (
  db: Database,
  creatorIds: readonly string[]
) => {
  const articles = await db.articles
    .find({ creator: { $in: [...creatorIds] } })
    .toArray();

  const articlesByCreator = new Map<string, Article[]>();
  for (const article of articles) {
    const creatorId = article.creator;
    if (!articlesByCreator.has(creatorId)) {
      articlesByCreator.set(creatorId, []);
    }
    articlesByCreator.get(creatorId)!.push(article);
  }

  return creatorIds.map((id) => articlesByCreator.get(id) || []);
};

// Batch function for loading lessons by IDs (for bookmarks)
const batchLessonsById = async (
  db: Database,
  lessonIds: readonly string[]
) => {
  // Query lessons - the _id field can be a string in this database
  const lessons = await db.lessons
    .find({ _id: { $in: lessonIds as any } })
    .toArray();

  const lessonsById = new Map<string, Lesson>();
  for (const lesson of lessons) {
    lessonsById.set(lesson._id.toString(), lesson);
  }

  return lessonIds.map((id) => lessonsById.get(id) || null);
};

export interface Loaders {
  playlistsByCreator: DataLoader<string, Playlist[]>;
  lessonsByCreator: DataLoader<string, Lesson[]>;
  quizzesByCreator: DataLoader<string, Quiz[]>;
  articlesByCreator: DataLoader<string, Article[]>;
  lessonsById: DataLoader<string, Lesson | null>;
}

export const createLoaders = (db: Database): Loaders => ({
  playlistsByCreator: new DataLoader((keys) =>
    batchPlaylistsByCreator(db, keys)
  ),
  lessonsByCreator: new DataLoader((keys) =>
    batchLessonsByCreator(db, keys)
  ),
  quizzesByCreator: new DataLoader((keys) =>
    batchQuizzesByCreator(db, keys)
  ),
  articlesByCreator: new DataLoader((keys) =>
    batchArticlesByCreator(db, keys)
  ),
  lessonsById: new DataLoader((keys) =>
    batchLessonsById(db, keys)
  ),
});
