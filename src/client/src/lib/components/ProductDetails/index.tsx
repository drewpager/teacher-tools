import { Box, Grid, Typography, Button } from '@mui/material';
import { CardGrid } from '../CardGrid';
import React from 'react';
import { Link } from 'react-router-dom';
import dragDrop from '../../assets/drag-and-drop.gif'
import sistine from '../../assets/sistine.png'
import './productDetails.scss';

export const ProductDetails = () => {
  return (
    <Box className="details--box">
      <Typography variant="h2" className="productDetails-title--font">How Plato's Peach Works</Typography>
      <Grid container>
        <Grid item xs={12} sm={12} md={8}>
          <Box className="details-blue--box">
            <Box>
              <div className="blue--box">
                <img src={sistine} alt="Sistine Chapel" className="img--overlay" />
              </div>
            </Box>
            <Box sx={{ position: "relative" }}>
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fill-opacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>1.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Browse Our Growing Library of History Documentaries
            </Typography>
            <Typography variant="body2" sx={{ pb: "2rem", pr: "2rem", fontSize: 20 }}>
              Using our <Link to="/playlist/create">lesson plan creation tool</Link> you can quickly construct lesson plans with the content you choose and assessments you create.
            </Typography>
            <Button href='/catalog' className="pricing--button">View Catalog</Button>
          </Box>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={6}>
          <img src={dragDrop} style={{ border: `2px solid black` }} alt="Showcasing the drag and drop functionality of plato's peach" />
        </Grid> */}
        <Grid item xs={12} sm={12} md={8}>
          <Box className="details-green--box">
            <Box>
              <div className="green--box">
                <img src={sistine} alt="Sistine Chapel" className="img--overlay" />
              </div>
            </Box>
            <Box sx={{ position: "relative" }}>
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fill-opacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>2.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Drag and Drop Custom Lessons and Assessments
            </Typography>
            <Typography variant="body2" sx={{ pb: "2rem", pr: "2rem", fontSize: 20 }}>
              Using our <Link to="/playlist/create">lesson plan creation tool</Link> you can quickly construct lesson plans with the content you choose and assessments you create.
            </Typography>
            <Button href='/catalog' className="pricing--button">View Catalog</Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={8}>
          <Box className="details-biege--box">
            <Box>
              <div className="biege--box">
                <img src={sistine} alt="Sistine Chapel" className="img--overlay" />
              </div>
            </Box>
            <Box sx={{ position: "relative" }}>
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fill-opacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>3.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Drag and Drop Custom Lessons and Assessments
            </Typography>
            <Typography variant="body2" sx={{ pb: "2rem", pr: "2rem", fontSize: 20 }}>
              Using our <Link to="/playlist/create">lesson plan creation tool</Link> you can quickly construct lesson plans with the content you choose and assessments you create.
            </Typography>
            <Button href='/catalog' className="pricing--button">View Catalog</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box className="details-pink--box">
            <Box>
              <div className="pink--box">
                <img src={sistine} alt="Sistine Chapel" className="img--overlay" />
              </div>
            </Box>
            <Box sx={{ position: "relative" }}>
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fill-opacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>4.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Drag and Drop Custom Lessons and Assessments
            </Typography>
            <Typography variant="body2" sx={{ pb: "2rem", pr: "2rem", fontSize: 20 }}>
              Using our <Link to="/playlist/create">lesson plan creation tool</Link> you can quickly construct lesson plans with the content you choose and assessments you create.
            </Typography>
            <Button href='/catalog' className="pricing--button">View Catalog</Button>
          </Box>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={6} sx={{ marginTop: "2rem" }}>
          <CardGrid />
        </Grid> */}
      </Grid>
    </Box>
  )
}