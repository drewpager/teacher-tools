import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Banking account number is a string of 5 to 17 alphanumeric values for representing an generic account number */
  AccountNumber: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A country code as defined by ISO 3166-1 alpha-2 */
  CountryCode: any;
  /** A field whose value conforms to the standard cuid format as specified in https://github.com/ericelliott/cuid#broken-down */
  Cuid: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A valid date object */
  DateScalar: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: any;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: any;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: any;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: any;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: any;
  /** The locale in the format of a BCP 47 (RFC 5646) standard string */
  Locale: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: any;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: any;
  /** Floats that will have a value less than 0. */
  NegativeFloat: any;
  /** Integers that will have a value less than 0. */
  NegativeInt: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: any;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: any;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: any;
  /** In the US, an ABA routing transit number (`ABA RTN`) is a nine-digit code to identify the financial institution. */
  RoutingNumber: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones */
  TimeZone: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /** Represents NULL values */
  Void: any;
  _FieldSet: any;
};

export enum AnswerFormat {
  Multiplechoice = 'MULTIPLECHOICE',
  Truefalse = 'TRUEFALSE'
}

export type AnswerInput = {
  answerText?: InputMaybe<Scalars['String']>;
  isCorrect?: InputMaybe<Scalars['Boolean']>;
};

export type AnswerOptions = {
  __typename?: 'AnswerOptions';
  answerText?: Maybe<Scalars['String']>;
  isCorrect?: Maybe<Scalars['Boolean']>;
};

export type Answers = {
  answerText?: InputMaybe<Scalars['String']>;
  isCorrect?: InputMaybe<Scalars['Boolean']>;
};

