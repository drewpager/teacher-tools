import { Box, Typography, Chip, FormGroup, FormControlLabel, Alert, Divider, Container, Tabs, Fade, Tab, Button, Paper } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import React, { useState, forwardRef, useEffect } from 'react';
import { FAQ, Footer } from '../../lib/components/';
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckIcon from '@mui/icons-material/Check';
import './pricing.scss'
import theme from '../../theme';

export const Pricing = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>("")
  // const [monthlyCadence, setMonthlyCadence] = useState<"monthly" | "yearly">("monthly");
  const [monthlyCadence, setMonthlyCadence] = useState<boolean>(false);

  const pricingFAQ = [
    {
      question: "What is the difference between the Socrates and Plato plans?",
      answer: "The Socrates plan is best for home schoolers and the Plato plan is best for teachers. The Socrates plan allows you to create up to 5 student accounts and the Plato plan allows you to create up to 30 student accounts. The Socrates plan is billed monthly and the Plato plan is billed annually."
    },
    {
      question: "What is the difference between the Socrates and Plato plans?",
      answer: "The Socrates plan is best for home schoolers and the Plato plan is best for teachers. The Socrates plan allows you to create up to 5 student accounts and the Plato plan allows you to create up to 30 student accounts. The Socrates plan is billed monthly and the Plato plan is billed annually."
    },
    {
      question: "What is the difference between the Socrates and Plato plans?",
      answer: "The Socrates plan is best for home schoolers and the Plato plan is best for teachers. The Socrates plan allows you to create up to 5 student accounts and the Plato plan allows you to create up to 30 student accounts. The Socrates plan is billed monthly and the Plato plan is billed annually."
    },
    {
      question: "What is the difference between the Socrates and Plato plans?",
      answer: "The Socrates plan is best for home schoolers and the Plato plan is best for teachers. The Socrates plan allows you to create up to 5 student accounts and the Plato plan allows you to create up to 30 student accounts. The Socrates plan is billed monthly and the Plato plan is billed annually."
    }
  ]

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
    <Box sx={{ marginTop: 12 }}>
      <FormGroup sx={{ alignItems: 'flex-end', marginRight: 2 }}>
        <FormControlLabel control={<PricingSwitch sx={{ m: 1 }} checked={monthlyCadence} onChange={() => setMonthlyCadence(!monthlyCadence)} />} label="" />
      </FormGroup>
      <Box className='pricing--card-box'>
        <Box className="pricing--box">
          <h3>Socrates Plan</h3>
          <Chip label="Best for Home School" color="primary" />
          <Typography variant="h5" color={theme.palette.info.light} sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$48 billed annually ($4/mo)" : "$6.99 billed Monthly"}</Typography>
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
          <Typography variant="h5" color={theme.palette.info.light} sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$60 billed annually ($5/mo)" : "$7.99 billed Monthly"}</Typography>
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
          <Typography variant="h5" color={theme.palette.info.light} sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$84 billed annually ($7/mo)" : "$9.99 billed Monthly"}</Typography>
          <Button
            variant='contained'
            target="_blank"
            href={monthlyCadence ? "https://buy.stripe.com/test_8wM15Pfdqg3H5jyaEG" : "https://buy.stripe.com/test_00g7ud3uI4kZ5jy7ss"}
            className='pricing--button'
          >Choose Plan</Button>
        </Box>
      </Box>
      <Alert severity="success">All Plans Include a 7-Day Free Trial!</Alert>
      <Box className='pricing--card-box'>
        <Box className="pricing-details--box">
          <h3>Socrates Plan</h3>
          <ul>
            <li className="success">Up to 5 Class Accounts</li>
            <li className="success">Unlimited Teacher Accounts</li>
            <li className="warning">10 Classes</li>
            <li className="warning">50 Assignments</li>
          </ul>
        </Box>
        <Box className="pricing-details--box">
          <h3>Plato's Plan</ h3>
          <ul>
            <li className="success">Up to 5 Class Accounts</li>
            <li className="success">Unlimited Teacher Accounts</li>
            <li className="success">Unlimited Classes</li>
            <li className="warning">100 Assignments</li>
          </ul>
        </Box>
        <Box className="pricing-details--box">
          <h3>Aristotle Plan</h3>
          <ul>
            <li className="success">Up to 5 Class Accounts</li>
            <li className="success">Unlimited Teacher Accounts</li>
            <li className="success">Unlimited Classes</li>
            <li className="success">Unlimited Assignments</li>
          </ul>
        </Box>
        <Box className="pricing-faq--box">
          <h2>Frequently Asked Questions</h2>
          <FAQ questionAnswers={pricingFAQ} />
          <Divider sx={{ marginBottom: "1em" }} />
          <Typography variant="h5" fontSize={28} className='pullQuote'>"In order to seek one’s own direction, we must simplify the mechanics of ordinary, everyday life." -Plato</Typography>
          <Divider sx={{ marginTop: "1em" }} />
          {/* TODO: Add pull quote: "In order to seek one’s own direction, we must simplify the mechanics of ordinary, everyday life." Plato */}
        </Box>
      </Box>
      {/* {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )} */}
      <Footer />
    </Box>
  )
}