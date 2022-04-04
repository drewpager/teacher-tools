import { Request } from 'express';
import { 
  UserArgs, 
  UserPlaylistArgs, 
  UserPlaylistData, 
  UserLessonArgs, 
  UserLessonData 
} from './types';
import { authorize } from '../../../lib/utils/';
import { User, Database } from '../../../lib/types';

export const userResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }  
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });
        
        if (!user) {
          throw new Error("User can't be found");
        }

        const viewer = await authorize(db, req);

        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    }
  },
  User: {
    id: (user: User) => {
      return user._id;
    },
    hasPayment: (user: User) => {
      return Boolean(user.paymentId);
    },
    playlists: async (
      user: User,
      { limit, page }: UserPlaylistArgs,
      { db }: { db: Database } 
    ): Promise<UserPlaylistData | null> => {
      try {
        if (!user.authorized) {
          return null
        }
        
        const data: UserPlaylistData = {
          total: 0,
          result: []
        }
        
        let cursor = await db.playlists.find({ id: { $in: user.playlists }})

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data
      } catch (e) {
        throw new Error(`Failed to query user playlists: ${e}`);
      }
    },
    lessons: async (
      user: User,
      { limit, page }: UserLessonArgs,
      { db }: { db: Database } 
    ): Promise<UserLessonData | null> => {
      try {
        const data: UserLessonData = {
          total: 0,
          result: []
        }

        let cursor = await db.lessons.find({ creator: 
          { $in: [user && user._id ? user._id : "0"] }
        })

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);
        
        data.total = await cursor.count();
        data.result = await cursor.toArray();

        if (data.total === 0) {
          return null;
        }

        return data;
      } catch (e) {
        throw new Error(`Failed to query user lessons: ${e}`);
      }
    }
  }
}
