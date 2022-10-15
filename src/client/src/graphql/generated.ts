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
  _FieldSet: any;
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
};

export enum AnswerFormat {
  Multiplechoice = 'MULTIPLECHOICE',
  Truefalse = 'TRUEFALSE'
}

export type AnswerOptions = {
  __typename?: 'AnswerOptions';
  answerText?: Maybe<Scalars['String']>;
  isCorrect?: Maybe<Scalars['Boolean']>;
};

export type Answers = {
  answerText: Scalars['String'];
  isCorrect: Scalars['Boolean'];
};

export type CreateLessonInput = {
  category: Array<Scalars['String']>;
  endDate: Scalars['DateScalar'];
  id: Scalars['ID'];
  image: Scalars['String'];
  meta: Scalars['String'];
  startDate: Scalars['DateScalar'];
  title: Scalars['String'];
  video: Scalars['String'];
};

export type FullLessonInput = {
  category?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  creator?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateScalar']>;
  id?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateScalar']>;
  title?: InputMaybe<Scalars['String']>;
  video?: InputMaybe<Scalars['String']>;
};

export type FullLessonQuiz = {
  creator?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  questions: Array<QuizQuestions>;
  title?: InputMaybe<Scalars['String']>;
};

export type FullPlanInput = {
  lessons: FullLessonInput;
  quizzes?: InputMaybe<FullLessonQuiz>;
};

export type Lesson = {
  __typename?: 'Lesson';
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
  creator?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateScalar']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  meta?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateScalar']>;
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

export type LessonPlanInput = {
  creator: Scalars['String'];
  name: Scalars['String'];
  plan: Array<InputMaybe<FullPlanInput>>;
};

export type LessonPlanUnion = Lesson | Quiz;

