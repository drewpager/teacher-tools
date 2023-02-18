import { Typography, Box, Button, Card, CardContent } from '@mui/material';
import React from 'react';
import './callAction.scss';

export const CTA = () => {
  return (
    <Card className="callAction--home">
      <CardContent>
        <Typography variant='h3' className='callAction--text'>Start Building With Teacher Tools from Platos Peach Free</Typography>
        <div className='callAction--buttonDiv'>
          <Button variant="contained" className="callAction--buttonFirst">Free Trial</Button>
          <Button variant="outlined" className="callAction--buttonSecond">Pricing Options</Button>
        </div>
      </CardContent>
    </Card>
  )
}