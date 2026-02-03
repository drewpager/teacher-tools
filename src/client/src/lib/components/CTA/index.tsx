import { Typography, Button, Card, Grid } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './callAction.scss';

export const CTA = () => {
  const containCTA = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    // Only load if container exists and animation not already loaded
    if (!containCTA.current || animationRef.current) return;

    const loadAnimation = async () => {
      const [lottie, animationData] = await Promise.all([
        import('lottie-web'),
        import('../../assets/dancing-book.json')
      ]);

      // Double-check we haven't loaded yet and container still exists
      if (!animationRef.current && containCTA.current) {
        animationRef.current = lottie.default.loadAnimation({
          container: containCTA.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData.default
        });
      }
    };

    loadAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="callAction--home">
      <Grid container className="grid--container">
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <div className="containCTA" ref={containCTA} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <div className="grid--text">
            <Typography variant='h3' className='callAction--text'>Start Creating Interactive Lesson Plans for Free!</Typography>
            <Typography variant='h5' className='callAction--subText'>Browse and bookmark content within our catalog, create lesson plans for your curriculum, generate custom assessments with AI, and test your students on retention.</Typography>
            <div className='callAction--buttonDiv'>
              <Link to="/signup" style={{ textDecoration: 'none' }}><Button variant="contained" className="callAction--buttonFirst">Get Started For Free</Button></Link>
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
