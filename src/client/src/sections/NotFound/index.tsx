import React, { useEffect, useRef } from 'react';
import { Typography, Grid, Link, Box } from '@mui/material'
import { Footer } from '../../lib/components';
import lottie from 'lottie-web';
import { Helmet } from 'react-helmet';

import './notFound.scss';

export const NotFound = () => {
  const container = useRef<any>();

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../lib/assets/error-animation.json')
    })
  }, [container])
  return (
    <Grid container className='grid--container'>
      <Helmet>
        <title>404 Not Found</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Grid item xs={12} sm={12} md={7} lg={6}>
        <Box className='box--title'>

          <Typography variant="h1" className='title--text'>
            400 + 4 = Oops!
          </Typography>
          <Typography variant='h4' className='subtitle--text'>
            This page threw a 404 error and appears to be broken or missing. Please check the URL or click one of these buttons to navigate back to safety.
          </Typography>
          <div className="grid--buttons">
            <Link variant="subtitle1" href="/" className='startTeaching--button'>
              Home
            </Link>
            <Link variant="subtitle1" href="/catalog/" className='pricing--button'>
              Catalog
            </Link>
          </div>
        </Box>
      </Grid>
      <Grid item xs={0} sm={0} md={5} lg={6}>
        <Box className="animation--box">
          <svg width="459" height="450" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.824206 52.6526C0.390436 32.7863 11.1055 14.338 29.6406 7.01791C52.847 -2.14699 81.5221 -4.87401 96.9357 14.6952C113.727 36.0129 111.01 67.3815 93.551 88.159C78.8336 105.674 52.9055 100.751 31.5083 92.558C14.1551 85.9132 1.22866 71.1762 0.824206 52.6526Z" fill="#FFFFFF" fillOpacity="0.9" />
          </svg>
          <div className="container" ref={container} />
        </Box>
      </Grid>
      <Footer />
    </Grid>
  );
}
