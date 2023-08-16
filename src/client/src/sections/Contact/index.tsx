import React from 'react';
import { Box, Button } from '@mui/material';
import { ContactForm } from './ContactForm';
import { Footer } from '../../lib/components';
import { Viewer } from '../../graphql/generated';
import { Helmet } from 'react-helmet';

type Props = {
  viewer?: Viewer;
}

export const Contact = ({ viewer }: Props) => {

  return (
    <Box sx={{ marginTop: 10 }}>
      <Helmet>
        <title>{`Contact Us | Plato's Peach`}</title>
        <meta name="description" content={`The Plato's Peach team is dedicated to the districts, teachers and students we serve. Please let us know if you have any questions, feedback, or product suggestions.`} />
      </Helmet>
      <ContactForm />
      <Footer />
    </Box>
  )
}