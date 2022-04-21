import React from 'react';
import { usePlaylistQuery } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress  } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { PlaylistCard } from '../../lib/components/PlaylistCard';

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

  console.log(playlist?.plan)

  return (
    <Box sx={{ margin: 5 }}>
      <h2>{playlist?.name}</h2>
      {playlist?.plan.map((lesson) => (
        <PlaylistCard {...lesson} />
      ))}
    </Box>
  )
}