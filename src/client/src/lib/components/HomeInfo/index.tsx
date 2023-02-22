import React, { useEffect, useRef } from 'react';
import { Typography, Grid, Link, Box, Paper } from '@mui/material'
import lottie from 'lottie-web';
import classroom from '../../assets/classroom.jpg';

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
  }, [])
  return (
    // <Paper
    //   className='title--image'
    //   sx={{ backgroundImage: `url(${classroom})` }}
    // >
    <Grid container spacing={1} className='grid--container'>
      <Grid item xs={12} sm={12} md={7} lg={6}>
        <Box className='box--title'>
          <Typography variant='h1' className='title--text'>
            Real results for students, teachers and life-long learners.
          </Typography>
          <Typography variant='h4' className='subtitle--text'>
            We’re an educational film company with a mission to provide short, world-class documentary films, lesson plans and assessment questions for students, teachers and life-long learners.
          </Typography>
          <div className="grid--buttons">
            <Link variant="subtitle1" href="/playlist/create" className='link--start'>
              Start Teaching
            </Link>
            <Link variant="subtitle1" href="/catalog/" className='link--start'>
              Start Learning
            </Link>
          </div>
        </Box>
      </Grid>
      <Grid item xs={0} sm={0} md={5} lg={6}>
        <div className="contain" ref={contain}></div>
      </Grid>
    </Grid>
    // </Paper>
  );
}