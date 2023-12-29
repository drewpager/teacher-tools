import { Box, Grid, Typography, Button, Modal, Fab, IconButton } from '@mui/material';
import { CardGrid } from '../CardGrid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dragDrop from '../../assets/drag-and-drop.gif'
import sistine from '../../assets/how-it-works-1.png'
import works2 from '../../assets/how-it-works-2.png'
import works3 from '../../assets/how-it-works-3.png'
import works4 from '../../assets/how-it-works-4.png'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import './productDetails.scss';
import { VideoPlayer } from '../VideoPlayer';

export const ProductDetails = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handlePlayVideo = () => {
    setOpen(true);
  }
  return (
    <Box className="details--box">
      <Typography variant="h2" className="productDetails-heading--font">How Plato's Peach Works</Typography>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <Box className="details-blue--box">
            <Box className='playImage'>
              <button className="play-btn" onClick={handlePlayVideo} />
              <img src={sistine} alt="Plato's Peach Video Player of Sistine Chapel" className="img--overlay" />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="platos-peach-demo-videon"
                aria-describedby="platos-peach-demo-video-description"
              >
                <Box className="demo-video--modal">
                  <Box>
                    <Fab aria-label="cancel" onClick={handleClose} sx={{ justifySelf: "right", mb: "5px" }}>
                      {/* <CancelIcon /> */}
                      X
                    </Fab>
                  </Box>
                  <VideoPlayer url="https://res.cloudinary.com/drewpager/video/upload/v1693489768/platos-peach-video/how-to-use-platos-peach_wvdqui.mp4" />
                </Box>
              </Modal>
            </Box>
            <Box className="productDetails-number--box">
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fillOpacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>1.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Learn How it Works in 4 Minutes — Watch The Video Now!
            </Typography>
            <Typography variant="body2" className="productDetails-description--font">
              Our catalog of short history documentaries are the perfect puzzle pieces for you to construct lesson plans with the content you choose.
            </Typography>
            <Button onClick={handlePlayVideo} className="pricing--button">Watch Demo</Button>
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
                <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fillOpacity="0.9" />
              </svg>
              <Typography variant="h4" className="productDetails-title--font" sx={{ position: "absolute", top: "-30%", left: "7%", fontSize: 70 }}>2.</Typography>
            </Box>
            <Typography variant="h2" className="productDetails-subtitle--font">
              Generate Custom Assessment Questions Using AI
            </Typography>
            <Typography variant="body2" className="productDetails-description--font">
              Using our quiz creation tool you can customize assessments to fit the content within your lesson plans.
            </Typography>
            <Button href='/quiz/create' className="pricing--button"><AutoFixHighIcon /> Create Quiz</Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={10}>
          <Box className="details-biege--box">
            <Box>
              <img src={works3} alt="Plato's Peach Interactive Drag and Drop Lesson Plan Creator" className="img--overlay" />
            </Box>
            <Box className="productDetails-number--box">
              <svg width="69" height="60" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fillOpacity="0.9" />
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
                <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fillOpacity="0.9" />
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