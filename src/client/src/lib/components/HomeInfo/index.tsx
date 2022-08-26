import React from 'react';
import { Typography, Grid, Link, Box } from '@mui/material'
import '../../assets/classroom.jpg';

export const HomeInfo = () => {
  return (
    <Box>
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              // position: 'relative',
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
    </Box>
  );
}