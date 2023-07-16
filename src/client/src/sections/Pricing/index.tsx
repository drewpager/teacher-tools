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
      question: "What are custom assessments?",
      answer: "Plato's Peach custom assessments allow teachers to create their own multiple choice or True/False questions. Teachers can create custom assessments to understand retention within lesson plans."
    },
    {
      question: "What does 'teacher-to-teacher' sharing entail?",
      answer: "Teachers have the option to make the assessments, lesson plans and other content they create available to other teachers. Teachers can also search for and use content created by other teachers."
    },
    {
      question: "Is Plato's Peach only for history teachers?",
      answer: "Currently, our content catalog and suite of tools is built primarily for history teachers. If you teach another subject and have interest in our product, please reach out to drew@greadings.com to discuss how we can help."
    }
  ]

  const PricingSwitch = styled(Switch)(() => ({
    width: 100,
    height: 45,
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
          left: 6,
          top: 7,
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
      width: 75,
      height: 45,
      borderRadius: 30,
      fontSize: 18,
      '&:before': {
        content: "'Monthly'",
        position: 'relative',
        width: '100%',
        height: '100%',
        left: 6,
        top: 7,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    },
  }));

  return (
    <Box sx={{ marginTop: 12 }}>
      <FormGroup sx={{ alignItems: 'center', marginRight: 2 }}>
        <FormControlLabel control={<PricingSwitch sx={{ m: 1 }} checked={monthlyCadence} onChange={() => setMonthlyCadence(!monthlyCadence)} />} label="" />
      </FormGroup>
      <Alert severity="success">All Plans Include a 7-Day Free Trial!</Alert>
      <Box className='pricing--card-box'>
        <Box className="pricing--box">
          <h3>Socrates Plan</h3>
          <Chip label="Best for Home School" color="primary" />
          <Typography variant="h5" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$70 billed annually ($5.83/mo)" : "$6.99 billed Monthly"}</Typography>
          <Button
            variant='contained'
            target="_blank"
            // href={monthlyCadence ? "/yearly" : "/monthly"}
            href={monthlyCadence ? "https://buy.stripe.com/6oEcNPcVnbNOevSdQR" : "https://buy.stripe.com/14k1571cFbNObjGdQQ"}
            className='pricing--button'
          >Choose Plan</Button>
        </Box>
        <Box className="pricing--box">
          <h3>Plato's Plan</ h3>
          <Chip label="Best For Teachers" color="primary" />
          <Typography variant="h5" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$80 billed annually ($6.67/mo)" : "$7.99 billed Monthly"}</Typography>
          <Button
            variant='contained'
            target="_blank"
            // Test + Production Stripe Links
            // href={monthlyCadence ? "https://buy.stripe.com/test_bIYaGpghueZDaDSbIN" : "https://buy.stripe.com/test_4gw4i1d5i04JeU814a"}
            href={monthlyCadence ? "https://buy.stripe.com/3cs29bcVng449by8wA" : "https://buy.stripe.com/fZe157dZr2deevS6ot"}
            className='pricing--button'
          >Choose Plan</Button>
        </Box>
        <Box className="pricing--box">
          <h3>Aristotle Plan</h3>
          <Chip label="Best for Districts" color="primary" />
          <Typography variant="h5" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "Contact for custom pricing" : "Contact for custom pricing"}</Typography>
          <Button
            variant='contained'
            href="/contact"
            className='pricing--button'
          >Contact Sales</Button>
        </Box>
      </Box>
      {/* <Alert severity="success">All Plans Include a 7-Day Free Trial!</Alert> */}
      <Box className='pricing--card-box'>
        <Box className="pricing-details--box">
          <h3>Socrates Plan</h3>
          <ul>
            <li className="success">Unlimited Custom Assessments</li>
            <li className="success">Teacher To Teacher Sharing</li>
            <li className="warning">Limited To 30 Lesson Plans</li>
            <li className="warning">Limited To 10 Classes</li>
          </ul>
        </Box>
        <Box className="pricing-details--box">
          <h3>Plato's Plan</ h3>
          <ul>
            <li className="success">Unlimited Custom Assessments</li>
            <li className="success">Teacher To Teacher Sharing</li>
            <li className="success">Unlimited Lesson Plans</li>
            <li className="success">Unlimited Classes</li>
            <li className="warning">Limited To 300 students</li>
          </ul>
        </Box>
        <Box className="pricing-details--box">
          <h3>Aristotle Plan</h3>
          <ul>
            <li className="success">Unlimited Custom Assessments</li>
            <li className="success">Inter-District Sharing</li>
            <li className="success">Unlimited Lesson Plans</li>
            <li className="success">Unlimited Classes</li>
            <li className="success">Unlimited Teachers</li>
            <li className="success">Unlimited Students</li>
          </ul>
        </Box>
        <Box className="pricing-faq--box">
          <h2>Frequently Asked Questions</h2>
          <FAQ questionAnswers={pricingFAQ} />
          <Divider sx={{ marginBottom: "1em" }} />
          <Typography variant="h5" fontSize={28} className='pullQuote'>"In order to seek one’s own direction, we must simplify the mechanics of ordinary, everyday life." -Plato</Typography>
          <Divider sx={{ marginTop: "1em" }} />
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