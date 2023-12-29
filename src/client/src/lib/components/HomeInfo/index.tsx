import React, { useEffect, useRef } from 'react';
import { Typography, Grid, Link, Box } from '@mui/material'
import lottie from 'lottie-web';

import './homeinfo.scss';

export const HomeInfo = () => {
  const contain = useRef<any>();

  useEffect(() => {
    lottie.loadAnimation({
      container: contain.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../assets/platos-quiz.json')
    })
  }, [contain])
  return (
    <Grid container className='grid--container'>
      <Grid item xs={12} sm={12} md={7} lg={6}>
        <Box className='box--title'>
          <Typography variant="h1" className='title--text'>
            Easy Interactive Lesson Plans, Templates and Tools For Teachers
          </Typography>
          <Typography variant='h4' className='subtitle--text'>
            We’re an educational film company with a mission to provide short, world-class documentary films, lesson plans and assessment questions for students, teachers and life-long learners.
          </Typography>
          <div className="grid--buttons">
            <Link variant="subtitle1" href="/catalog" className='startTeaching--button'>
              View Catalog
            </Link>
            <Link variant="subtitle1" href="/pricing/" className='pricing--button'>
              View Pricing
            </Link>
          </div>
        </Box>
      </Grid>
      <Grid item xs={0} sm={0} md={5} lg={6}>
        <Box className="animation--box">
          <svg width="459" height="450" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fillOpacity="0.9" />
          </svg>
          <div className="contain" ref={contain} />
        </Box>
      </Grid>
    </Grid>
  );
}