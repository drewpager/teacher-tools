import React from 'react';
import { Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import { Viewer } from '../../graphql/generated';
import { useParams } from 'react-router-dom';

type Props = {
  viewer: Viewer;
}

export const Billing = ({ viewer }: Props) => {
  return (
    <Box sx={{ marginTop: 10 }}>
      <h1>Billing Page</h1>
    </Box>
  )
}