import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Box, Button } from '@mui/material';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>("")

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/billing`,
      },
      redirect: 'if_required'
    })

    if (error) {
      setMessage(error.message)
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment status: " + paymentIntent.status)
    } else {
      setMessage("Unknown error occurred")
    }

    setIsProcessing(false);
  }

  return (
    <Box sx={{ maxWidth: "50%" }}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />
        <Button disabled={isProcessing} type="submit" variant="contained" sx={{ marginTop: 2 }}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>

        {message && (
          <div>
            <p>{message}</p>
            {/* <Button variant="outlined" href="/create-portal-session">Manage Subscription</Button> */}
          </div>)}
      </form>
    </Box>
  )
}