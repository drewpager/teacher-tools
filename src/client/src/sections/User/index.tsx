import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useUserQuery, Viewer } from '../../graphql/generated';
import { UserProfile, UserLessons, UserPlaylists, UserQuizzes, UserBookmarks, UserArticles } from './components';
import { ImprovedUserProfile } from './components/UserProfile/improvedUserProfile';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { PageSkeleton } from '../../lib/components';
import { Footer } from '../../lib/components';

interface Props {
  viewer: Viewer
}

export const User = ({ viewer }: Props) => {
  const [playlistsPage, setPlaylistsPage] = useState(1);
  const [lessonsPage, setLessonsPage] = useState(1);
  const [quizzesPage, setQuizzesPage] = useState(1);
  const [bookmarksPage, setBookmarksPage] = useState(1);
  const [articlesPage, setArticlesPage] = useState(1);

  const pageLimit = 6;

  const params = useParams();

  const { data, loading, error } = useUserQuery({
    variables: {
      id: `${params.id}`,
      playlistsPage: playlistsPage,
      lessonsPage: lessonsPage,
      quizzesPage: quizzesPage,
      articlesPage: articlesPage,
      limit: pageLimit
    },
    pollInterval: 200
  })

  const user = data ? data.user : null;

  const viewerIsUser = viewer.id === params.id;
  const UserProfileElement = user ? <ImprovedUserProfile user={user} viewerIsUser={viewerIsUser} /> : null;

  const userLessons = user ? user.lessons : null;
  const userPlaylists = user ? user.playlists : null;
  const userQuizzes = user ? user.quizzes : null;
  const userBookmarks = user ? user.bookmarks : null;
  const userArticles = user ? user.articles : null;

  const userLessonsElement = useMemo(() => userLessons ? (
    <UserLessons
      userLessons={userLessons}
      lessonsPage={lessonsPage}
      limit={pageLimit}
      setLessonsPage={setLessonsPage}
    />
  ) : (<h2>UserLessons Not Working</h2>), [userLessons, lessonsPage]);

  const userPlaylistsElement = useMemo(() => userPlaylists ? (
    <UserPlaylists
      userPlaylists={userPlaylists}
      playlistsPage={playlistsPage}
      limit={pageLimit}
      setPlaylistsPage={setPlaylistsPage}
      viewer={viewer}
    />
  ) : (<h2>UserPlaylists Not Working</h2>), [userPlaylists, playlistsPage, viewer]);

  const userQuizzesElement = useMemo(() => userQuizzes ? (
    <UserQuizzes
      userQuizzes={userQuizzes}
      quizzesPage={quizzesPage}
      limit={pageLimit}
      setQuizzesPage={setQuizzesPage}
    />
  ) : (<h2>Failed to load quizzes</h2>), [userQuizzes, quizzesPage])

  const userArticlesElement = useMemo(() => userArticles ? (
    <UserArticles
      userArticles={userArticles}
      articlesPage={articlesPage}
      limit={pageLimit}
      setArticlesPage={setArticlesPage}
    />
  ) : (<h2>Failed to load articles</h2>), [userArticles, articlesPage])

  const userBookmarksElement = useMemo(() => userBookmarks ? (
    <UserBookmarks user={user} setBookmarksPage={setBookmarksPage} />
  ) : (<h2>Failed to load bookmarks</h2>), [userBookmarks, user])

  if (loading) {
    return (
      <PageSkeleton />
    )
  }

  if (error) {
    return (
      <>
        <DisplayError title="Failed to find user profile" />
      </>
    )
  }
  return (
    <>
      {UserProfileElement}
      {userPlaylistsElement}
      {userQuizzesElement}
      {userArticlesElement}
      {userBookmarksElement}
      {userLessonsElement}
      <Footer viewer={viewer} />
    </>
  )
}