import React from 'react';
import { Box } from '@mui/material';
import { HomeInfo, CardGrid, Search, TimelineEl, Footer } from '../../lib/components/'
import { Viewer } from '../../graphql/generated';

type Props = {
  viewer: Viewer;
}

export const Home = ({ viewer }: Props) => {
  return (
    <Box>
        <HomeInfo />
        {/* <Search /> */}
        <CardGrid />
        <TimelineEl />
        <Footer viewer={viewer} />
    </Box>
  );
}