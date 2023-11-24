import { Database, Article, Viewer, Playlist } from "../../../lib/types";
import {
  CreateArticleArgs,
  ArticlesArgs,
  ArticleArgs,
  ArticlesData,
} from "./types";
import { ObjectId } from "mongodb";

export const articleResolvers = {
  Query: {
    article: async (
      _root: undefined,
      { id }: ArticleArgs,
      { db }: { db: Database }
    ): Promise<Article> => {
      const article = await db.articles.findOne({ _id: new ObjectId(id) });
      if (!article) {
        throw new Error("Failed to query article");
      }
      return article;
    },
    allarticles: async (
      _root: undefined,
      { limit, page }: ArticlesArgs,
      { db }: { db: Database }
    ): Promise<ArticlesData> => {
      const data: ArticlesData = {
        total: 0,
        result: [],
        totalCount: 0,
      };
      let cursor = await db.articles.find({});
      const count = cursor;
      cursor = cursor.skip(page > 1 ? (page - 1) * limit : 0);
      cursor = cursor.limit(limit);
      data.total = await cursor.count();
      data.result = await cursor.toArray();
      data.totalCount = await count.count();
      return data;
    },
    relatedPlans: async (
      _root: undefined,
      { id }: ArticleArgs,
      { db }: { db: Database }
    ): Promise<Playlist[]> => {
      const related = await db.playlists
        .find({ public: true, plan: { $elemMatch: { _id: id } } })
        .limit(3);
      const cursor = await related.toArray();
      if (cursor.length === 0 || !cursor) {
        const anyPlaylists = await db.playlists
          .find({ public: true })
          .sort({ _id: -1 })
          .limit(3);
        if (!anyPlaylists) {
          throw new Error("Failed to query related plans");
        }
        return anyPlaylists.toArray();
        // throw new Error("Failed to query related plans");
      }
      return cursor;
    },
  },
  Article: {
    id: (article: Article) => {
      return article._id;
    },
    content: (article: Article) => {
      if (article.content.entityMap.type === "IMAGE") {
        return article.content.entityMap.data.src;
      }

      if (article.content.entityMap.type === "LINK") {
        return article.content.entityMap.data.url;
      }

      return article.content;
    },
  },
  Mutation: {
    createArticle: async (
      _root: undefined,
      { input }: CreateArticleArgs,
      { db }: { db: Database }
    ): Promise<Article> => {
      const id = new ObjectId();
      try {
        const insertArticle = await db.articles.insertOne({
          _id: id,
          ...input,
        });
        const insertedArticle = insertArticle
          ? await db.articles.findOne({ _id: insertArticle.insertedId })
          : false;
        if (!insertedArticle) {
          throw new Error(`Failed to insert article!`);
        }
        return insertedArticle;
      } catch (err) {
        throw new Error(`Failed with error: ${err}`);
      }
    },
    deleteArticle: async (
      _root: undefined,
      { id }: ArticleArgs,
      { db }: { db: Database }
    ): Promise<boolean | undefined> => {
      try {
        const deletedArticle = await db.articles.deleteOne({
          _id: new ObjectId(id),
        });
        if (!deletedArticle) {
          throw new Error("Failed to delete quiz");
        }
        return deletedArticle.acknowledged;
      } catch (error) {
        throw new Error(`Failed to start deleting article: ${error}`);
      }
    },
  },
};
