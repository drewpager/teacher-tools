import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateScalar
  scalar JSON

  enum AnswerFormat {
    MULTIPLECHOICE
    TRUEFALSE
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    contact: String
    paymentId: String
    didRequest: Boolean!
    playlists: [Playlist]
    lessons: [Lesson]
    quizzes: [Quiz]
    articles: [Article]
    bookmarks: [Lesson]
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    paymentId: String
    package: Package
    playlists(limit: Int!, page: Int!): Playlists
    lessons(limit: Int!, page: Int!): Lessons
    quizzes(limit: Int!, page: Int!): Quizzes
    articles(limit: Int!, page: Int!): Articles
    bookmarks: [Lesson]
  }

  type Package {
    amount: Int
    cadence: String
    status: String
    since: Int
    trialEnd: Int
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
    public: Boolean
    duration: Int
  }

  type AnswerOptions {
    answerText: String
    isCorrect: Boolean
  }

  type Questions {
    question: String
    answerOptions: [AnswerOptions]
    answerType: AnswerFormat
  }

  type Quiz {
    id: ID
    title: String
    questions: [Questions!]!
    creator: String
    public: Boolean
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
    public: Boolean
    premium: Boolean
    level: [Int!]
    category: [String]
  }

  type Playlists {
    total: Int!
    result: [Playlist!]!
    totalCount: Int!
  }

  type Quizzes {
    total: Int!
    result: [Quiz!]!
    totalCount: Int!
  }

  type Users {
    total: Int!
    result: [User!]!
    totalCount: Int!
  }

  type Article {
    id: ID
    title: String
    content: Content
    creator: String
    public: Boolean
    pdf: String
  }

  type Articles {
    total: Int!
    result: [Article!]!
    totalCount: Int!
  }

  type Content {
    blocks: [Blocks]
    entityMap: [EntityMap]
  }

  type EntityMap {
    type: String
    mutability: String
    data: EntityMapData
  }

  type EntityMapData {
    src: String
    width: String
    alignment: String
    height: String
    url: String
    targetOption: String
  }

  type Blocks {
    key: String
    text: String
    type: String
    depth: Int
    inlineStyleRanges: [InlineStyleRanges]
    entityRanges: [EntityRanges]
  }

  type InlineStyleRanges {
    offset: Int
    length: Int
    style: String
  }

  type EntityRanges {
    offset: Int
    length: Int
    key: Int
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    lesson(id: ID!): Lesson!
    playlist(id: ID!): Playlist!
    plan(title: String!): Playlist!
    article(id: ID!): Article!
    allarticles(limit: Int!, page: Int!): Articles!
    allplaylists(limit: Int!, page: Int!): Playlists!
    allLessons(limit: Int!, page: Int!): Lessons!
    allUsers(limit: Int!, page: Int!): Users!
    quiz(id: ID!): Quiz!
    allquizzes(limit: Int!, page: Int!): Quizzes!
    relatedPlans(id: ID!): [Playlist!]!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    disconnectStripe: Viewer!
    createLesson(input: CreateLessonInput): Lesson!
    createQuiz(input: CreateQuizInput): Quiz!
    generateQuiz(
      numMCQuestions: Int!
      numTFQuestions: Int!
      subject: String!
    ): JSON
    createArticle(input: CreateArticleInput): Article!
    lessonPlan(input: LessonPlanInput, viewerId: ID): Playlist!
    updatePlan(input: LessonPlanInput, id: ID): Playlist!
    deleteLesson(id: ID): Boolean!
    deletePlaylist(id: ID): Boolean!
    deleteQuiz(id: ID): Boolean!
    deleteArticle(id: ID): Boolean!
    deleteAllBookmarks(id: ID): String
    updatePlanPublic(id: ID, publicStatus: Boolean): Boolean!
    bookmarkLesson(id: ID!, viewer: String!): String
    addPayment(id: ID!): Viewer
    copyPlaylist(id: ID!, viewerId: String!): Playlist
  }

  input LogInInput {
    code: String
    email: String
    password: String
  }

  input CreateLessonInput {
    title: String!
    meta: String!
    category: [String!]!
    video: String!
    image: String!
    startDate: DateScalar!
    endDate: DateScalar!
    creator: String!
    public: Boolean
    duration: Int
  }

  input CreateArticleInput {
    title: String
    content: ContentInput
    creator: String
    public: Boolean
    pdf: String
  }

  input ContentInput {
    blocks: [BlocksInput]
    entityMap: [EntityMapInput]
  }

  input EntityMapInput {
    type: String
    mutability: String
    data: DataInput
  }

  input DataObject {
    url: String
  }

  input DataInput {
    src: String
    width: String
    alignment: String
    height: String
    url: String
    targetOption: String
  }

  input BlocksInput {
    key: String
    text: String
    type: String
    depth: Int
    inlineStyleRanges: [InlineStyleRangesInput]
    entityRanges: [EntityRangesInput]
    data: DataObject
  }

  input InlineStyleRangesInput {
    offset: Int
    length: Int
    style: String
  }

  input EntityRangesInput {
    offset: Int
    length: Int
    key: Int
  }

  input CreateQuizInput {
    title: String
    questions: [QuestionInput]
    creator: String
    public: Boolean
  }

  input QuestionInput {
    question: String
    answerOptions: [AnswerInput]
    answerType: AnswerFormat
  }

  input AnswerInput {
    answerText: String
    isCorrect: Boolean
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
    public: Boolean
    duration: Int
  }

  input Answers {
    answerText: String
    isCorrect: Boolean
  }

  input QuizQuestions {
    question: String
    answerOptions: [Answers]
    answerType: AnswerFormat
  }

  input FullLessonQuiz {
    id: ID
    title: String
    questions: [QuizQuestions]
    creator: String
    public: Boolean
  }

  input Plan {
    _id: ID
    category: [String]
    title: String
    meta: String
    video: String
    image: String
    startDate: DateScalar
    endDate: DateScalar
    questions: [QuizQuestions]
    creator: String
    content: ContentInput
    public: Boolean
    pdf: String
    duration: Int
  }

  input LessonPlanInput {
    name: String!
    creator: String!
    plan: [Plan]!
    public: Boolean
    premium: Boolean
    level: [Int!]
    category: [String]
  }

  union LessonPlanUnion = Quiz | Lesson | Article
`;
