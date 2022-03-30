import merge from 'lodash.merge';
import { viewerResolvers } from './Viewer'
import { lessonResolvers } from './Lesson'
import { userResolvers } from './User';

export const resolvers = merge(viewerResolvers, lessonResolvers, userResolvers);