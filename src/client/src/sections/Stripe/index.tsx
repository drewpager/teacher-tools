import React, { useEffect, useRef } from 'react';

export const Stripe = () => {
  return (
    <div>Stripe</div>
  )
}
// import { useMutation } from '@apollo/client';
// import { gql } from 'graphql-tag'
// // import { CONNECT_STRIPE } from '../../lib/graphql/mutations/ConnectStripe';
// import { Box, CircularProgress } from '@mui/material';
// import { Viewer, useConnectStripeMutation } from '../../graphql/generated';
// import { Navigate } from "react-router-dom";
// import { DisplaySuccess } from '../../lib/utils';

// type Props = {
//   viewer: Viewer
//   setViewer: (viewer: Viewer) => void;
// }

// const ADD_PAYMENT = gql`
//   mutation AddPayment($paymentId: String, $viewer: String) {
//     addPayment(paymentId: $paymentId, viewer: $viewer)
//   }
// `

// export const Stripe = ({ viewer, setViewer }: Props) => {
//   const [connectStripe, { data, loading, error }] = useConnectStripeMutation({
//     onCompleted: data => {
//       setViewer({ ...viewer, paymentId: data.connectStripe.paymentId })
//     }
//   })
//   const connectStripeRef = useRef(connectStripe)

//   const [addPayment, { data: userPaymentData, loading: userPaymentLoading, error: userPaymentError}] = useMutation(ADD_PAYMENT);
//   const addPaymentRef = useRef(addPayment);

//   useEffect(() => {
//     const code = new URL(window.location.href).searchParams.get("code");

//     if (code) {
//       connectStripeRef.current({
//         variables: {
//           input: { 
//             code: code 
//           }
//         }
//       })
//       addPaymentRef.current({
//         variables: {
//           paymentId: code,
//           viewer: viewer.id,
//           user: {
//             contact: viewer.contact
//           }
//         }
//       })
//       console.log(viewer)
//     } else {
//       <Navigate to="/login" replace={true} />
//     }
//   }, [viewer])

//   if (data) {
//     return (
//       <>
//       <Navigate to={`/billing`} replace={true} />
//       <DisplaySuccess title="Successfully setup Stripe!" />
//       </>
//     )
//   }
  
//   if (userPaymentData) {
//     return <Navigate to={`/user/${viewer.id}`} replace={true} />
//   }

//   if (loading || userPaymentLoading) {
//     return (
//       <Box sx={{ marginTop: 10 }}>
//         <CircularProgress />
//       </Box>
//     )
//   }

//   if (error) {
//     return <Navigate to={`/user/${viewer.id}?stripe_error=true`} replace={true} />
//   }

//   if (userPaymentError) {
//     return <Navigate to={`/user/${viewer.id}?user_error=true`} replace={true} />
//   }

//   return null;
// }