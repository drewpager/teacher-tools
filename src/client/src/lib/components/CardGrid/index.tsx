import React from 'react';
import { Grid } from '@mui/material';
import { useAllPlaylistsQuery } from '../../../graphql/generated';
import { LinearProgress, Box } from '@mui/material';
import { DisplayError } from '../../../lib/utils/alerts/displayError';
import { CardGridSkeleton } from '../CardGridSkeleton';

import { PlaylistDetails } from '../';

import './cardgrid.scss';

export const CardGrid = () => {

  const { data, loading, error } = useAllPlaylistsQuery({
    variables: {
      limit: 8,
      page: 1
    },
    pollInterval: 500
  });

  if (loading) {
    return (
      <>
        <LinearProgress />
        <CardGridSkeleton />
      </>
    )
  }

  if (error) {
    return (
      <DisplayError title="Failed to load playlists" />
    )
  }

  const playlists = data ? data.allplaylists : null;

  return (
    <Box className='grid--cards'>
        {playlists?.result.map((i, index) => (
          <PlaylistDetails {...i} key={index}/>
        ))}
    </Box>
  )
}