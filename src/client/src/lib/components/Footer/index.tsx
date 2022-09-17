import { Box } from '@mui/system';
import React from 'react';
import './footer.scss';

export const Footer = () => {
  return (
    <Box className="footer--box">
      <ul>
        <li>Footer</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </Box>
  )
}