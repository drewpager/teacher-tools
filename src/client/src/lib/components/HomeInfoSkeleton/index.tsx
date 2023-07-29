import React from 'react';
import { Grid, Box, Skeleton, Container } from '@mui/material';
import './homeinfo-skeleton.scss';

export const HomeInfoSkeleton = () => {
  return (
    <Box className="skeleton--box">
      <Grid container className='skel-grid--container'>
        <Grid item xs={12} sm={12} md={7} lg={6}>
          <Box className='box--title'>
            <Skeleton variant="text" width="70%" height="60px" />
            <Skeleton variant="text" width="70%" height="60px" />
            <Skeleton variant="text" width="70%" height="60px" />
            <br />
            <Skeleton variant="text" width="70%" height="30px" />
            <Skeleton variant="text" width="70%" height="30px" />
            <Skeleton variant="text" width="70%" height="30px" />
            <Skeleton variant="text" width="70%" height="30px" />
            <div className="skel-grid--buttons">
              <Skeleton variant="rounded" width="34%" height="70px" className='skel-button1' />
              <Skeleton variant="rounded" width="34%" height="70px" className='skel-button2' />
            </div>
          </Box>
        </Grid>
        <Grid item xs={0} sm={0} md={5} lg={6}>
          <Box className="skel-animation--box ">
            <Skeleton variant="rounded" width="100%" height="100%" />
          </Box>
        </Grid>
      </Grid>
      <Box
        component="section"
        sx={{ display: 'flex', overflow: 'hidden' }}
      >
        <Container className="skel-values--container">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box className="item-skel">
                <Box sx={{ position: "relative" }}>
                  <svg width="129" height="120" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#DFAF4E" fillOpacity="0.2" />
                  </svg>
                </Box>
                <Skeleton variant="text" width="70%" height="80px" />
                <Skeleton variant="rectangular" width="80%" height="300px" />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="item-skel">
                <Box sx={{ position: "relative" }}>
                  <svg width="129" height="120" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M108.176 47.3474C108.61 67.2137 97.8946 85.662 79.3595 92.9821C56.1531 102.147 27.478 104.874 12.0644 85.3048C-4.72641 63.9871 -2.01006 32.6185 15.4491 11.841C30.1665 -5.67369 56.0946 -0.751328 77.4918 7.44197C94.845 14.0868 107.771 28.8238 108.176 47.3474Z" fill="#DFAF4E" fillOpacity="0.2" />
                  </svg>
                </Box>
                <Skeleton variant="text" width="70%" height="80px" />
                <Skeleton variant="rectangular" width="80%" height="300px" />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="item-skel">
                <Box sx={{ position: "relative" }}>
                  <svg width="129" height="120" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#DFAF4E" fillOpacity="0.2" />
                  </svg>
                </Box>
                <Skeleton variant="text" width="70%" height="80px" />
                <Skeleton variant="rectangular" width="80%" height="300px" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}