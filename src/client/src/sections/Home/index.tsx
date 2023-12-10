import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  HomeInfo,
  CardGrid,
  ProductValues,
  Footer,
  CTA,
  ProductDetails,
  HomeDetailsSkeleton,
  HomeInfoSkeleton,
} from '../../lib/components/'
import { Viewer, usePlaylistQuery } from '../../graphql/generated';
import { PlaylistCard } from '../../lib/components/';
import { Helmet } from 'react-helmet';

type Props = {
  viewer: Viewer;
}

export const Home = ({ viewer }: Props) => {
  const { data, loading, error } = usePlaylistQuery({
    variables: {
      id: "6554ef5092b184e4026e546a" // Boston Tea Party
    }
  })

  if (loading) {
    return (
      <Box sx={{ marginTop: 15 }}>
        <HomeInfoSkeleton />
        <HomeDetailsSkeleton />
      </Box>
    )
  }

  if (error) {
    return (<></>)
  }

  return (
    <Box>
      <Helmet>
        <title>Interactive Lesson Plans and Short History Documentaries</title>
        <meta name="description" content="Short History Documentaries and Tools for Teachers to Leverage Trusted Content and Engage Students While Adhering to Widely Accepted Curriculum Standards." />
      </Helmet>
      <HomeInfo />
      <ProductDetails />
      <ProductValues />
      {data && <PlaylistCard playlist={data?.playlist} />}
      <CTA />
      {/* <CardGrid /> */}
      {/* <TimelineEl /> */}
      <Footer viewer={viewer} />
    </Box>
  );
}