import React from 'react';
import { usePlaylistQuery, Viewer } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { PlaylistCard, Search, Footer } from '../../lib/components/';

export const Playlist = () => {
  const params = useParams();
  console.log(params)
  const { data, loading, error } = usePlaylistQuery({
    variables: {
      id: `${params.id}`
    }
  });

  if (loading) {
    return (
      <LinearProgress />
    )
  }

  if (error) {
    return (
      <Box sx={{ marginLeft: 5 }}>
        <h2>Playlist Not Found</h2>
        <h4>Here are a few available playlists or you can try searching again.</h4>
        <Search />
        <DisplayError title='Failed to load playlist' />
        <Footer />
      </Box>
    )
  }

  const playlist = data ? data.playlist : null;

  if (playlist) {
    return (
      <>
        <PlaylistCard playlist={playlist} />
        <Footer />
      </>
    )
  }

  return (
    <Box sx={{ marginLeft: 5 }}>
      <h2>No Playlist By This ID</h2>
      <DisplayError title='No Playlist By This ID' />
      <Footer />
    </Box>
  )
}