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
import { Helmet } from 'react-helmet';

export const Pricing = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>("")
  // const [monthlyCadence, setMonthlyCadence] = useState<"monthly" | "yearly">("monthly");
  const [monthlyCadence, setMonthlyCadence] = useState<boolean>(true);

  const pricingFAQ = [
    {
      question: "Is Plato's Peach only for history teachers?",
      answer: "Currently, our content catalog features documentaries built primarily for teaching History and Social Studies, but STEM and English related content is currently in production. The platform itself does allow teachers to create the content they want to teach in their lesson plans. If you teach another subject or have questions related to our product, please reach out to drew@teachertoolsusa.com to discuss how we can help."
    },
    {
      question: "If I pay for a full year and don't use the platform, can I have a refund?",
      answer: "Yes, we can refund you for the unused portion of your subscription. Please reach out via our contact form or directly to drew@teachertoolsusa.com to request a refund."
    },
    {
      question: "Do you offer discounts to teachers of Title I schools?",
      answer: "Yes, we will offer a 37% discount to teachers of Title I schools. Please reach out via our contact form or directly to drew@teachertoolsusa.com to request a discount."
    },
    {
      question: "Do you offer any other discounts?",
      answer: "If you are interested in the product but feel the price is too high, please reach out via our contact form or directly to tom@teachertoolsusa.com to discuss."
    },
    {
      question: `What does "Teacher-To-Teacher" sharing entail?`,
      answer: "Teachers have the option to make the assessments, lesson plans and other content they create available publicly for other teachers to use. Teachers can also search for and use content created by other teachers."
    },
    {
      question: "Does Plato's Peach integrate with Google Classroom?",
      answer: "Yes! Currently, teachers can assign a Plato's Peach interactive lesson plan to their Google Classroom. We are working on additional integrations with Google Classroom and other LMS platforms."
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
      <Helmet>
        <title>{`Pricing for Teachers, Homeschool, and School Districts | Plato's Peach`}</title>
        <meta name="description" content={`Pay annually or monthly to leverage our catalog of short documentaries and custom assessments to create interactive lesson plans.`} />
      </Helmet>
      <FormGroup sx={{ alignItems: 'center', marginRight: 2 }}>
        <FormControlLabel control={<PricingSwitch sx={{ m: 1 }} checked={monthlyCadence} onChange={() => setMonthlyCadence(!monthlyCadence)} />} label="" />
      </FormGroup>
      <Alert severity="success">All Plans Include a 7-Day Free Trial!</Alert>
      <Box className='pricing--card-box'>
        <Box className="pricing--box">
          <h3>Free Plan</h3>
          <Chip label="Best for Trial" color="primary" />
          <Typography variant="h5" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>$0 with Limitations</Typography>
          <Button
            variant='contained'
            href={"/signup"}
            className='pricing--button'
          >Try Free</Button>
        </Box>
        <Box className="pricing--box">
          <h3>Socrates Plan</h3>
          <Chip label="Best for Home School" color="primary" />
          <Typography variant="h5" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$152 billed annually ($12.67/mo)" : "$14.95 billed Monthly"}</Typography>
          <Button
            variant='contained'
            target="_blank"
            // href={monthlyCadence ? "/yearly" : "/monthly"}
            href={monthlyCadence ? "https://buy.stripe.com/bIY013f3v5pq4Vi7sB" : "https://buy.stripe.com/00gcNP6wZbNO4Vi6ow"}
            className='pricing--button'
          >Choose Plan</Button>
        </Box>
        <Box className="pricing--box">
          <h3>Plato's Plan</ h3>
          <Chip label="Best For Teachers" color="primary" />
          <Typography variant="h5" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>{monthlyCadence ? "$200 billed annually ($16.67/mo)" : "$19.95 billed Monthly"}</Typography>
          <Button
            variant='contained'
            target="_blank"
            // Test + Production Stripe Links
            // href={monthlyCadence ? "https://buy.stripe.com/test_bIYaGpghueZDaDSbIN" : "https://buy.stripe.com/test_4gw4i1d5i04JeU814a"}
            // href={monthlyCadence ? "/yearly" : "/monthly"}
            href={monthlyCadence ? "https://buy.stripe.com/aEU6pr8F77xy5ZmfZ4" : "https://buy.stripe.com/3cs1574oRf0087u9AH"}
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
          <h3>Free Plan</h3>
          <ul>
            <li className="success">Unlimited Bookmarks</li>
            <li className="warning">Limited to 6 Lesson Plans</li>
            <li className="warning">Limited To 6 Assessments</li>
            <li className="warning">Limited To 6 Custom Lessons</li>
          </ul>
        </Box>
        <Box className="pricing-details--box">
          <h3>Socrates Plan</h3>
          <ul>
            <li className="success">Unlimited Custom Assessments</li>
            <li className="success">Teacher-To-Teacher Sharing</li>
            <li className="warning">Limited To 30 Lesson Plans</li>
            <li className="warning">Limited To 10 Classes</li>
          </ul>
        </Box>
        <Box className="pricing-details--box">
          <h3>Plato's Plan</ h3>
          <ul>
            <li className="success">Unlimited Custom Assessments</li>
            <li className="success">Teacher-To-Teacher Sharing</li>
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
          <a id="frequent-questions" href='/pricing' style={{ textDecoration: "none", color: "#000" }}><h2>Frequently Asked Questions</h2></a>
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