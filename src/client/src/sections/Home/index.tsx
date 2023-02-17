import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { HomeInfo, CardGrid, TimelineEl, ProductValues, Footer, HomeDetails } from '../../lib/components/'
import { Viewer } from '../../graphql/generated';

type Props = {
  viewer: Viewer;
}

export const Home = ({ viewer }: Props) => {

  return (
    <Box>
      <HomeInfo />
      <HomeDetails />
      <ProductValues />
      {/* <CardGrid /> */}
      {/* <TimelineEl /> */}
      <Footer viewer={viewer} />
    </Box>
  );
}