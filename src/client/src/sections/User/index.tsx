import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { USER } from '../../lib/graphql/queries/User/';
import { User as UserData, UserVariables } from '../../lib/graphql/queries/User/__generated__/User';
import { UserProfile } from './components/';
import { DisplayError } from '../../lib/utils/alerts/displayError';

export const User = () => {
  const params = useParams()
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: `${params.id}`
    }
  });
  
  const user = data ? data.user : null;
  const UserProfileElement = user ? <UserProfile user={user} /> : null;

  if (loading) {
    return (
      <h2>Loading...</h2>
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