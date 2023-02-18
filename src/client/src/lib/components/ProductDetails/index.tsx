import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import '../../assets/drag-and-drop.gif'

export const ProductDetails = () => {
  return (
    <Box>
      <Grid container>
        <Grid item sm={12} md={6}>
          <Typography variant="h2">
            Testing
          </Typography>
          <Typography variant="body2">
            This is a paragraph
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <img src='../../assets/drag-and-drop.gif' alt="Showcasing the drag and drop functionality of plato's peach" />
        </Grid>
      </Grid>
    </Box>
  )
}