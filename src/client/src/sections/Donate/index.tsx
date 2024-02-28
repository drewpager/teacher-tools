import { Box, Typography, Chip, FormGroup, FormControlLabel, Divider, Button, Modal, Grid, TextField, InputAdornment } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import React, { useState, forwardRef, useEffect } from 'react';
import { Footer, SignupModal } from '../../lib/components/';
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

  const handlePromptClose = () => {
    setPromptOpen(false);
  }

  const namePrice = (event: any) => {
    event.preventDefault();
    setAmount(event.target.value);
  }

  return (
    <Box sx={{ marginTop: 12 }}>
      <Helmet>
        <title>{`Donate to Plato's Peach Non-Profit`}</title>
        <meta name="description" content={`Donate one-time, monthly or annually to support our catalog expansion of short documentaries, custom assessments and interactive lesson plans.`} />
      </Helmet>
      <Grid container className='grid--container'>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box className='donate-box--title'>
            <Typography variant="h1" className='donate-title--text'>
              Donate to Plato's Peach Foundation for a Tax-Deductible Contribution to Support Education.
            </Typography>
            <Typography variant='h4' className='subtitle--text'>
              Plato's Peach Foundation is a 501(c)(3) nonprofit and nonpartisan organization. All donations are tax-deductible to the fullest extent of U.S. law.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box
            className='box--donate'>
            <Box sx={{ alignItems: "center" }}>
              <Button
                onClick={() => setSelected("o")}
                variant={selected === "o" ? "contained" : "outlined"}
                className="donationFrequency--button"
                disableRipple
              >One-Time</Button>
              <Button
                onClick={() => setSelected("m")}
                variant={selected === "m" ? "contained" : "outlined"}
                className="donationFrequency--button"
                disableRipple
              >Monthly</Button>
              <Button
                onClick={() => setSelected("a")}
                variant={selected === "a" ? "contained" : "outlined"}
                className="donationFrequency--button"
                disableRipple
              >Annually</Button>
            </Box>
            <Typography variant="h4" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>Choose Amount:</Typography>
            <Grid container sx={{ marginLeft: 0 }}>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Button
                  sx={{ borderRadius: 0, textTransform: "capitalize", marginRight: 2, marginBottom: 2, width: "100%" }}
                  onClick={() => setAmount(10)}
                  variant={amount === 10 ? "contained" : "outlined"}
                  disableRipple
                >$10</Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Button
                  sx={{ borderRadius: 0, textTransform: "capitalize", marginRight: 2, marginBottom: 2, width: "100%" }}
                  onClick={() => setAmount(20)}
                  variant={amount === 20 ? "contained" : "outlined"}
                  disableRipple
                >$20</Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Button
                  sx={{ borderRadius: 0, textTransform: "capitalize", width: "100%" }}
                  onClick={() => setAmount(30)}
                  variant={amount === 30 ? "contained" : "outlined"}
                  disableRipple
                >$30</Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Button
                  sx={{ borderRadius: 0, textTransform: "capitalize", width: "100%" }}
                  onClick={() => setAmount(100)}
                  variant={amount === 100 ? "contained" : "outlined"}
                  disableRipple
                >$100</Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Button
                  sx={{ borderRadius: 0, textTransform: "capitalize", width: "100%" }}
                  onClick={() => setAmount(200)}
                  variant={amount === 200 ? "contained" : "outlined"}
                  disableRipple
                >$200</Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Button
                  sx={{ borderRadius: 0, textTransform: "capitalize", width: "100%" }}
                  onClick={() => setAmount(500)}
                  variant={amount === 500 ? "contained" : "outlined"}
                  disableRipple
                >$500</Button>
              </Grid>
            </Grid>
            <Typography variant="h4" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>Name a Fair Price:</Typography>
            <TextField
              type='number'
              fullWidth
              value={amount}
              onChange={(e) => namePrice(e)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <Typography variant="h2" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>
              ${amount}/{selected === "o" ? "Once" : selected === "m" ? "Month" : "Year"}
            </Typography>
            {selected !== "o" && <Typography variant="body2" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>You can stop recurring payments at any time.</Typography>}
            <Button
              variant="contained"
              className="donate-now--button"
            >
              Donate Now
            </Button>
          </Box>
        </Grid>
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