import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/react-hooks';
// import { USER } from '../../lib/graphql/queries/User/';
// import { User as UserData, UserVariables } from '../../lib/graphql/queries/User/__generated__/User';
// import { User as UserQuery, UserQueryVariables } from '../../../bin/graphql/generated';
import { useUserQuery } from '../../graphql/generated';
import { UserProfile, UserLessons, UserPlaylists } from './components/';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { Viewer } from '../../lib/types';
import { PageSkeleton } from '../../lib/components/';

interface Props {
  viewer: Viewer
}

export const User = ({ viewer }: Props) => {
  const [playlistsPage, setPlaylistsPage] = useState(1);
  const [lessonsPage, setLessonsPage] = useState(1);

  const PAGE_LIMIT = 4;

  const params = useParams();

  const { data, loading, error } = useUserQuery({
    variables: {
      id: `${params.id}`,
      playlistsPage,
      lessonsPage,
      limit: PAGE_LIMIT
    }
  });

  const user = data ? data.user : null;

  console.log("User: ", user);
  
  const viewerIsUser = viewer.id === params.id;
  const UserProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null;

  const userLessons = user ? user.lessons : null;
  const userPlaylists = user ? user.playlists : null;

  const userLessonsElement = userLessons ? (
    <UserLessons
      userLessons={userLessons}
      lessonsPage={lessonsPage}
      limit={PAGE_LIMIT}
      setLessonsPage={setLessonsPage}
    />
  ) : ( <h2>UserLessons Not Working</h2> );

  const userPlaylistsElement = userPlaylists ? (
    <UserPlaylists 
      userPlaylists={userPlaylists}
      playlistsPage={playlistsPage}
      limit={PAGE_LIMIT}
      setPlaylistsPage={setPlaylistsPage}
    />
  ) : ( <h2>UserPlaylists Not Working</h2> );

  if (loading) {
    return (
      <PageSkeleton />
    )
  }

  if (error) {
    return (
      <DisplayError title="Failed to find user profile" />
    )
  }

  return (
    <>
      {UserProfileElement}
      {userLessonsElement}
      {userPlaylistsElement}
    </>
  )
}