import React from 'react';
import { usePlaylistQuery, Viewer, Playlist, usePlanQuery } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress, Grid, Typography } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { PlaylistCard, Search, Footer, CTA, InlineCTA, DonateCard } from '../../lib/components/';
import { Helmet } from 'react-helmet';
import { PlaylistCardSkeleton } from '../../lib/components/PlaylistCard/playlistCardSkeleton';
import { titleCase } from '../../lib/utils';
import './plans.scss';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
  // playlist?: Playlist;
}

export const Plans = ({ viewer, setViewer }: Props) => {
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
        {playlistData.public ? (
          <Grid container sx={{ margin: 0 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <InlineCTA />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant="h2" className="planDonate-text">Consider Supporting Content Like This With a Donation</Typography>
              <Typography variant="body1" className="planDonate-subtext">Donations to Plato’s Peach non-profit help us in our mission to support teachers and students globally with high-quality educational content and tools that fit their needs. We have an ambitious roadmap for both our growing catalog of free content as well as our suite of tools to leverage that content within the learning journey. Your donations will help make this work possible.</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <DonateCard viewer={viewer} setViewer={setViewer} />
            </Grid>
          </Grid>
        ) : <></>}
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