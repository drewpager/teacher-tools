import React, { useEffect, useRef } from 'react';
// import { useMutation } from '@apollo/client';
// import { CONNECT_STRIPE } from '../../lib/graphql/mutations/ConnectStripe';
import { Box, CircularProgress } from '@mui/material';
import { Viewer, useConnectStripeMutation } from '../../graphql/generated';
import { Navigate } from "react-router-dom";
import { DisplaySuccess } from '../../lib/utils';

type Props = {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void;
}

export const Stripe = ({ viewer, setViewer }: Props) => {
  const [connectStripe, { data, loading, error }] = useConnectStripeMutation({
    onCompleted: (data) => {
      if (data && data.connectStripe) {
        setViewer({ ...viewer, paymentId: data.connectStripe.paymentId })
        return (<DisplaySuccess title="Successfully Striped!" />)
      }
    }
  })
  const connectStripeRef = useRef(connectStripe)

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      connectStripeRef.current({
        variables: {
          input: { code }
        }
      })
    } else {
      <Navigate to="/login" replace={true} />
    }
  }, [])

  if (data && data.connectStripe) {
    return <Navigate to={`/user/${viewer.id}`} replace={true} />
  }

  if (loading) {
    return (
      <Box sx={{ marginTop: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Navigate to={`/user/${viewer.id}?stripe_error=true`} replace={true} />
  }

  return null;
}