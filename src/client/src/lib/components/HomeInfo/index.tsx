import React from 'react';
import { Typography, Grid, Link, Box, Paper } from '@mui/material'
import classroom from '../../assets/classroom.jpg';

import './homeinfo.scss';

export const HomeInfo = () => {
  return (
    <Paper
      className='title--image'
      sx={{backgroundImage: `url(${classroom})` }}
    >
      <Box className='box--title'>
          <Typography variant='h1' className='title--text'>
              Interactive Lectures, Lesson Plans, and Learning. 
          </Typography>

          <Link variant="subtitle1" href="#" className='link--start'>
              Start Teaching 
          </Link>
          <Link variant="subtitle1" href="#" className='link--start'>
              Start Learning 
          </Link>
      </Box>
    </Paper>
  );
}