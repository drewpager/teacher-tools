import { IResolvers } from '@graphql-tools/utils';
import { Database, Lesson } from '../../../lib/types';
import { ObjectId } from 'mongodb';

export const lessonResolvers: IResolvers = {
  Query: {
    lessons: async (
      _root: undefined, 
      _args: Record<string, never>, // replace with `{}` if broken
      { db }: { db: Database}
    ): Promise<Lesson[]> => {
      return await db.lessons.find({}).toArray();
    }
  },
  Mutation: {
    deleteLesson: async (
      _root: undefined, 
      { id }: { id: string }, 
      { db }: { db: Database }
    ): Promise<Lesson> => {
      const deleteRes = await db.lessons.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deleteRes.value) {
        throw new Error("Failed to delete lesson.");
      }
      
      return deleteRes.value;
    }
  },
  Lesson: {
    id: (lesson: Lesson): string => lesson._id.toString()
  }
};