import React from 'react';
import { Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import { Viewer } from '../../graphql/generated';
import { useParams } from 'react-router-dom';

type Props = {
  viewer: Viewer;
}

export const Billing = ({ viewer }: Props) => {
  let { params } = useParams();
  console.log("Params: ", params);
  console.log("Viewer: ", viewer.id);
  return (
    <Box sx={{ marginTop: 10 }}>
      <h1>Billing Page</h1>
    </Box>
  )
}