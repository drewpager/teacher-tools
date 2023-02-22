import { Box, Grid, Typography } from '@mui/material';
import { CardGrid } from '../CardGrid';
import React from 'react';
import { Link } from 'react-router-dom';
import dragDrop from '../../assets/drag-and-drop.gif'
import './productDetails.scss';

export const ProductDetails = () => {
  return (
    <Box className="details--box">
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h2" sx={{ pb: "2rem", pr: "2rem", fontWeight: 50 }}>
            Drag and Drop Interactive Lesson Plans Together in Seconds
          </Typography>
          <Typography variant="body2" sx={{ pb: "2rem", pr: "2rem", fontSize: 20 }}>
            Using our <Link to="/playlist/create">lesson plan creation tool</Link> you can quickly construct lesson plans with the content you choose and assessments you create.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <img src={dragDrop} style={{ border: `2px solid black` }} alt="Showcasing the drag and drop functionality of plato's peach" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h2" sx={{ pb: "2rem", pr: "2rem", mt: "2rem", fontWeight: 50 }}>
            Easily Share Lesson Plan Playlists With Your Students
          </Typography>
          <Typography variant="body2" sx={{ pb: "2rem", pr: "2rem", fontSize: 20 }}>
            Using our <Link to="/playlist/create">lesson plan creation tool</Link> you can quickly construct lesson plans with the content you choose and assessments you create.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={{ marginTop: "2rem" }}>
          <CardGrid />
        </Grid>
      </Grid>
    </Box>
  )
}