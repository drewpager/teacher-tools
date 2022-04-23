import React from 'react';
import { Paper, Typography, Grid, Link, Box } from '@mui/material'
import { Search } from '../Search';
import '../../assets/classroom.jpg';

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
        backgroundImage: 'classroom.jpg',
      }}
    >
      {<img style={{ display: 'none' }} src="classroom.jpg" alt="classroom with teacher interacting with students" />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          // backgroundColor: 'rgba(0,0,0,.3)',
          backgroundColor: 'primary'
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            Interactive Lectures, Lesson Plans, and Learning. 
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              
            </Typography>
            <Link variant="subtitle1" href="#">
              Start Teaching 
            </Link>
            <> | </>
            <Link variant="subtitle1" href="#">
              Start Learning 
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}