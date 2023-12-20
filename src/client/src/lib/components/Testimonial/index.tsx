import React from 'react';
import { Box, Typography } from '@mui/material';
import './testimonial.scss'; // This will be your stylesheet

interface props {
  text: string;
  author: string;
  position: string;
  imageSrc: string;
  bgColor: string;
}

export const Testimonial = ({ text, author, position, imageSrc, bgColor }: props) => {
  return (
    <Box className="testimonial-container" sx={{ backgroundColor: `${bgColor}` }}>
      <div className="testimonial-content">
        <Typography variant='body1' className="testimonial-text">"{text}"</Typography>
        <p className="testimonial-author">{author}</p>
        <p className="testimonial-position">{position}</p>
      </div>
      <div className="testimonial-image">
        <img src={imageSrc} alt={author} />
      </div>
    </Box>
  );
};