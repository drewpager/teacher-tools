import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
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
  }, [])
  return (
    <Card className="callAction--home">
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Typography variant='h3' className='callAction--text'>Start Creating Interactive Lesson Plans for Free!</Typography>
            <div className='callAction--buttonDiv'>
              <Link to="/login" style={{ textDecoration: 'none' }}><Button variant="contained" className="callAction--buttonFirst">Free Trial</Button></Link>
              <Link to="/pricing" style={{ textDecoration: 'none' }}><Button variant="outlined" className="callAction--buttonSecond">Pricing</Button></Link>
            </div>
          </Grid>
          <Grid item xs={0} sm={0} md={4} lg={4}>
            <div className="containCTA" ref={containCTA}></div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}