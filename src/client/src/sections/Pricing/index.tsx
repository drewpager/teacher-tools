import { Box, Typography, Chip, FormGroup, FormControlLabel, Divider, Container, Tabs, Fade, Tab, Button, Paper } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import React, { useState, forwardRef, useEffect } from 'react';
import { CheckoutForm } from '../../lib/components/CheckoutForm/CheckoutForm';
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import './pricing.scss'
import theme from '../../theme';

export const Pricing = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>("")
  // const [monthlyCadence, setMonthlyCadence] = useState<"monthly" | "yearly">("monthly");
  const [monthlyCadence, setMonthlyCadence] = useState<boolean>(false);

  const PricingSwitch = styled(Switch)(() => ({
    width: 100,
    height: 35,
    padding: 0,
    margin: 12,
    borderRadius: "20% / 50%",
    '& .MuiSwitch-switchBase': {
      margin: 0,
      padding: 0,
      transform: 'translateX(-1px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(35px)',
        '& .MuiSwitch-thumb:before': {
          content: "'Yearly'",
          position: 'relative',
          width: '100%',
          height: '100%',
          left: 5,
          top: 5,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 65,
      height: 35,
      borderRadius: 30,
      fontSize: 16,
      '&:before': {
        content: "'Monthly'",
        position: 'relative',
        width: '100%',
        height: '100%',
        left: 5,
        top: 5,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    },
  }));

  useEffect(() => {
    fetch('/config').then(async (r) => {
      const { publishableKey } = await r.json();
      const stripeConfig = await loadStripe(`${publishableKey}`)
      setStripePromise(stripeConfig);
    })
  }, [])

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    })
  }, [])

  return (
    <Box sx={{ marginTop: 10 }}>
      <h2>All Plans Include a 7 Day Free Trial!</h2>
      <FormGroup sx={{ alignItems: 'flex-end', marginRight: 2 }}>
        <FormControlLabel control={<PricingSwitch sx={{ m: 1 }} checked={monthlyCadence} onChange={() => setMonthlyCadence(!monthlyCadence)} />} label="" />
      </FormGroup>
      <Box className='pricing--card-box'>
        <Box className="pricing--box">
          <h3>Socrates Plan</h3>
          <Chip label="Best for Home School" color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$48 billed annually ($4/mo)" : "$6.99 billed Monthly"}</Typography>
          <Button
            variant='contained'
            target="_blank"
            // href={monthlyCadence ? "/yearly" : "/monthly"}
            href={monthlyCadence ? "https://buy.stripe.com/test_dR64i1aXa8BfeU88wA" : "https://buy.stripe.com/test_fZeg0JaXa8Bf5jy4gj"}
            className='pricing--button'
          >Choose Plan</Button>
        </Box>
        <Box className="pricing--box">
          <h3>Plato's Plan</ h3>
          <Chip label="Best For Teachers" color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$60 billed annually ($5/mo)" : "$7.99 billed Monthly"}</Typography>
          <Button
            variant='contained'
            target="_blank"
            href={monthlyCadence ? "https://buy.stripe.com/test_bIYaGpghueZDaDSbIN" : "https://buy.stripe.com/test_4gw4i1d5i04JeU814a"}
            className='pricing--button'
          >Choose Plan</Button>
        </Box>
        <Box className="pricing--box">
          <h3>Aristotle Plan</h3>
          <Chip label="Best for Districts" color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$84 billed annually ($7/mo)" : "$9.99 billed Monthly"}</Typography>
          <Button
            variant='contained'
            target="_blank"
            href={monthlyCadence ? "https://buy.stripe.com/test_8wM15Pfdqg3H5jyaEG" : "https://buy.stripe.com/test_00g7ud3uI4kZ5jy7ss"}
            className='pricing--button'
          >Choose Plan</Button>
        </Box>
      </Box>
      {/* {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )} */}
    </Box>
  )
}