import React from 'react';
import { Box } from '@mui/material';
import { HomeInfo, CardGrid, Search, TimelineEl } from '../../lib/components/'

export const Home = () => {
  return (
    <Box>
        <HomeInfo />
        <Search />
        <CardGrid />
        <TimelineEl />
    </Box>
  );
}