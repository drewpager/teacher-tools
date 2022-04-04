import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { USER } from '../../lib/graphql/queries/User/';
import { User as UserData, UserVariables } from '../../lib/graphql/queries/User/__generated__/User';
import { UserProfile } from './components/';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { Viewer } from '../../lib/types';
import { PageSkeleton } from '../../lib/components/';

interface Props {
  viewer: Viewer
}

export const User = ({ viewer }: Props) => {
  const params = useParams()
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: `${params.id}`
    }
  });

  const viewerIsUser = viewer.id === params.id;

  const user = data ? data.user : null;
  const UserProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null;

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
    <div>
      {UserProfileElement}
    </div>
  )
}