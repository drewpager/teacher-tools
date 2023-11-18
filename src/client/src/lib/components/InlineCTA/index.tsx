import { Typography, Button, Card, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './inlineCta.scss';

export const InlineCTA = () => {
  return (
    <Card className="incallAction--home">
      <Grid container className="grid--container">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="grid--text">
            <Typography variant='h3' className='incallAction--text'>Use This Lesson Plan as a Template or Start Creating Custom Plans Free</Typography>
            <Typography variant='h5' className='incallAction--subText'>Sign Up Free to browse and bookmark our catalog, create lesson plans for your curriculum, build custom assessments, and assign to students.</Typography>
            <div className='incallAction--buttonDiv'>
              <Link to="/signup" style={{ textDecoration: 'none' }}><Button variant="contained" className="incallAction--buttonFirst">Get Started For Free</Button></Link>
              <Link to="/plans" style={{ textDecoration: 'none' }}><Button variant="contained" className="incallAction--buttonSecond">More Lesson Plan Templates</Button></Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}