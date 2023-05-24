import { Typography, Button, Card, Grid } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './callAction.scss';
import lottie from 'lottie-web';

export const CTA = () => {
  const containCTA = useRef<any>();

  useEffect(() => {
    lottie.loadAnimation({
      container: containCTA.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../assets/dancing-book.json')
    })
  }, [containCTA])
  return (
    <Card className="callAction--home">
      <Grid container className="grid--container">
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <div className="containCTA" ref={containCTA} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <div className="grid--text">
            <Typography variant='h3' className='callAction--text'>Start Creating Interactive Lesson Plans for Free!</Typography>
            <Typography variant='h5' className='callAction--subText'>Use our 7-Day Free Trial to browse and bookmark our catalog, create lesson plans for your curriculum, custom assessments, and test with students.</Typography>
            <div className='callAction--buttonDiv'>
              <Link to="/login" style={{ textDecoration: 'none' }}><Button variant="contained" className="callAction--buttonFirst">Get Started For Free</Button></Link>
              {/* <Link to="/pricing" style={{ textDecoration: 'none' }}><Button variant="outlined" className="callAction--buttonSecond">Pricing</Button></Link> */}
            </div>
          </div>
        </Grid>
      </Grid>
      {/* <Grid item xs={0} sm={0} md={0} lg={3}>
          <div className="containCTA" ref={containCTA} />
        </Grid> */}
    </Card >
  )
}