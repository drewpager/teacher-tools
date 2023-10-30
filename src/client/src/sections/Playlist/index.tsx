import React from 'react';
import { usePlaylistQuery, Viewer } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { PlaylistCard, Search, Footer } from '../../lib/components/';
import { Helmet } from 'react-helmet';
import { PlaylistCardSkeleton } from '../../lib/components/PlaylistCard/playlistCardSkeleton';

interface Props {
  viewer?: Viewer;
}

export const Playlist = ({ viewer }: Props) => {
  const params = useParams();
  const { data, loading, error } = usePlaylistQuery({
    variables: {
      id: `${params.id}`
    }
  });

  if (loading) {
    return (
      <PlaylistCardSkeleton />
    )
  }

  if (error) {
    return (
      <Box sx={{ marginLeft: 5 }}>
        <h2>Playlist Not Found</h2>
        <h3>Here are a few available playlists or you can try searching again.</h3>
        <Search />
        <DisplayError title='Failed to load playlist' />
        <Footer viewer={viewer} />
      </Box>
    )
  }

  const playlist = data ? data.playlist : null;

  if (playlist) {
    return (
      <>
        <Helmet>
          <title>{`${playlist.name} Lesson Plan | Plato's Peach`}</title>
          <meta name="description" content={`Interactive lesson plan teaching ${playlist.name} including ${playlist.plan.length} educational items.`} />
        </Helmet>
        <PlaylistCard playlist={playlist} viewer={viewer} />
        <Footer viewer={viewer} />
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