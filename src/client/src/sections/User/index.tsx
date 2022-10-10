import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserQuery, Viewer } from '../../graphql/generated';
import { UserProfile, UserLessons, UserPlaylists, UserQuizzes } from './components/';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { PageSkeleton } from '../../lib/components/';

interface Props {
  viewer: Viewer
}

export const User = ({ viewer }: Props) => {
  const [playlistsPage, setPlaylistsPage] = useState(1);
  const [lessonsPage, setLessonsPage] = useState(1);
  const [quizzesPage, setQuizzesPage] = useState(1);

  const pageLimit = 20;

  const params = useParams();

  const { data, loading, error } = useUserQuery({
    variables: {
      id: `${params.id}`,
      playlistsPage: playlistsPage,
      lessonsPage: lessonsPage,
      quizzesPage: quizzesPage,
      limit: pageLimit
    }
    // pollInterval: 500
  });

  const user = data ? data.user : null;
  
  const viewerIsUser = viewer.id === params.id;
  const UserProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null;

  const userLessons = user ? user.lessons : null;
  const userPlaylists = user ? user.playlists : null;
  const userQuizzes = user ? user.quizzes : null;

  const userLessonsElement = userLessons ? (
    <UserLessons
      userLessons={userLessons}
      lessonsPage={lessonsPage}
      limit={pageLimit}
      setLessonsPage={setLessonsPage}
    />
  ) : ( <h2>UserLessons Not Working</h2> );

  const userPlaylistsElement = userPlaylists ? (
    <UserPlaylists 
      userPlaylists={userPlaylists}
      playlistsPage={playlistsPage}
      limit={pageLimit}
      setPlaylistsPage={setPlaylistsPage}
    />
  ) : ( <h2>UserPlaylists Not Working</h2> );

  const userQuizzesElement = userQuizzes ? (
    <UserQuizzes
      userQuizzes={userQuizzes}
      quizzesPage={quizzesPage}
      limit={pageLimit}
      setQuizzesPage={setQuizzesPage}
    />
  ) : ( <h2>UserQuizzes Not Working</h2>);

  if (loading) {
    return (
      <PageSkeleton />
    )
  }

  if (error) {
    return (
      <>
        <DisplayError title="Failed to find user profile" />
        {console.log(error)}
      </>
    )
  }
  return (
    <>
      {UserProfileElement}
      {userLessonsElement}
      {userPlaylistsElement}
      {userQuizzesElement}
    </>
  )
}