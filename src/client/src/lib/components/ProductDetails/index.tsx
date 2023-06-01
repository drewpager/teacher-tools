import { Box, Grid, Typography, Button } from '@mui/material';
import { CardGrid } from '../CardGrid';
import React from 'react';
import { Link } from 'react-router-dom';
import dragDrop from '../../assets/drag-and-drop.gif'
import sistine from '../../assets/how-it-works-1.png'
import works2 from '../../assets/how-it-works-2.png'
import works3 from '../../assets/how-it-works-3.png'
import works4 from '../../assets/how-it-works-4.png'
import './productDetails.scss';

export const ProductDetails = () => {
  return (
    <Box className="details--box">
      <Typography variant="h2" className="productDetails-heading--font">How Plato's Peach Works</Typography>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <Box className="details-blue--box">
            <Box>
              <img src={sistine} alt="Plato's Peach Video Player of Sistine Chapel" className="img--overlay" />
            </Box>
            <Box className="productDetails-number--box">
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fill-opacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>1.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Browse Our Growing Library of History Documentaries
            </Typography>
            <Typography variant="body2" className="productDetails-description--font">
              Our catalog of short history documentaries are the perfect puzzle pieces for you to construct lesson plans with the content you choose.
            </Typography>
            <Button href='/catalog' className="pricing--button">View Catalog</Button>
          </Box>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={6}>
          <img src={dragDrop} style={{ border: `2px solid black` }} alt="Showcasing the drag and drop functionality of plato's peach" />
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <Box className="details-green--box">
            <Box>
              <img src={works2} alt="Plato's Peach Teacher Quiz Creator" className="img--overlay" />
            </Box>
            <Box className="productDetails-number--box">
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fill-opacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>2.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Create Custom Assessment Questions
            </Typography>
            <Typography variant="body2" className="productDetails-description--font">
              Using our quiz creation tool you can customize assessments to fit the content within your lesson plans.
            </Typography>
            <Button href='/quiz/create' className="pricing--button">Create Quiz</Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={10}>
          <Box className="details-biege--box">
            <Box>
              <img src={works3} alt="Plato's Peach Interactive Drag and Drop Lesson Plan Creator" className="img--overlay" />
            </Box>
            <Box className="productDetails-number--box">
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fill-opacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>3.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Drag & Drop Custom Lesson Plans With Assessments
            </Typography>
            <Typography variant="body2" className="productDetails-description--font">
              Using our lesson plan creation tool you can quickly construct lesson plans with the content you choose and assessments you create.
            </Typography>
            <Button href='/playlist/create' className="pricing--button">Create Plan</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <Box className="details-pink--box">
            <Box>
              <img src={works4} alt="Plato's Peach Lesson Plan Playlist Sharing" className="img--overlay" />
            </Box>
            <Box className="productDetails-number--box">
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fill-opacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>4.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Share Lesson Plans With Students and Other Teachers
            </Typography>
            <Typography variant="body2" className="productDetails-description--font">
              Assign your custom lesson plans to your students or share it with other teachers. Rev sharing coming soon!
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