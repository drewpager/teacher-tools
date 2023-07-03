import React from 'react';
import { Box, Button } from '@mui/material';
import { ContactForm } from './ContactForm';
import { Footer } from '../../lib/components';
import { Viewer } from '../../graphql/generated';

type Props = {
  viewer?: Viewer;
}

export const Contact = ({ viewer }: Props) => {

  return (
    <Box sx={{ marginTop: 10 }}>
      <ContactForm />
      <Footer />
    </Box>
  )
}