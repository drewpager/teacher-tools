import React from 'react';
import { Box, Grid } from '@mui/material';
import { Viewer, useAllPlaylistsQuery } from '../../graphql/generated';
import { PublicPlaylistCard } from '../../lib/components/PublicPlaylistCard';
import { Footer } from '../../lib/components';
import { PlaylistsSkeleton } from './playlistsSkeleton';

type Props = {
  viewer: Viewer
}

export const Playlists = ({ viewer }: Props) => {
  const { data, loading, error } = useAllPlaylistsQuery({
    variables: {
      limit: 1000,
      page: 1,
    }
  });

  if (loading) {
    return (<PlaylistsSkeleton />);
  }

  if (error) {
    return <Box sx={{ marginTop: 15 }}><div>Error: {error.message}</div></Box>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <Box sx={{ marginTop: 15 }}>
      <h2 style={{ marginLeft: "2rem" }}>Playlist Catalog</h2>
      <Box>
        <Grid container>
          {data.allplaylists.result.map((playlist) => (
            (playlist.public || playlist.public === null) && 
              <PublicPlaylistCard {...playlist} viewer={viewer} />
            ))}
        </Grid>
      </Box>
      <Footer viewer={viewer} />
    </Box>
  );
}