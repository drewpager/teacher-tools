import React from 'react';
import { usePlaylistQuery } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress  } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { PlaylistCard, Search } from '../../lib/components/';

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
      <Box sx={{ marginLeft: 5 }}>
        <h2>Playist Not Found</h2>
        <h4>Here are a few available playlists or you can try searching again.</h4>
        <Search />
        <DisplayError title='Failed to load playlist' />
      </Box>
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