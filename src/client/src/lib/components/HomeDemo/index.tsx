import { Box, Grid, Typography, Button } from '@mui/material';
import { CardGrid } from '../CardGrid';
import React from 'react';
import { Link } from 'react-router-dom';
import { VideoPlayer } from '../VideoPlayer';

export const HomeDemo = () => {
  return (
    <Box sx={{ marginTop: 5 }}>
      {/* <Typography variant="h2" className="productDetails-heading--font">How Teachers Use Plato's Peach</Typography> */}
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <Box>
            <VideoPlayer url="https://res.cloudinary.com/drewpager/video/upload/v1693489768/platos-peach-video/how-to-use-platos-peach_wvdqui.mp4" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}