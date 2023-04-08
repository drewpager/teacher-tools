import React from 'react';
import { Box, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { Viewer } from '../../graphql/generated';
import { useParams } from 'react-router-dom';

type Props = {
  viewer: Viewer;
}

const handlePayment = async (key: string) => {
  const res = await fetch('/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({ lookup_keys: `${key}` })
  });
  const content = await res.json()

  console.log(content)
}

export const Billing = ({ viewer }: Props) => {

  return (
    <Box sx={{ marginTop: 10 }}>
      {console.log(viewer.paymentId)}
      <h1>Billing Page</h1>
      <Button variant="contained" onClick={() => handlePayment("0001")}>Subscribe for $3.99/mo</Button>
    </Box>
  )
}