export type Article = {
  __typename?: 'Article';
  content?: Maybe<Content>;
  creator?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  pdf?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type Articles = {
  __typename?: 'Articles';
  result: Array<Article>;
  total: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Blocks = {
  __typename?: 'Blocks';
  depth?: Maybe<Scalars['Int']>;
  entityRanges?: Maybe<Array<Maybe<EntityRanges>>>;
  inlineStyleRanges?: Maybe<Array<Maybe<InlineStyleRanges>>>;
  key?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type BlocksInput = {
  data?: InputMaybe<DataObject>;
  depth?: InputMaybe<Scalars['Int']>;
  entityRanges?: InputMaybe<Array<InputMaybe<EntityRangesInput>>>;
  inlineStyleRanges?: InputMaybe<Array<InputMaybe<InlineStyleRangesInput>>>;
  key?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Content = {
  __typename?: 'Content';
  blocks?: Maybe<Array<Maybe<Blocks>>>;
  entityMap?: Maybe<Array<Maybe<EntityMap>>>;
};

export type ContentInput = {
  blocks?: InputMaybe<Array<InputMaybe<BlocksInput>>>;
  entityMap?: InputMaybe<Array<InputMaybe<EntityMapInput>>>;
};

export type CreateArticleInput = {
  content?: InputMaybe<ContentInput>;
  creator?: InputMaybe<Scalars['String']>;
  pdf?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateLessonInput = {
  category: Array<Scalars['String']>;
  creator: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  endDate: Scalars['DateScalar'];
  image: Scalars['String'];
  meta: Scalars['String'];
  public?: InputMaybe<Scalars['Boolean']>;
  script?: InputMaybe<Scalars['String']>;
  startDate: Scalars['DateScalar'];
  title: Scalars['String'];
  video: Scalars['String'];
};

export type CreateQuizInput = {
  creator?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type DataInput = {
  alignment?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['String']>;
  src?: InputMaybe<Scalars['String']>;
  targetOption?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['String']>;
};

export type DataObject = {
  url?: InputMaybe<Scalars['String']>;
};

export type EntityMap = {
  __typename?: 'EntityMap';
  data?: Maybe<EntityMapData>;
  mutability?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type EntityMapData = {
  __typename?: 'EntityMapData';
  alignment?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  targetOption?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['String']>;
};

export type EntityMapInput = {
  data?: InputMaybe<DataInput>;
  mutability?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type EntityRanges = {
  __typename?: 'EntityRanges';
  key?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type EntityRangesInput = {
  key?: InputMaybe<Scalars['Int']>;
  length?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type FullLessonInput = {
  category?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  creator?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  endDate?: InputMaybe<Scalars['DateScalar']>;
  id?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  script?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateScalar']>;
  title?: InputMaybe<Scalars['String']>;
  video?: InputMaybe<Scalars['String']>;
};

export type FullLessonQuiz = {
  creator?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  public?: InputMaybe<Scalars['Boolean']>;
  questions?: InputMaybe<Array<InputMaybe<QuizQuestions>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type InlineStyleRanges = {
  __typename?: 'InlineStyleRanges';
  length?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  style?: Maybe<Scalars['String']>;
};

export type InlineStyleRangesInput = {
  length?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  style?: InputMaybe<Scalars['String']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
  creator?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  endDate?: Maybe<Scalars['DateScalar']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  meta?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  script?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateScalar']>;
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

export type LessonPlanInput = {
  category?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  creator: Scalars['String'];
  level?: InputMaybe<Array<Scalars['Int']>>;
  name: Scalars['String'];
  plan: Array<InputMaybe<Plan>>;
  premium?: InputMaybe<Scalars['Boolean']>;
  public?: InputMaybe<Scalars['Boolean']>;
};

export type LessonPlanUnion = Article | Lesson | Quiz;

export type Lessons = {
  __typename?: 'Lessons';
  result: Array<Lesson>;
  total: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type LogInInput = {
  code?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPayment?: Maybe<Viewer>;
  bookmarkLesson?: Maybe<Scalars['String']>;
  copyPlaylist?: Maybe<Playlist>;
  createArticle: Article;
  createLesson: Lesson;
  createQuiz: Quiz;
  deleteAllBookmarks?: Maybe<Scalars['String']>;
  deleteArticle: Scalars['Boolean'];
  deleteLesson: Scalars['Boolean'];
  deletePlaylist: Scalars['Boolean'];
  deleteQuiz: Scalars['Boolean'];
  disconnectStripe: Viewer;
  generateQuiz?: Maybe<Scalars['JSON']>;
  lessonPlan: Playlist;
  logIn: Viewer;
  logOut: Viewer;
  updatePlan: Playlist;
  updatePlanPublic: Scalars['Boolean'];
};


export type MutationAddPaymentArgs = {
  id: Scalars['ID'];
};


export type MutationBookmarkLessonArgs = {
  id: Scalars['ID'];
  viewer: Scalars['String'];
};


export type MutationCopyPlaylistArgs = {
  id: Scalars['ID'];
  viewerId: Scalars['String'];
};


export type MutationCreateArticleArgs = {
  input?: InputMaybe<CreateArticleInput>;
};


export type MutationCreateLessonArgs = {
  input?: InputMaybe<CreateLessonInput>;
};


export type MutationCreateQuizArgs = {
  input?: InputMaybe<CreateQuizInput>;
};


export type MutationDeleteAllBookmarksArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteArticleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteLessonArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeletePlaylistArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteQuizArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationGenerateQuizArgs = {
  numMCQuestions: Scalars['Int'];
  numTFQuestions: Scalars['Int'];
  subject: Scalars['String'];
};


export type MutationLessonPlanArgs = {
  input?: InputMaybe<LessonPlanInput>;
  viewerId?: InputMaybe<Scalars['ID']>;
};


export type MutationLogInArgs = {
  input?: InputMaybe<LogInInput>;
};


export type MutationUpdatePlanArgs = {
  id?: InputMaybe<Scalars['ID']>;
  input?: InputMaybe<LessonPlanInput>;
};


export type MutationUpdatePlanPublicArgs = {
  id?: InputMaybe<Scalars['ID']>;
  publicStatus?: InputMaybe<Scalars['Boolean']>;
};

export type Package = {
  __typename?: 'Package';
  amount?: Maybe<Scalars['Int']>;
  cadence?: Maybe<Scalars['String']>;
  since?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  trialEnd?: Maybe<Scalars['Int']>;
};

export type Plan = {
  _id?: InputMaybe<Scalars['ID']>;
  category?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  content?: InputMaybe<ContentInput>;
  creator?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  endDate?: InputMaybe<Scalars['DateScalar']>;
  image?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['String']>;
  pdf?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  questions?: InputMaybe<Array<InputMaybe<QuizQuestions>>>;
  script?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateScalar']>;
  title?: InputMaybe<Scalars['String']>;
  video?: InputMaybe<Scalars['String']>;
};

export type Playlist = {
  __typename?: 'Playlist';
  authorized?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
  creator: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  level?: Maybe<Array<Scalars['Int']>>;
  name: Scalars['String'];
  plan: Array<Maybe<LessonPlanUnion>>;
  premium?: Maybe<Scalars['Boolean']>;
  public?: Maybe<Scalars['Boolean']>;
};

export type Playlists = {
  __typename?: 'Playlists';
  result: Array<Playlist>;
  total: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allLessons: Lessons;
  allUsers: Users;
  allarticles: Articles;
  allplaylists: Playlists;
  allquizzes: Quizzes;
  article: Article;
  authUrl: Scalars['String'];
  lesson: Lesson;
  lessonTitle: Lesson;
  plan: Playlist;
  playlist: Playlist;
  quiz: Quiz;
  relatedPlans: Array<Playlist>;
  user: User;
};


export type QueryAllLessonsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryAllUsersArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryAllarticlesArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryAllplaylistsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryAllquizzesArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
};


export type QueryLessonArgs = {
  id: Scalars['ID'];
};


export type QueryLessonTitleArgs = {
  title: Scalars['String'];
};


export type QueryPlanArgs = {
  title: Scalars['String'];
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryQuizArgs = {
  id: Scalars['ID'];
};


export type QueryRelatedPlansArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QuestionInput = {
  answerOptions?: InputMaybe<Array<InputMaybe<AnswerInput>>>;
  answerType?: InputMaybe<AnswerFormat>;
  question?: InputMaybe<Scalars['String']>;
};

export type Questions = {
  __typename?: 'Questions';
  answerOptions?: Maybe<Array<Maybe<AnswerOptions>>>;
  answerType?: Maybe<AnswerFormat>;
  question?: Maybe<Scalars['String']>;
};

export type Quiz = {
  __typename?: 'Quiz';
  creator?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  public?: Maybe<Scalars['Boolean']>;
  questions: Array<Questions>;
  title?: Maybe<Scalars['String']>;
};

export type QuizQuestions = {
  answerOptions?: InputMaybe<Array<InputMaybe<Answers>>>;
  answerType?: InputMaybe<AnswerFormat>;
  question?: InputMaybe<Scalars['String']>;
};

export type Quizzes = {
  __typename?: 'Quizzes';
  result: Array<Quiz>;
  total: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  articles?: Maybe<Articles>;
  avatar: Scalars['String'];
  bookmarks?: Maybe<Array<Maybe<Lesson>>>;
  contact: Scalars['String'];
  id: Scalars['ID'];
  lessons?: Maybe<Lessons>;
  name: Scalars['String'];
  package?: Maybe<Package>;
  paymentId?: Maybe<Scalars['String']>;
  playlists?: Maybe<Playlists>;
  quizzes?: Maybe<Quizzes>;
};


export type UserArticlesArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type UserLessonsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type UserPlaylistsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type UserQuizzesArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type Users = {
  __typename?: 'Users';
  result: Array<User>;
  total: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Viewer = {
  __typename?: 'Viewer';
  articles?: Maybe<Array<Maybe<Article>>>;
  avatar?: Maybe<Scalars['String']>;
  bookmarks?: Maybe<Array<Maybe<Lesson>>>;
  contact?: Maybe<Scalars['String']>;
  didRequest: Scalars['Boolean'];
  id?: Maybe<Scalars['ID']>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  paymentId?: Maybe<Scalars['String']>;
  playlists?: Maybe<Array<Maybe<Playlist>>>;
  quizzes?: Maybe<Array<Maybe<Quiz>>>;
  token?: Maybe<Scalars['String']>;
};

export type AddPaymentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AddPaymentMutation = { __typename?: 'Mutation', addPayment?: { __typename?: 'Viewer', paymentId?: string | null } | null };

export type CreateArticleMutationVariables = Exact<{
  input: CreateArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', id?: string | null } };

export type CreateLessonMutationVariables = Exact<{
  input: CreateLessonInput;
}>;


export type CreateLessonMutation = { __typename?: 'Mutation', createLesson: { __typename?: 'Lesson', id?: string | null } };

export type LessonPlanMutationVariables = Exact<{
  input: LessonPlanInput;
  viewerId: Scalars['ID'];
}>;


export type LessonPlanMutation = { __typename?: 'Mutation', lessonPlan: { __typename?: 'Playlist', id?: string | null } };

export type CreateQuizMutationVariables = Exact<{
  input: CreateQuizInput;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'Quiz', id?: string | null } };

export type DeleteAllBookmarksMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAllBookmarksMutation = { __typename?: 'Mutation', deleteAllBookmarks?: string | null };

export type GenerateQuizMutationVariables = Exact<{
  numMcQuestions: Scalars['Int'];
  numTfQuestions: Scalars['Int'];
  subject: Scalars['String'];
}>;


export type GenerateQuizMutation = { __typename?: 'Mutation', generateQuiz?: any | null };

export type LogInMutationVariables = Exact<{
  input?: InputMaybe<LogInInput>;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, contact?: string | null, paymentId?: string | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, contact?: string | null, didRequest: boolean } };

export type UpdatePlanMutationVariables = Exact<{
  input?: InputMaybe<LessonPlanInput>;
  id?: InputMaybe<Scalars['ID']>;
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Playlist', id?: string | null } };

export type ArticleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', id?: string | null, title?: string | null, creator?: string | null, pdf?: string | null, public?: boolean | null, content?: { __typename?: 'Content', blocks?: Array<{ __typename?: 'Blocks', key?: string | null, text?: string | null, type?: string | null, depth?: number | null, inlineStyleRanges?: Array<{ __typename?: 'InlineStyleRanges', style?: string | null, offset?: number | null, length?: number | null } | null> | null, entityRanges?: Array<{ __typename?: 'EntityRanges', offset?: number | null, length?: number | null, key?: number | null } | null> | null } | null> | null, entityMap?: Array<{ __typename?: 'EntityMap', type?: string | null, mutability?: string | null, data?: { __typename?: 'EntityMapData', src?: string | null, width?: string | null, alignment?: string | null, height?: string | null, url?: string | null, targetOption?: string | null } | null } | null> | null } | null } };

export type AllArticlesQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllArticlesQuery = { __typename?: 'Query', allarticles: { __typename?: 'Articles', total: number, result: Array<{ __typename?: 'Article', id?: string | null, title?: string | null, creator?: string | null, pdf?: string | null, public?: boolean | null, content?: { __typename?: 'Content', blocks?: Array<{ __typename?: 'Blocks', key?: string | null, text?: string | null, type?: string | null, depth?: number | null, inlineStyleRanges?: Array<{ __typename?: 'InlineStyleRanges', style?: string | null, offset?: number | null, length?: number | null } | null> | null, entityRanges?: Array<{ __typename?: 'EntityRanges', offset?: number | null, length?: number | null, key?: number | null } | null> | null } | null> | null, entityMap?: Array<{ __typename?: 'EntityMap', type?: string | null, mutability?: string | null, data?: { __typename?: 'EntityMapData', src?: string | null, width?: string | null, alignment?: string | null, height?: string | null, targetOption?: string | null } | null } | null> | null } | null }> } };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };

export type LessonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LessonQuery = { __typename?: 'Query', lesson: { __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null, public?: boolean | null, duration?: number | null, script?: string | null } };

export type LessonTitleQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type LessonTitleQuery = { __typename?: 'Query', lessonTitle: { __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null, public?: boolean | null, duration?: number | null, script?: string | null } };

export type AllLessonsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllLessonsQuery = { __typename?: 'Query', allLessons: { __typename?: 'Lessons', total: number, result: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null, public?: boolean | null, duration?: number | null, script?: string | null }> } };

export type PlanQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type PlanQuery = { __typename?: 'Query', plan: { __typename?: 'Playlist', id?: string | null, name: string, creator: string, public?: boolean | null, premium?: boolean | null, level?: Array<number> | null, category?: Array<string | null> | null, plan: Array<{ __typename?: 'Article', id?: string | null, title?: string | null, creator?: string | null, pdf?: string | null, public?: boolean | null, content?: { __typename?: 'Content', blocks?: Array<{ __typename?: 'Blocks', key?: string | null, text?: string | null, type?: string | null, depth?: number | null, inlineStyleRanges?: Array<{ __typename?: 'InlineStyleRanges', style?: string | null, offset?: number | null, length?: number | null } | null> | null, entityRanges?: Array<{ __typename?: 'EntityRanges', offset?: number | null, length?: number | null, key?: number | null } | null> | null } | null> | null, entityMap?: Array<{ __typename?: 'EntityMap', type?: string | null, mutability?: string | null, data?: { __typename?: 'EntityMapData', src?: string | null, width?: string | null, alignment?: string | null, height?: string | null, url?: string | null, targetOption?: string | null } | null } | null> | null } | null } | { __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null, public?: boolean | null, duration?: number | null, script?: string | null } | { __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType?: AnswerFormat | null, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } | null> } };

export type PlaylistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', id?: string | null, name: string, creator: string, public?: boolean | null, premium?: boolean | null, level?: Array<number> | null, category?: Array<string | null> | null, plan: Array<{ __typename?: 'Article', id?: string | null, title?: string | null, creator?: string | null, pdf?: string | null, public?: boolean | null, content?: { __typename?: 'Content', blocks?: Array<{ __typename?: 'Blocks', key?: string | null, text?: string | null, type?: string | null, depth?: number | null, inlineStyleRanges?: Array<{ __typename?: 'InlineStyleRanges', style?: string | null, offset?: number | null, length?: number | null } | null> | null, entityRanges?: Array<{ __typename?: 'EntityRanges', offset?: number | null, length?: number | null, key?: number | null } | null> | null } | null> | null, entityMap?: Array<{ __typename?: 'EntityMap', type?: string | null, mutability?: string | null, data?: { __typename?: 'EntityMapData', src?: string | null, width?: string | null, alignment?: string | null, height?: string | null, url?: string | null, targetOption?: string | null } | null } | null> | null } | null } | { __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null, public?: boolean | null, duration?: number | null, script?: string | null } | { __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType?: AnswerFormat | null, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } | null> } };

export type AllPlaylistsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllPlaylistsQuery = { __typename?: 'Query', allplaylists: { __typename?: 'Playlists', total: number, result: Array<{ __typename?: 'Playlist', id?: string | null, name: string, creator: string, public?: boolean | null, premium?: boolean | null, level?: Array<number> | null, category?: Array<string | null> | null, plan: Array<{ __typename?: 'Article', id?: string | null, title?: string | null, creator?: string | null, pdf?: string | null, public?: boolean | null, content?: { __typename?: 'Content', blocks?: Array<{ __typename?: 'Blocks', key?: string | null, text?: string | null, type?: string | null, depth?: number | null, inlineStyleRanges?: Array<{ __typename?: 'InlineStyleRanges', style?: string | null, offset?: number | null, length?: number | null } | null> | null, entityRanges?: Array<{ __typename?: 'EntityRanges', offset?: number | null, length?: number | null, key?: number | null } | null> | null } | null> | null, entityMap?: Array<{ __typename?: 'EntityMap', type?: string | null, mutability?: string | null, data?: { __typename?: 'EntityMapData', src?: string | null, width?: string | null, alignment?: string | null, height?: string | null, url?: string | null, targetOption?: string | null } | null } | null> | null } | null } | { __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null, public?: boolean | null, duration?: number | null, script?: string | null } | { __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType?: AnswerFormat | null, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } | null> }> } };

export type QuizQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type QuizQuery = { __typename?: 'Query', quiz: { __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, public?: boolean | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType?: AnswerFormat | null, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } };

export type AllQuizzesQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllQuizzesQuery = { __typename?: 'Query', allquizzes: { __typename?: 'Quizzes', total: number, result: Array<{ __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, public?: boolean | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType?: AnswerFormat | null, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> }> } };

export type RelatedPlansQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RelatedPlansQuery = { __typename?: 'Query', relatedPlans: Array<{ __typename?: 'Playlist', name: string, id?: string | null, creator: string, public?: boolean | null, premium?: boolean | null, level?: Array<number> | null, plan: Array<{ __typename?: 'Article', title?: string | null, public?: boolean | null, pdf?: string | null, id?: string | null, creator?: string | null } | { __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null, public?: boolean | null, duration?: number | null, script?: string | null } | { __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType?: AnswerFormat | null, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } | null> }> };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
  playlistsPage: Scalars['Int'];
  lessonsPage: Scalars['Int'];
  quizzesPage: Scalars['Int'];
  articlesPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, contact: string, paymentId?: string | null, package?: { __typename?: 'Package', amount?: number | null, cadence?: string | null, status?: string | null, since?: number | null, trialEnd?: number | null } | null, bookmarks?: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null } | null> | null, playlists?: { __typename?: 'Playlists', total: number, totalCount: number, result: Array<{ __typename?: 'Playlist', id?: string | null, name: string, creator: string, public?: boolean | null, premium?: boolean | null, level?: Array<number> | null, category?: Array<string | null> | null, plan: Array<{ __typename: 'Article', id?: string | null, title?: string | null, creator?: string | null, pdf?: string | null, public?: boolean | null, content?: { __typename?: 'Content', blocks?: Array<{ __typename?: 'Blocks', key?: string | null, text?: string | null, type?: string | null, depth?: number | null, inlineStyleRanges?: Array<{ __typename?: 'InlineStyleRanges', style?: string | null, offset?: number | null, length?: number | null } | null> | null, entityRanges?: Array<{ __typename?: 'EntityRanges', offset?: number | null, length?: number | null, key?: number | null } | null> | null } | null> | null, entityMap?: Array<{ __typename?: 'EntityMap', type?: string | null, mutability?: string | null, data?: { __typename?: 'EntityMapData', src?: string | null, width?: string | null, alignment?: string | null, height?: string | null, url?: string | null, targetOption?: string | null } | null } | null> | null } | null } | { __typename: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null, public?: boolean | null, duration?: number | null } | { __typename: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, public?: boolean | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType?: AnswerFormat | null, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } | null> }> } | null, lessons?: { __typename?: 'Lessons', total: number, totalCount: number, result: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null, public?: boolean | null, duration?: number | null, script?: string | null }> } | null, quizzes?: { __typename?: 'Quizzes', total: number, totalCount: number, result: Array<{ __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, public?: boolean | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType?: AnswerFormat | null, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> }> } | null, articles?: { __typename?: 'Articles', total: number, totalCount: number, result: Array<{ __typename?: 'Article', id?: string | null, title?: string | null, creator?: string | null, pdf?: string | null, public?: boolean | null, content?: { __typename?: 'Content', blocks?: Array<{ __typename?: 'Blocks', key?: string | null, text?: string | null, type?: string | null, depth?: number | null, inlineStyleRanges?: Array<{ __typename?: 'InlineStyleRanges', style?: string | null, offset?: number | null, length?: number | null } | null> | null, entityRanges?: Array<{ __typename?: 'EntityRanges', offset?: number | null, length?: number | null, key?: number | null } | null> | null } | null> | null, entityMap?: Array<{ __typename?: 'EntityMap', type?: string | null, mutability?: string | null, data?: { __typename?: 'EntityMapData', src?: string | null, width?: string | null, alignment?: string | null, height?: string | null, url?: string | null, targetOption?: string | null } | null } | null> | null } | null }> } | null } };

export type AllUsersQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: { __typename?: 'Users', totalCount: number, result: Array<{ __typename?: 'User', contact: string, paymentId?: string | null }> } };


export const AddPaymentDocument = gql`
    mutation AddPayment($id: ID!) {
  addPayment(id: $id) {
    paymentId
  }
}
    `;
export type AddPaymentMutationFn = Apollo.MutationFunction<AddPaymentMutation, AddPaymentMutationVariables>;

/**
 * __useAddPaymentMutation__
 *
 * To run a mutation, you first call `useAddPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPaymentMutation, { data, loading, error }] = useAddPaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddPaymentMutation(baseOptions?: Apollo.MutationHookOptions<AddPaymentMutation, AddPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPaymentMutation, AddPaymentMutationVariables>(AddPaymentDocument, options);
      }
export type AddPaymentMutationHookResult = ReturnType<typeof useAddPaymentMutation>;
export type AddPaymentMutationResult = Apollo.MutationResult<AddPaymentMutation>;
export type AddPaymentMutationOptions = Apollo.BaseMutationOptions<AddPaymentMutation, AddPaymentMutationVariables>;
export const CreateArticleDocument = gql`
    mutation CreateArticle($input: CreateArticleInput!) {
  createArticle(input: $input) {
    id
  }
}
    `;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const CreateLessonDocument = gql`
    mutation CreateLesson($input: CreateLessonInput!) {
  createLesson(input: $input) {
    id
  }
}
    `;
export type CreateLessonMutationFn = Apollo.MutationFunction<CreateLessonMutation, CreateLessonMutationVariables>;

/**
 * __useCreateLessonMutation__
 *
 * To run a mutation, you first call `useCreateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLessonMutation, { data, loading, error }] = useCreateLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLessonMutation(baseOptions?: Apollo.MutationHookOptions<CreateLessonMutation, CreateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLessonMutation, CreateLessonMutationVariables>(CreateLessonDocument, options);
      }
export type CreateLessonMutationHookResult = ReturnType<typeof useCreateLessonMutation>;
export type CreateLessonMutationResult = Apollo.MutationResult<CreateLessonMutation>;
export type CreateLessonMutationOptions = Apollo.BaseMutationOptions<CreateLessonMutation, CreateLessonMutationVariables>;
export const LessonPlanDocument = gql`
    mutation LessonPlan($input: LessonPlanInput!, $viewerId: ID!) {
  lessonPlan(input: $input, viewerId: $viewerId) {
    id
  }
}
    `;
export type LessonPlanMutationFn = Apollo.MutationFunction<LessonPlanMutation, LessonPlanMutationVariables>;

/**
 * __useLessonPlanMutation__
 *
 * To run a mutation, you first call `useLessonPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLessonPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lessonPlanMutation, { data, loading, error }] = useLessonPlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *      viewerId: // value for 'viewerId'
 *   },
 * });
 */
export function useLessonPlanMutation(baseOptions?: Apollo.MutationHookOptions<LessonPlanMutation, LessonPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LessonPlanMutation, LessonPlanMutationVariables>(LessonPlanDocument, options);
      }
export type LessonPlanMutationHookResult = ReturnType<typeof useLessonPlanMutation>;
export type LessonPlanMutationResult = Apollo.MutationResult<LessonPlanMutation>;
export type LessonPlanMutationOptions = Apollo.BaseMutationOptions<LessonPlanMutation, LessonPlanMutationVariables>;
export const CreateQuizDocument = gql`
    mutation CreateQuiz($input: CreateQuizInput!) {
  createQuiz(input: $input) {
    id
  }
}
    `;
export type CreateQuizMutationFn = Apollo.MutationFunction<CreateQuizMutation, CreateQuizMutationVariables>;

/**
 * __useCreateQuizMutation__
 *
 * To run a mutation, you first call `useCreateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizMutation, { data, loading, error }] = useCreateQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuizMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizMutation, CreateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizMutation, CreateQuizMutationVariables>(CreateQuizDocument, options);
      }
export type CreateQuizMutationHookResult = ReturnType<typeof useCreateQuizMutation>;
export type CreateQuizMutationResult = Apollo.MutationResult<CreateQuizMutation>;
export type CreateQuizMutationOptions = Apollo.BaseMutationOptions<CreateQuizMutation, CreateQuizMutationVariables>;
export const DeleteAllBookmarksDocument = gql`
    mutation DeleteAllBookmarks($id: ID!) {
  deleteAllBookmarks(id: $id)
}
    `;
export type DeleteAllBookmarksMutationFn = Apollo.MutationFunction<DeleteAllBookmarksMutation, DeleteAllBookmarksMutationVariables>;

/**
 * __useDeleteAllBookmarksMutation__
 *
 * To run a mutation, you first call `useDeleteAllBookmarksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAllBookmarksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAllBookmarksMutation, { data, loading, error }] = useDeleteAllBookmarksMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAllBookmarksMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAllBookmarksMutation, DeleteAllBookmarksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAllBookmarksMutation, DeleteAllBookmarksMutationVariables>(DeleteAllBookmarksDocument, options);
      }
export type DeleteAllBookmarksMutationHookResult = ReturnType<typeof useDeleteAllBookmarksMutation>;
export type DeleteAllBookmarksMutationResult = Apollo.MutationResult<DeleteAllBookmarksMutation>;
export type DeleteAllBookmarksMutationOptions = Apollo.BaseMutationOptions<DeleteAllBookmarksMutation, DeleteAllBookmarksMutationVariables>;
export const GenerateQuizDocument = gql`
    mutation GenerateQuiz($numMcQuestions: Int!, $numTfQuestions: Int!, $subject: String!) {
  generateQuiz(
    numMCQuestions: $numMcQuestions
    numTFQuestions: $numTfQuestions
    subject: $subject
  )
}
    `;
export type GenerateQuizMutationFn = Apollo.MutationFunction<GenerateQuizMutation, GenerateQuizMutationVariables>;

/**
 * __useGenerateQuizMutation__
 *
 * To run a mutation, you first call `useGenerateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateQuizMutation, { data, loading, error }] = useGenerateQuizMutation({
 *   variables: {
 *      numMcQuestions: // value for 'numMcQuestions'
 *      numTfQuestions: // value for 'numTfQuestions'
 *      subject: // value for 'subject'
 *   },
 * });
 */
export function useGenerateQuizMutation(baseOptions?: Apollo.MutationHookOptions<GenerateQuizMutation, GenerateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateQuizMutation, GenerateQuizMutationVariables>(GenerateQuizDocument, options);
      }
export type GenerateQuizMutationHookResult = ReturnType<typeof useGenerateQuizMutation>;
export type GenerateQuizMutationResult = Apollo.MutationResult<GenerateQuizMutation>;
export type GenerateQuizMutationOptions = Apollo.BaseMutationOptions<GenerateQuizMutation, GenerateQuizMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($input: LogInInput) {
  logIn(input: $input) {
    id
    token
    avatar
    contact
    paymentId
    didRequest
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut {
    id
    token
    avatar
    contact
    didRequest
  }
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const UpdatePlanDocument = gql`
    mutation UpdatePlan($input: LessonPlanInput, $id: ID) {
  updatePlan(input: $input, id: $id) {
    id
  }
}
    `;
export type UpdatePlanMutationFn = Apollo.MutationFunction<UpdatePlanMutation, UpdatePlanMutationVariables>;

/**
 * __useUpdatePlanMutation__
 *
 * To run a mutation, you first call `useUpdatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanMutation, { data, loading, error }] = useUpdatePlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdatePlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlanMutation, UpdatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlanMutation, UpdatePlanMutationVariables>(UpdatePlanDocument, options);
      }
export type UpdatePlanMutationHookResult = ReturnType<typeof useUpdatePlanMutation>;
export type UpdatePlanMutationResult = Apollo.MutationResult<UpdatePlanMutation>;
export type UpdatePlanMutationOptions = Apollo.BaseMutationOptions<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const ArticleDocument = gql`
    query Article($id: ID!) {
  article(id: $id) {
    id
    title
    creator
    content {
      blocks {
        key
        text
        type
        depth
        inlineStyleRanges {
          style
          offset
          length
        }
        entityRanges {
          offset
          length
          key
        }
      }
      entityMap {
        type
        mutability
        data {
          src
          width
          alignment
          height
          url
          targetOption
        }
      }
    }
    pdf
    public
  }
}
    `;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArticleQuery(baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
      }
export function useArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = Apollo.QueryResult<ArticleQuery, ArticleQueryVariables>;
export const AllArticlesDocument = gql`
    query AllArticles($limit: Int!, $page: Int!) {
  allarticles(limit: $limit, page: $page) {
    total
    result {
      id
      title
      creator
      content {
        blocks {
          key
          text
          type
          depth
          inlineStyleRanges {
            style
            offset
            length
          }
          entityRanges {
            offset
            length
            key
          }
        }
        entityMap {
          type
          mutability
          data {
            src
            width
            alignment
            height
            targetOption
          }
        }
      }
      pdf
      public
    }
  }
}
    `;

/**
 * __useAllArticlesQuery__
 *
 * To run a query within a React component, call `useAllArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllArticlesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllArticlesQuery(baseOptions: Apollo.QueryHookOptions<AllArticlesQuery, AllArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllArticlesQuery, AllArticlesQueryVariables>(AllArticlesDocument, options);
      }
export function useAllArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllArticlesQuery, AllArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllArticlesQuery, AllArticlesQueryVariables>(AllArticlesDocument, options);
        }
export type AllArticlesQueryHookResult = ReturnType<typeof useAllArticlesQuery>;
export type AllArticlesLazyQueryHookResult = ReturnType<typeof useAllArticlesLazyQuery>;
export type AllArticlesQueryResult = Apollo.QueryResult<AllArticlesQuery, AllArticlesQueryVariables>;
export const AuthUrlDocument = gql`
    query AuthUrl {
  authUrl
}
    `;

/**
 * __useAuthUrlQuery__
 *
 * To run a query within a React component, call `useAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthUrlQuery(baseOptions?: Apollo.QueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
      }
export function useAuthUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
        }
export type AuthUrlQueryHookResult = ReturnType<typeof useAuthUrlQuery>;
export type AuthUrlLazyQueryHookResult = ReturnType<typeof useAuthUrlLazyQuery>;
export type AuthUrlQueryResult = Apollo.QueryResult<AuthUrlQuery, AuthUrlQueryVariables>;
export const LessonDocument = gql`
    query Lesson($id: ID!) {
  lesson(id: $id) {
    id
    category
    title
    meta
    video
    image
    startDate
    endDate
    creator
    public
    duration
    script
  }
}
    `;

/**
 * __useLessonQuery__
 *
 * To run a query within a React component, call `useLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLessonQuery(baseOptions: Apollo.QueryHookOptions<LessonQuery, LessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LessonQuery, LessonQueryVariables>(LessonDocument, options);
      }
export function useLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LessonQuery, LessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LessonQuery, LessonQueryVariables>(LessonDocument, options);
        }
export type LessonQueryHookResult = ReturnType<typeof useLessonQuery>;
export type LessonLazyQueryHookResult = ReturnType<typeof useLessonLazyQuery>;
export type LessonQueryResult = Apollo.QueryResult<LessonQuery, LessonQueryVariables>;
export const LessonTitleDocument = gql`
    query LessonTitle($title: String!) {
  lessonTitle(title: $title) {
    id
    category
    title
    meta
    video
    image
    startDate
    endDate
    creator
    public
    duration
    script
  }
}
    `;

/**
 * __useLessonTitleQuery__
 *
 * To run a query within a React component, call `useLessonTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useLessonTitleQuery(baseOptions: Apollo.QueryHookOptions<LessonTitleQuery, LessonTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LessonTitleQuery, LessonTitleQueryVariables>(LessonTitleDocument, options);
      }
export function useLessonTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LessonTitleQuery, LessonTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LessonTitleQuery, LessonTitleQueryVariables>(LessonTitleDocument, options);
        }
export type LessonTitleQueryHookResult = ReturnType<typeof useLessonTitleQuery>;
export type LessonTitleLazyQueryHookResult = ReturnType<typeof useLessonTitleLazyQuery>;
export type LessonTitleQueryResult = Apollo.QueryResult<LessonTitleQuery, LessonTitleQueryVariables>;
export const AllLessonsDocument = gql`
    query AllLessons($limit: Int!, $page: Int!) {
  allLessons(limit: $limit, page: $page) {
    total
    result {
      id
      category
      title
      meta
      video
      image
      startDate
      endDate
      creator
      public
      duration
      script
    }
  }
}
    `;

/**
 * __useAllLessonsQuery__
 *
 * To run a query within a React component, call `useAllLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllLessonsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllLessonsQuery(baseOptions: Apollo.QueryHookOptions<AllLessonsQuery, AllLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllLessonsQuery, AllLessonsQueryVariables>(AllLessonsDocument, options);
      }
export function useAllLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllLessonsQuery, AllLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllLessonsQuery, AllLessonsQueryVariables>(AllLessonsDocument, options);
        }
export type AllLessonsQueryHookResult = ReturnType<typeof useAllLessonsQuery>;
export type AllLessonsLazyQueryHookResult = ReturnType<typeof useAllLessonsLazyQuery>;
export type AllLessonsQueryResult = Apollo.QueryResult<AllLessonsQuery, AllLessonsQueryVariables>;
export const PlanDocument = gql`
    query Plan($title: String!) {
  plan(title: $title) {
    id
    name
    creator
    public
    premium
    level
    category
    plan {
      ... on Lesson {
        id
        category
        title
        meta
        video
        image
        startDate
        endDate
        creator
        public
        duration
        script
      }
      ... on Quiz {
        id
        title
        questions {
          question
          answerOptions {
            answerText
            isCorrect
          }
          answerType
        }
        creator
      }
      ... on Article {
        id
        title
        creator
        content {
          blocks {
            key
            text
            type
            depth
            inlineStyleRanges {
              style
              offset
              length
            }
            entityRanges {
              offset
              length
              key
            }
          }
          entityMap {
            type
            mutability
            data {
              src
              width
              alignment
              height
              url
              targetOption
            }
          }
        }
        pdf
        public
      }
    }
  }
}
    `;

/**
 * __usePlanQuery__
 *
 * To run a query within a React component, call `usePlanQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function usePlanQuery(baseOptions: Apollo.QueryHookOptions<PlanQuery, PlanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlanQuery, PlanQueryVariables>(PlanDocument, options);
      }
export function usePlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlanQuery, PlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlanQuery, PlanQueryVariables>(PlanDocument, options);
        }
export type PlanQueryHookResult = ReturnType<typeof usePlanQuery>;
export type PlanLazyQueryHookResult = ReturnType<typeof usePlanLazyQuery>;
export type PlanQueryResult = Apollo.QueryResult<PlanQuery, PlanQueryVariables>;
export const PlaylistDocument = gql`
    query Playlist($id: ID!) {
  playlist(id: $id) {
    id
    name
    creator
    public
    premium
    level
    category
    plan {
      ... on Lesson {
        id
        category
        title
        meta
        video
        image
        startDate
        endDate
        creator
        public
        duration
        script
      }
      ... on Quiz {
        id
        title
        questions {
          question
          answerOptions {
            answerText
            isCorrect
          }
          answerType
        }
        creator
      }
      ... on Article {
        id
        title
        creator
        content {
          blocks {
            key
            text
            type
            depth
            inlineStyleRanges {
              style
              offset
              length
            }
            entityRanges {
              offset
              length
              key
            }
          }
          entityMap {
            type
            mutability
            data {
              src
              width
              alignment
              height
              url
              targetOption
            }
          }
        }
        pdf
        public
      }
    }
  }
}
    `;

/**
 * __usePlaylistQuery__
 *
 * To run a query within a React component, call `usePlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlaylistQuery(baseOptions: Apollo.QueryHookOptions<PlaylistQuery, PlaylistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistQuery, PlaylistQueryVariables>(PlaylistDocument, options);
      }
export function usePlaylistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistQuery, PlaylistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistQuery, PlaylistQueryVariables>(PlaylistDocument, options);
        }
export type PlaylistQueryHookResult = ReturnType<typeof usePlaylistQuery>;
export type PlaylistLazyQueryHookResult = ReturnType<typeof usePlaylistLazyQuery>;
export type PlaylistQueryResult = Apollo.QueryResult<PlaylistQuery, PlaylistQueryVariables>;
export const AllPlaylistsDocument = gql`
    query AllPlaylists($limit: Int!, $page: Int!) {
  allplaylists(limit: $limit, page: $page) {
    total
    result {
      id
      name
      creator
      public
      premium
      level
      category
      plan {
        ... on Lesson {
          id
          category
          title
          meta
          video
          image
          startDate
          endDate
          creator
          public
          duration
          script
        }
        ... on Quiz {
          id
          title
          questions {
            question
            answerOptions {
              answerText
              isCorrect
            }
            answerType
          }
          creator
        }
        ... on Article {
          id
          title
          creator
          content {
            blocks {
              key
              text
              type
              depth
              inlineStyleRanges {
                style
                offset
                length
              }
              entityRanges {
                offset
                length
                key
              }
            }
            entityMap {
              type
              mutability
              data {
                src
                width
                alignment
                height
                url
                targetOption
              }
            }
          }
          pdf
          public
        }
      }
    }
  }
}
    `;

/**
 * __useAllPlaylistsQuery__
 *
 * To run a query within a React component, call `useAllPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPlaylistsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllPlaylistsQuery(baseOptions: Apollo.QueryHookOptions<AllPlaylistsQuery, AllPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPlaylistsQuery, AllPlaylistsQueryVariables>(AllPlaylistsDocument, options);
      }
export function useAllPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPlaylistsQuery, AllPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPlaylistsQuery, AllPlaylistsQueryVariables>(AllPlaylistsDocument, options);
        }
export type AllPlaylistsQueryHookResult = ReturnType<typeof useAllPlaylistsQuery>;
export type AllPlaylistsLazyQueryHookResult = ReturnType<typeof useAllPlaylistsLazyQuery>;
export type AllPlaylistsQueryResult = Apollo.QueryResult<AllPlaylistsQuery, AllPlaylistsQueryVariables>;
export const QuizDocument = gql`
    query Quiz($id: ID!) {
  quiz(id: $id) {
    id
    title
    questions {
      question
      answerOptions {
        answerText
        isCorrect
      }
      answerType
    }
    creator
    public
  }
}
    `;

/**
 * __useQuizQuery__
 *
 * To run a query within a React component, call `useQuizQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuizQuery(baseOptions: Apollo.QueryHookOptions<QuizQuery, QuizQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuizQuery, QuizQueryVariables>(QuizDocument, options);
      }
export function useQuizLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuizQuery, QuizQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuizQuery, QuizQueryVariables>(QuizDocument, options);
        }
export type QuizQueryHookResult = ReturnType<typeof useQuizQuery>;
export type QuizLazyQueryHookResult = ReturnType<typeof useQuizLazyQuery>;
export type QuizQueryResult = Apollo.QueryResult<QuizQuery, QuizQueryVariables>;
export const AllQuizzesDocument = gql`
    query AllQuizzes($limit: Int!, $page: Int!) {
  allquizzes(limit: $limit, page: $page) {
    total
    result {
      id
      title
      questions {
        question
        answerOptions {
          answerText
          isCorrect
        }
        answerType
      }
      creator
      public
    }
  }
}
    `;

/**
 * __useAllQuizzesQuery__
 *
 * To run a query within a React component, call `useAllQuizzesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllQuizzesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllQuizzesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllQuizzesQuery(baseOptions: Apollo.QueryHookOptions<AllQuizzesQuery, AllQuizzesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllQuizzesQuery, AllQuizzesQueryVariables>(AllQuizzesDocument, options);
      }
export function useAllQuizzesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllQuizzesQuery, AllQuizzesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllQuizzesQuery, AllQuizzesQueryVariables>(AllQuizzesDocument, options);
        }
export type AllQuizzesQueryHookResult = ReturnType<typeof useAllQuizzesQuery>;
export type AllQuizzesLazyQueryHookResult = ReturnType<typeof useAllQuizzesLazyQuery>;
export type AllQuizzesQueryResult = Apollo.QueryResult<AllQuizzesQuery, AllQuizzesQueryVariables>;
export const RelatedPlansDocument = gql`
    query RelatedPlans($id: ID!) {
  relatedPlans(id: $id) {
    plan {
      ... on Article {
        title
        public
        pdf
        id
        creator
      }
      ... on Quiz {
        id
        title
        questions {
          question
          answerOptions {
            answerText
            isCorrect
          }
          answerType
        }
        creator
      }
      ... on Lesson {
        id
        category
        title
        meta
        video
        image
        startDate
        endDate
        creator
        public
        duration
        script
      }
    }
    name
    id
    creator
    public
    premium
    level
  }
}
    `;

/**
 * __useRelatedPlansQuery__
 *
 * To run a query within a React component, call `useRelatedPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useRelatedPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRelatedPlansQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRelatedPlansQuery(baseOptions: Apollo.QueryHookOptions<RelatedPlansQuery, RelatedPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RelatedPlansQuery, RelatedPlansQueryVariables>(RelatedPlansDocument, options);
      }
export function useRelatedPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RelatedPlansQuery, RelatedPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RelatedPlansQuery, RelatedPlansQueryVariables>(RelatedPlansDocument, options);
        }
export type RelatedPlansQueryHookResult = ReturnType<typeof useRelatedPlansQuery>;
export type RelatedPlansLazyQueryHookResult = ReturnType<typeof useRelatedPlansLazyQuery>;
export type RelatedPlansQueryResult = Apollo.QueryResult<RelatedPlansQuery, RelatedPlansQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!, $playlistsPage: Int!, $lessonsPage: Int!, $quizzesPage: Int!, $articlesPage: Int!, $limit: Int!) {
  user(id: $id) {
    id
    name
    avatar
    contact
    paymentId
    package {
      amount
      cadence
      status
      since
      trialEnd
    }
    bookmarks {
      id
      category
      title
      meta
      video
      image
      startDate
      endDate
      creator
    }
    playlists(limit: $limit, page: $playlistsPage) {
      total
      result {
        id
        name
        creator
        public
        premium
        level
        category
        plan {
          __typename
          ... on Article {
            id
            title
            creator
            content {
              blocks {
                key
                text
                type
                depth
                inlineStyleRanges {
                  style
                  offset
                  length
                }
                entityRanges {
                  offset
                  length
                  key
                }
              }
              entityMap {
                type
                mutability
                data {
                  src
                  width
                  alignment
                  height
                  url
                  targetOption
                }
              }
            }
            pdf
            public
          }
          ... on Lesson {
            id
            category
            title
            meta
            video
            image
            startDate
            endDate
            creator
            public
            duration
          }
          ... on Quiz {
            id
            title
            questions {
              question
              answerOptions {
                answerText
                isCorrect
              }
              answerType
            }
            creator
            public
          }
        }
      }
      totalCount
    }
    lessons(limit: $limit, page: $lessonsPage) {
      total
      result {
        id
        category
        title
        meta
        video
        startDate
        endDate
        creator
        public
        duration
        script
      }
      totalCount
    }
    quizzes(limit: $limit, page: $quizzesPage) {
      total
      result {
        id
        title
        questions {
          question
          answerOptions {
            answerText
            isCorrect
          }
          answerType
        }
        creator
        public
      }
      totalCount
    }
    articles(limit: $limit, page: $articlesPage) {
      total
      result {
        id
        title
        creator
        content {
          blocks {
            key
            text
            type
            depth
            inlineStyleRanges {
              style
              offset
              length
            }
            entityRanges {
              offset
              length
              key
            }
          }
          entityMap {
            type
            mutability
            data {
              src
              width
              alignment
              height
              url
              targetOption
            }
          }
        }
        pdf
        public
      }
      totalCount
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      playlistsPage: // value for 'playlistsPage'
 *      lessonsPage: // value for 'lessonsPage'
 *      quizzesPage: // value for 'quizzesPage'
 *      articlesPage: // value for 'articlesPage'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const AllUsersDocument = gql`
    query AllUsers($limit: Int!, $page: Int!) {
  allUsers(limit: $limit, page: $page) {
    totalCount
    result {
      contact
      paymentId
    }
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;