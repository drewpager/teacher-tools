import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateScalar

  enum AnswerFormat {
    MULTIPLECHOICE
    TRUEFALSE
  }

  union LessonPlanUnion = Quiz | Lesson

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
    startDate: DateScalar
    endDate: DateScalar
    creator: String
  }

  type Quiz {
    id: ID
    question: String!
    answerType: AnswerFormat! 
    correctAnswer: String!
    answerOptions: [String]!
  }

  type Lessons {
    total: Int!
    result: [Lesson!]!
    totalCount: Int!
  }

  type Playlist {
    id: ID
    name: String!
    plan: [LessonPlanUnion]!
    creator: String!
    authorized: Boolean
  }

  type Playlists {
    total: Int!
    result: [Playlist!]!
    totalCount: Int!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    lesson(id: ID!): Lesson!
    playlist(id: ID!): Playlist!
    allplaylists(limit: Int!, page: Int!): Playlists!
    allLessons(limit: Int!, page: Int!): Lessons!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    createLesson(input: CreateLessonInput): Lesson!
    lessonPlan(input: LessonPlanInput): Playlist!
    updatePlan(input: LessonPlanInput): Playlist!
    deleteLesson(id: ID): Boolean!
    deletePlaylist(id: ID): Boolean!
  }

  input LogInInput {
    code: String!
  }

  input CreateLessonInput {
    id: ID!
    title: String!
    meta: String!
    category: [String!]!
    video: String!
    image: String!
    startDate: DateScalar!
    endDate: DateScalar!
  }

  input FullLessonInput {
    id: ID
    category: [String]
    title: String
    meta: String
    video: String
    image: String
    startDate: DateScalar
    endDate: DateScalar
    creator: String
  }

  input FullLessonQuiz {
    id: ID
    question: String!
    answerType: AnswerFormat! 
    correctAnswer: String!
    answerOptions: [String]!
  }

  input FullPlanInput {
    lesson: FullLessonInput
    quiz: FullLessonQuiz
  }

  input LessonPlanInput {
    name: String!
    creator: String!
    plan: [FullPlanInput!]!
  }
`;
