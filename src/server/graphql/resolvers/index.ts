import merge from 'lodash.merge';
import { viewerResolvers } from './Viewer'
import { lessonResolvers } from './Lesson'

export const resolvers = merge(viewerResolvers, lessonResolvers);