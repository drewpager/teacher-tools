import React from 'react';
import { usePlaylistQuery, Viewer, Playlist, usePlanQuery } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { PlaylistCard, Search, Footer, CTA, InlineCTA } from '../../lib/components/';
import { Helmet } from 'react-helmet';
import { PlaylistCardSkeleton } from '../../lib/components/PlaylistCard/playlistCardSkeleton';
import { titleCase } from '../../lib/utils';

interface Props {
  viewer?: Viewer;
  // playlist?: Playlist;
}

export const Plans = ({ viewer }: Props) => {
  const params = useParams();
  const title = titleCase(`${params.plan}`.replace(/-/g, " "));
  // console.log(`${params}`.trim().replace(/-/g, " "))


  const { data, loading, error } = usePlanQuery({
    variables: {
      title: title
    }
  });

  if (loading) {
    return (
      <PlaylistCardSkeleton />
    )
  }

  if (error) {
    return (
      <Box>
        <h2>Playlist Not Found</h2>
        <h3>Here are a few available playlists or you can try searching again.</h3>
        <Search />
        <DisplayError title='Failed to load playlist' />
        <Footer viewer={viewer} />
      </Box>
    )
  }

  const playlistData = data ? data.plan : null;
  let metaDescription = playlistData?.plan.map((item) => item?.title).join(' · ');
  metaDescription = metaDescription && metaDescription.length > 160 ? metaDescription.slice(0, 157).padEnd(3, " · ") : metaDescription;

  if (playlistData) {
    return (
      <>
        <Helmet>
          <title>{`${playlistData.name} Lesson Plan | Plato's Peach`}</title>
          <meta name="description" content={`${metaDescription}`} />
          {!playlistData.public && (<meta name="robots" content="noindex" />)}
        </Helmet>
        <PlaylistCard playlist={playlistData} viewer={viewer} />
        {playlistData.public ? <InlineCTA /> : <></>}
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