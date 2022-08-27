import React from 'react';
import { Typography, Grid, Link, Box } from '@mui/material'
import '../../assets/classroom.jpg';

import './homeinfo.scss';

export const HomeInfo = () => {
  return (
    <Box className='box--title'>
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            Interactive Lectures, Lesson Plans, and Learning. 
        </Typography>

        <Link variant="subtitle1" href="#">
            Start Teaching 
        </Link>
        <> | </>
        <Link variant="subtitle1" href="#">
            Start Learning 
        </Link>
    </Box>
  );
}