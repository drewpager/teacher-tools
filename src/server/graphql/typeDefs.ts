import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasPayment: Boolean
    didRequest: Boolean!
    playlists: [Playlist]
    lessons: [Lesson]
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasPayment: Boolean!
    playlists(limit: Int!, page: Int!): Playlists
    lessons(limit: Int!, page: Int!): Lessons
  }

  type Lesson {
    id: ID
    category: [String]
    title: String
    meta: String
    video: String
    image: String
    startDate: Int
    endDate: Int
    creator: String
  }

  type Lessons {
    total: Int!
    result: [Lesson!]!
  }

  type Playlist {
    id: ID
    name: String!
    plan: [Lesson]!
    creator: String!
    authorized: Boolean
  }

  type Playlists {
    total: Int!
    result: [Playlist!]!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    lesson(id: ID!): Lesson!
    playlist(id: ID!): Playlist!
    allplaylists(limit: Int!, page: Int!): Playlists!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    lessonPlan: String!
    createLesson (input: CreateLessonInput): Lesson!
  }

  input LogInInput {
    code: String!
  }

  input CreateLessonInput {
    title: String!
    meta: String!
    category: [String!]!
    video: String!
    image: String
    startDate: Int!
    endDate: Int!
  }
`;
