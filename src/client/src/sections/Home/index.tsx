import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { HomeInfo, CardGrid, TimelineEl, ProductValues, Footer, HomeDetails, CTA, ProductDetails } from '../../lib/components/'
import { Viewer, usePlaylistQuery } from '../../graphql/generated';
import { PlaylistCard } from '../../lib/components/';

type Props = {
  viewer: Viewer;
}

export const Home = ({ viewer }: Props) => {
  const { data, loading, error } = usePlaylistQuery({
    variables: {
      id: "6431d70477eff5c1a4787bb2"
    }
  })

  if (loading) {
    return (<>Loading...</>)
  }

  if (error) {
    return (<></>)
  }

  return (
    <Box>
      <HomeInfo />
      <HomeDetails />
      <ProductValues />
      <ProductDetails />
      {data && <PlaylistCard playlist={data?.playlist} />}
      <CTA />
      {/* <CardGrid /> */}
      {/* <TimelineEl /> */}
      <Footer viewer={viewer} />
    </Box>
  );
}