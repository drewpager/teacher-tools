import merge from 'lodash.merge';
import { viewerResolvers } from './Viewer'
import { lessonResolvers } from './Lesson'
import { userResolvers } from './User';
import { playlistResolvers } from './Playlist';

export const resolvers = merge(viewerResolvers, lessonResolvers, userResolvers, playlistResolvers);