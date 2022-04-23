import React from 'react';
import { useAllPlaylistsQuery } from '../../graphql/generated';
import { LinearProgress, Box } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { HomeInfo, CardGrid, Search } from '../../lib/components/'

export const Home = () => {
  const { data, loading, error } = useAllPlaylistsQuery({
    variables: {
      limit: 10,
      page: 1
    }
  });

  if (loading) {
    return (
      <LinearProgress color='success'/>
    )
  }

  if (error) {
    return (
      <DisplayError title="Failed to load playlists" />
    )
  }

  const playlists = data ? data.allplaylists : null;

  return (
    <Box>
      <HomeInfo />
      <Search />
      <Box sx={{ marginLeft: 5 }}>
        <h2>{playlists?.total} Playlists</h2>
        <ul>
          {playlists?.result.map((i, index) => (
            <li key={index}>{i.name}</li>
          ))}
        </ul>
      </Box>
      <CardGrid />
    </Box>
  );
}