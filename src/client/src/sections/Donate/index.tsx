import { Box, Typography, Chip, FormGroup, FormControlLabel, Divider, Button, Modal, Grid, TextField, InputAdornment } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import React, { useState, forwardRef, useEffect } from 'react';
import { Footer, SignupModal, FAQ, DonateCard } from '../../lib/components/';
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckIcon from '@mui/icons-material/Check';
import './donate.scss'
import theme from '../../theme';
import { Helmet } from 'react-helmet';
import '../../lib/assets/christina-headshot.png';
import { Viewer } from '../../graphql/generated';

interface props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const Donate = ({ viewer, setViewer }: props) => {
  // const [monthlyCadence, setMonthlyCadence] = useState<"monthly" | "yearly">("monthly");
  const [monthlyCadence, setMonthlyCadence] = useState<boolean>(false);
  const [promptOpen, setPromptOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("o");
  const [amount, setAmount] = useState<number>(10);

  const handlePromptClose = () => {
    setPromptOpen(false);
  }

  const namePrice = (event: any) => {
    event.preventDefault();
    setAmount(event.target.value);
  }

  const handleDonateNow = (amount: number, selected: string) => {
    if (amount === 10 && selected === "o") {
      window.open("https://donate.stripe.com/5kA9BD2gJ19abjG3cp", "_blank")
    }
    if (amount === 10 && selected === "m") {
      window.open("https://buy.stripe.com/5kAeVX8F7dVWcnK6oH", "_blank")
    }
    if (amount === 10 && selected === "a") {
      window.open("https://buy.stripe.com/dR66pr08BdVW0F29B4", "_blank")
    }
    if (amount === 20 && selected === "o") {
      window.open("https://donate.stripe.com/aEU8xzcVncRScnKaES", "_blank")
    }
    if (amount === 20 && selected === "m") {
      window.open("https://buy.stripe.com/28odRTg7z4lm3Re3cw", "_blank")
    }
    if (amount === 20 && selected === "a") {
      window.open("https://buy.stripe.com/28oeVX5sV9FGdrO00t", "_blank")
    }
    if (amount === 30 && selected === "o") {
      window.open("https://donate.stripe.com/00g7tv3kN3higE0eV9", "_blank")
    }
    if (amount === 30 && selected === "m") {
      window.open("https://buy.stripe.com/aEU4hjbRj2deevSfZj", "_blank")
    }
    if (amount === 30 && selected === "a") {
      window.open("https://buy.stripe.com/5kA8xzf3vcRS87u7sU", "_blank")
    }
    if (amount === 100 && selected === "o") {
      window.open("https://donate.stripe.com/6oE4hj9Jb9FG5Zm3cs", "_blank")
    }
    if (amount === 100 && selected === "m") {
      window.open("https://buy.stripe.com/14k29bbRj0564Vi28u", "_blank")
    }
    if (amount === 100 && selected === "a") {
      window.open("https://buy.stripe.com/28o4hjdZr6tudrO8wX", "_blank")
    }
    if (amount === 200 && selected === "o") {
      window.open("https://donate.stripe.com/28oeVX5sV4lm73q9AR", "_blank")
    }
    if (amount === 200 && selected === "m") {
      window.open("https://buy.stripe.com/cN201308BdVWfzWfZl", "_blank")
    }
    if (amount === 200 && selected === "a") {
      window.open("https://buy.stripe.com/9AQ9BD1cF05687udRg", "_blank")
    }
    if (amount === 500 && selected === "o") {
      window.open("https://donate.stripe.com/bIY1571cF5pqevSfZg", "_blank")
    }
    if (amount === 500 && selected === "m") {
      window.open("https://buy.stripe.com/aEU5ln4oRaJK5Zm5kI", "_blank")
    }
    if (amount === 500 && selected === "a") {
      window.open("https://buy.stripe.com/7sIg01g7z4lmcnK9AZ", "_blank")
    }
  }

  const donateFAQ = [
    {
      question: "Why should I donate to Plato’s Peach? What do my donations support?",
      answer: "Donations to Plato’s Peach non-profit help us in our mission to support teachers and students globally with high-quality educational content and tools that fit their needs. We have an ambitious roadmap for both our growing catalog of free content as well as our suite of tools to leverage that content within the learning journey. Your donations will help make this work possible."
    },
    {
      question: "Is my gift tax deductible?",
      answer: "Yes, all donations are tax-deductible to the fullest extent of U.S. law."
    },
    {
      question: "How do I get a receipt for my tax deductible donation?",
      answer: "After your donation payment has been made, we will email you a receipt for tax purposes."
    },
    {
      question: "I don’t want to give online. Where can I mail my donation check?",
      answer: "You can mail your gift to our office at 1757 Playa Vista San Marcos, CA 92078. Please include a return address so we can send you a receipt."
    },
    {
      question: "What if I want to make a donation larger than $10,000?",
      answer: "You're amazing! We can work with you to make that happen. Please feel free to use our contact form and someone from our executive team will contact you directly."
    },
    {
      question: "I can’t make a monetary donation right now. Are there other ways I can support Plato’s Peach?",
      answer: "Use the product and share it with your friends, colleagues or anyone you think would find it beneficial for them. Thank you :)"
    }
  ]

  return (
    <Box sx={{ marginTop: 12 }}>
      <Helmet>
        <title>{`Donate to Plato's Peach Non-Profit`}</title>
        <meta name="description" content={`Donate one-time, monthly or annually to support our catalog expansion of short documentaries, custom assessments and interactive lesson plans.`} />
      </Helmet>
      <Modal
        open={promptOpen}
        onClose={handlePromptClose}
      >
        <Box className="signupmodal--box">
          <SignupModal setViewer={setViewer} />
        </Box>
      </Modal>
      <Grid container className='grid--container'>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box className='donate-box--title'>
            <Typography variant="h1" className='donate-title--text'>
              Donate to Plato's Peach Learning for a Tax-Deductible Contribution to Support Education.
            </Typography>
            <Typography variant='h4' className='subtitle--text'>
              Plato's Peach Learning Corporation is a 501(c)(3) nonprofit and nonpartisan organization. All donations are tax-deductible to the fullest extent of U.S. law.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <DonateCard viewer={viewer} setViewer={setViewer} />
        </Grid>
        <Box className='donate--faq'>
          <Typography className="faq-text">Frequently Asked Donor Questions</Typography>
          <FAQ questionAnswers={donateFAQ} />
        </Box>
      </Grid>
      {/* <FormGroup sx={{ alignItems: 'center', marginRight: 2 }}>
        <FormControlLabel control={<PricingSwitch sx={{ m: 1 }} checked={monthlyCadence} onChange={() => setMonthlyCadence(!monthlyCadence)} />} label="" />
      </FormGroup> */}
      {/* <Alert severity="success" sx={{ backgroundColor: "#57996A" }}>All Paid Plans Include a 7-Day Free Trial!</Alert> */}
      {/* <Modal
        open={promptOpen}
        onClose={handlePromptClose}
      >
        <Box className="signupmodal--box">
          <SignupModal setViewer={setViewer} />
        </Box>
      </Modal> */}
      {/* <Alert severity="success">All Plans Include a 7-Day Free Trial!</Alert> */}
      <Footer />
    </Box>
  )
}