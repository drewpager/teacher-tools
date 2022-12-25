import React from 'react';
import { Typography, Grid, Link, Box, Paper } from '@mui/material'
import classroom from '../../assets/classroom.jpg';

import './homeinfo.scss';

export const HomeInfo = () => {
  return (
    <Paper
    sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${classroom})`,
      }}
    >
      <Box className='box--title'>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom className='title--text'>
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