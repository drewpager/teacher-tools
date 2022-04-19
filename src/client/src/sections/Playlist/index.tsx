import React from 'react';
import { usePlaylistQuery } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';

export const Playlist = () => {
  const params = useParams()
  const { data, loading, error } = usePlaylistQuery({
    variables: {
      id: `${params.id}`
    }
  });

  if (loading) {
    return (
      <LinearProgress color='success'/>
    )
  }

  if (error) {
    return (
      <>
        <DisplayError title='Failed to load playlist' />
      </>
    )
  }

  const playlist = data ? data.playlist : null;
  
  return (
    <>
      <h1>Playlist: {playlist?.name}</h1>
      <h2>{playlist?.id}</h2>
    </>
  )
}