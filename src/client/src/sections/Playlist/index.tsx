import React from 'react';
import { usePlaylistQuery, Viewer } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { PlaylistCard, Search, Footer, CTA, InlineCTA } from '../../lib/components/';
import { Helmet } from 'react-helmet';
import { PlaylistCardSkeleton } from '../../lib/components/PlaylistCard/playlistCardSkeleton';
import { formatSlug } from '../../lib/utils/formatSlug';
import { PublicPlaylistCard } from '../../lib/components/PublicPlaylistCard';
import { Link } from 'react-router-dom';

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
      <Box sx={{ marginTop: 15 }}>
        <Box sx={{ marginLeft: 5 }}>
          <h2>Lesson Plan Not Found</h2>
          <h3>Check out the <Link to="/plans">Lesson Plan Catalog</Link> for all available plans.</h3>
        </Box>
        <DisplayError title='Failed to load playlist' />
        <Footer viewer={viewer} />
      </Box>
    )
  }

  const playlist = data ? data.playlist : null;
  let metaDescription = playlist?.plan.map((item) => item?.title).join(' · ');
  metaDescription = metaDescription && metaDescription.length > 160 ? metaDescription.slice(0, 157).padEnd(3, " · ") : metaDescription;

  if (playlist) {
    return (
      <>
        <Helmet>
          <title>{`${playlist.name} Lesson Plan | Plato's Peach`}</title>
          <meta name="description" content={`${metaDescription}`} />
          <link rel="canonical" href={`https://www.platospeach.com/plans/${formatSlug(playlist.name)}`} />
          {!playlist.public && (<meta name="robots" content="noindex" />)}
        </Helmet>
        <PlaylistCard playlist={playlist} viewer={viewer} />
        {playlist.public ? <InlineCTA /> : <></>}
        <Footer viewer={viewer} />
      </>
    )
  }

  return (
    <Box>
      <h2>No Playlist By This ID</h2>
      <DisplayError title='No Playlist By This ID' />
      <Footer />
    </Box>
  )
}