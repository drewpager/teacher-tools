import React from 'react';
import { Box } from '@mui/material';
import { Viewer, useAllPlaylistsQuery } from '../../graphql/generated';
import { PublicPlaylistCard } from '../../lib/components/PublicPlaylistCard';
import { Footer } from '../../lib/components';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <Box sx={{ marginTop: 15 }}><div>Error: {error.message}</div></Box>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <Box sx={{ marginTop: 15 }}>
      <h2>Playlist Catalog</h2>
      <Box>
        {data.allplaylists.result.map((playlist) => (
          // <li key={playlist.id}>
          //   <a href={`/playlist/${playlist.id}`}>{playlist.name}</a>
          // </li>
          (playlist.public || playlist.public === null) && <PublicPlaylistCard {...playlist} viewer={viewer} />
        ))}
      </Box>
      <Footer viewer={viewer} />
    </Box>
  );
}