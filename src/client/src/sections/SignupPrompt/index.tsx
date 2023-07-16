import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Divider } from '@mui/material';
import '../SignUp/signup.scss';
import { Footer } from '../../lib/components';
import { Link } from 'react-router-dom';

export const SignUpPrompt = () => {

  return (
    <div>
      <Box className="login--box">
        <Card className="login--card">
          <CardContent>
            <Typography variant="h4" color="text.secondary">You Must Login or Sign Up for Plato's Peach</Typography>
            <Divider sx={{ margin: 2 }} />
            <CardActions sx={{ justifyContent: "center" }}>
              <Link to="/signup"><Button className="google--button" size="medium">Sign Up</Button></Link>
              <Link to="/login"><Button className="google--button" size="medium">Login</Button></Link>
            </CardActions>
            <Divider sx={{ margin: 2 }} />
            <Typography sx={{ fontStyle: 'italic' }}>Note: We require content creators to be paying users to avoid fraudulent content.</Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </div>
  )
}