export type Lessons = {
  __typename?: 'Lessons';
  result: Array<Lesson>;
  total: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type LogInInput = {
  code: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLesson: Lesson;
  deleteLesson: Scalars['Boolean'];
  deletePlaylist: Scalars['Boolean'];
  lessonPlan: Playlist;
  logIn: Viewer;
  logOut: Viewer;
  updatePlan: Playlist;
};


export type MutationCreateLessonArgs = {
  input?: InputMaybe<CreateLessonInput>;
};


export type MutationDeleteLessonArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeletePlaylistArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationLessonPlanArgs = {
  input?: InputMaybe<LessonPlanInput>;
};


export type MutationLogInArgs = {
  input?: InputMaybe<LogInInput>;
};


export type MutationUpdatePlanArgs = {
  input?: InputMaybe<LessonPlanInput>;
};

export type Playlist = {
  __typename?: 'Playlist';
  authorized?: Maybe<Scalars['Boolean']>;
  creator: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  plan?: Maybe<Array<Maybe<LessonPlanUnion>>>;
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
  allplaylists: Playlists;
  allquizzes: Quizzes;
  authUrl: Scalars['String'];
  lesson: Lesson;
  playlist: Playlist;
  quiz: Quiz;
  user: User;
};


export type QueryAllLessonsArgs = {
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


export type QueryLessonArgs = {
  id: Scalars['ID'];
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryQuizArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Questions = {
  __typename?: 'Questions';
  answerOptions?: Maybe<Array<Maybe<AnswerOptions>>>;
  answerType: AnswerFormat;
  question?: Maybe<Scalars['String']>;
};

export type Quiz = {
  __typename?: 'Quiz';
  creator?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  questions: Array<Questions>;
  title?: Maybe<Scalars['String']>;
};

export type QuizQuestions = {
  answerOptions?: InputMaybe<Array<Answers>>;
  answerType: AnswerFormat;
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
  avatar: Scalars['String'];
  contact: Scalars['String'];
  hasPayment: Scalars['Boolean'];
  id: Scalars['ID'];
  lessons?: Maybe<Lessons>;
  name: Scalars['String'];
  playlists?: Maybe<Playlists>;
  quizzes?: Maybe<Quizzes>;
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

export type Viewer = {
  __typename?: 'Viewer';
  avatar?: Maybe<Scalars['String']>;
  didRequest: Scalars['Boolean'];
  hasPayment?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  playlists?: Maybe<Array<Maybe<Playlist>>>;
  quizzes?: Maybe<Array<Maybe<Quiz>>>;
  token?: Maybe<Scalars['String']>;
};

export type CreateLessonMutationVariables = Exact<{
  input: CreateLessonInput;
}>;


export type CreateLessonMutation = { __typename?: 'Mutation', createLesson: { __typename?: 'Lesson', id?: string | null } };

export type LessonPlanMutationVariables = Exact<{
  input: LessonPlanInput;
}>;


export type LessonPlanMutation = { __typename?: 'Mutation', lessonPlan: { __typename?: 'Playlist', id?: string | null } };

export type LogInMutationVariables = Exact<{
  input?: InputMaybe<LogInInput>;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasPayment?: boolean | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasPayment?: boolean | null, didRequest: boolean } };

export type UpdatePlanMutationVariables = Exact<{
  input: LessonPlanInput;
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Playlist', id?: string | null, name: string, creator: string, authorized?: boolean | null, plan?: Array<{ __typename: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null } | { __typename: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType: AnswerFormat, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } | null> | null } };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };

export type LessonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LessonQuery = { __typename?: 'Query', lesson: { __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null } };

export type AllLessonsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllLessonsQuery = { __typename?: 'Query', allLessons: { __typename?: 'Lessons', total: number, result: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null }> } };

export type PlaylistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', id?: string | null, name: string, creator: string, plan?: Array<{ __typename: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null } | { __typename: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType: AnswerFormat, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } | null> | null } };

export type AllPlaylistsQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllPlaylistsQuery = { __typename?: 'Query', allplaylists: { __typename?: 'Playlists', total: number, result: Array<{ __typename?: 'Playlist', id?: string | null, name: string, creator: string, plan?: Array<{ __typename: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null } | { __typename: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType: AnswerFormat, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } | null> | null }> } };

export type QuizQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type QuizQuery = { __typename?: 'Query', quiz: { __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType: AnswerFormat, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } };

export type AllQuizzesQueryVariables = Exact<{
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type AllQuizzesQuery = { __typename?: 'Query', allquizzes: { __typename?: 'Quizzes', total: number, result: Array<{ __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType: AnswerFormat, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
  playlistsPage: Scalars['Int'];
  lessonsPage: Scalars['Int'];
  quizzesPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, contact: string, hasPayment: boolean, playlists?: { __typename?: 'Playlists', total: number, totalCount: number, result: Array<{ __typename?: 'Playlist', id?: string | null, name: string, creator: string, plan?: Array<{ __typename: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, image?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null } | { __typename: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType: AnswerFormat, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> } | null> | null }> } | null, lessons?: { __typename?: 'Lessons', total: number, totalCount: number, result: Array<{ __typename?: 'Lesson', id?: string | null, category?: Array<string | null> | null, title?: string | null, meta?: string | null, video?: string | null, startDate?: any | null, endDate?: any | null, creator?: string | null }> } | null, quizzes?: { __typename?: 'Quizzes', total: number, totalCount: number, result: Array<{ __typename?: 'Quiz', id?: string | null, title?: string | null, creator?: string | null, questions: Array<{ __typename?: 'Questions', question?: string | null, answerType: AnswerFormat, answerOptions?: Array<{ __typename?: 'AnswerOptions', answerText?: string | null, isCorrect?: boolean | null } | null> | null }> }> } | null } };


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
    mutation LessonPlan($input: LessonPlanInput!) {
  lessonPlan(input: $input) {
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
export const LogInDocument = gql`
    mutation LogIn($input: LogInInput) {
  logIn(input: $input) {
    id
    token
    avatar
    hasPayment
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
    hasPayment
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
    mutation UpdatePlan($input: LessonPlanInput!) {
  updatePlan(input: $input) {
    id
    name
    plan {
      __typename
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
    }
    creator
    authorized
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
export const PlaylistDocument = gql`
    query Playlist($id: ID!) {
  playlist(id: $id) {
    id
    name
    creator
    plan {
      __typename
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
      plan {
        __typename
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
export const UserDocument = gql`
    query User($id: ID!, $playlistsPage: Int!, $lessonsPage: Int!, $quizzesPage: Int!, $limit: Int!) {
  user(id: $id) {
    id
    name
    avatar
    contact
    hasPayment
    playlists(limit: $limit, page: $playlistsPage) {
      total
      result {
        id
        name
        creator
        plan {
          __typename
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