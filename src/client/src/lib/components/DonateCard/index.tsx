import React, { useState } from 'react';
import { Box, Button, Modal, Grid, Typography } from '@mui/material';
import { SignupModal } from '../SignupModal';
import { Viewer } from '../../../graphql/generated';
import theme from '../../../theme';

interface props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const DonateCard = ({ viewer, setViewer }: props) => {
  const [promptOpen, setPromptOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("o");
  const [amount, setAmount] = useState<number>(10);

  const handlePromptClose = () => {
    setPromptOpen(false);
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

  return (
    <Box sx={{ marginTop: 1 }}>
      <Modal
        open={promptOpen}
        onClose={handlePromptClose}
      >
        <Box className="signupmodal--box">
          <SignupModal setViewer={setViewer} />
        </Box>
      </Modal>
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
        {/* <Typography variant="h4" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>Name a Fair Price:</Typography>
            <TextField
              type='number'
              fullWidth
              value={amount}
              onChange={(e) => namePrice(e)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            /> */}
        <Typography variant="h2" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>
          ${amount}/{selected === "o" ? "Once" : selected === "m" ? "Month" : "Year"}
        </Typography>
        {selected !== "o" && <Typography variant="body2" color={theme.palette.info.dark} sx={{ fontWeight: 600, marginTop: 2 }}>You can stop recurring payments at any time. Free Signup/Account Required.</Typography>}
        {viewer.id === null && selected !== "o" ? (
          <Button
            variant='contained'
            onClick={() => setPromptOpen(true)}
            className='donate-now--button'
          >Donate Now</Button>
        ) : (
          <Button
            variant="contained"
            className="donate-now--button"
            disabled={amount <= 0}
            onClick={() => handleDonateNow(amount, selected)}
            disableRipple
          >
            Donate Now
          </Button>
        )}
        <Button
          variant="contained"
          sx={{ backgroundColor: "#57996A", color: "#fff", marginTop: 2, textTransform: "capitalize", borderRadius: 0 }}
          href='https://donate.stripe.com/9AQ7tv3kN6tudrOaF9'
          target="_blank"
          disableRipple
        >
          Custom Amount
        </Button>
      </Box>
    </Box>
  )
}