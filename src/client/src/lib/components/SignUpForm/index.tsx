import React from 'react';
import { Typography, Button, Box, Divider, TextField } from '@mui/material';

import './signUpForm.scss';

export const SignUpForm = () => {
  return (
    <Box className="signup-form">
      <TextField className="signup-input" id="outlined-basic" label="Email" variant="outlined" />
      <TextField className="signup-input" id="outlined-basic" label="Password" variant="outlined" />
      <Button variant="contained">Sign Up</Button>
    </Box>
  )
}