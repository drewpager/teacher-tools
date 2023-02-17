import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { HomeInfo, CardGrid, TimelineEl, ProductValues, Footer } from '../../lib/components/'
import { Viewer } from '../../graphql/generated';

type Props = {
  viewer: Viewer;
}

export const Home = ({ viewer }: Props) => {

  return (
    <Box>
      <HomeInfo />
      <ProductValues />
      {/* <CardGrid /> */}
      <TimelineEl />
      <Footer viewer={viewer} />
    </Box>
  );
}