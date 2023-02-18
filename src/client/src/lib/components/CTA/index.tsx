import { Typography, Button, Card, CardContent } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './callAction.scss';

export const CTA = () => {
  return (
    <Card className="callAction--home">
      <CardContent>
        <Typography variant='h3' className='callAction--text'>Start Creating Interactive Lesson Plans for Free!</Typography>
        <div className='callAction--buttonDiv'>
          <Link to="/login" style={{ textDecoration: 'none' }}><Button variant="contained" className="callAction--buttonFirst">Free Trial</Button></Link>
          <Link to="/pricing" style={{ textDecoration: 'none' }}><Button variant="outlined" className="callAction--buttonSecond">Pricing</Button></Link>
        </div>
      </CardContent>
    </Card>
  )
}