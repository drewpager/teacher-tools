import { useEffect } from 'react';
import { Card, Typography, Avatar, Box, Button, Divider } from '@mui/material';
// import { User as UserData } from '../../../../lib/graphql/queries/User/__generated__/User'
import { User, useAddPaymentMutation } from '../../../../graphql/generated';
import './userProfile.scss';
import { DisplayError } from '../../../../lib/utils';
import { FeedbackModal } from '../../../Contact/FeedbackModal';
import { Helmet } from 'react-helmet';
// require("dotenv").config();
interface Props {
  user: User;
  viewerIsUser: boolean;
}

const formatStripeAmount = (amount: number | undefined | null) => {
  if (amount !== undefined && !!amount) {
    return `$${(amount / 100).toFixed(2)}`;
  }
  return "$0.00";
}

const formatStripeDate = (date: number | undefined | null) => {
  if (date !== undefined && !!date) {
    return new Date(date * 1000).toLocaleDateString();
  }
  return "N/A";
}

// const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_S_CLIENT_ID}&scope=read_write`

export const UserProfile = ({ user, viewerIsUser }: Props) => {

  const [addPayment, { data, loading, error }] = useAddPaymentMutation({
    variables: {
      id: user.id,
    }
  });

  useEffect(() => {
    addPayment({
      variables: {
        id: `${user.id}`,
      }
    });
  }, [user, addPayment]);

  // if (data) {
  //   console.log(user.package);
  // }

  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log("Error: ", error);
  }

  // const redirectToStripe = () => {
  //   window.location.href = stripeAuthUrl;
  // }

  const stripeError = new URL(window.location.href).searchParams.get("stripe_error");

  const additionalDetailsSection = viewerIsUser ? (
    <>
      <Divider sx={{ margin: 1 }} />
      <Typography variant="h5" className="user--text-details">Additional Details</Typography>
      <Typography variant='body1' className="user--text-details">Ready to bring engaging lesson plans to the classroom? Sign up now!</Typography>
      <Button className='stripe--button' variant="contained" href="/pricing">View Pricing!</Button>
      <Typography variant='body1' className="user--text-details">We use <a href="https://stripe.com/en-US/connect" target="_blank" rel="noopener noreferrer"> Stripe</a> to make payments seamless and secure.</Typography>
    </>
  ) : null;

  const subscriberSection = (
    <>
      <Divider sx={{ margin: 1 }} />
      <Typography variant="h5" className="user--text-details">Donor Details</Typography>
      <Typography variant='body1' className="user--text-details">{formatStripeAmount(user.package?.amount)} per {user.package?.cadence}</Typography>
      {(user?.package?.status === "trialing") ? (
        <>
          <Typography variant='body1' className="user--text-details">Status: {user.package?.status}</Typography>
          {/* <Typography variant='body1' className="user--text-details">Trial Ends: {formatStripeDate(user.package?.trialEnd)}</Typography> */}
        </>
      ) : (
        <>
          <Typography variant='body1' className="user--text-details">Status: {user.package?.status}</Typography>
          {user.package?.status !== "Inactive" && <Typography variant='body1' className="user--text-details">Thank you for being a donor since {formatStripeDate(user.package?.since)}!</Typography>}
        </>
      )}
      {/* <Button className='stripe--button' variant="contained" onClick={() => handleSubscription(user)}>Edit Subscription!</Button> */}
      {user.package?.status !== "Inactive"
        // https://billing.stripe.com/p/login/5kA8zH7cq8eIdWMcMM || https://billing.stripe.com/p/login/test_dR65mV9VY2ty3fifYY
        ? (<Button className='stripe--button' variant="contained" href='https://billing.stripe.com/p/login/5kA8zH7cq8eIdWMcMM'>Manage Donations</Button>)
        : (<Button className='stripe--button' variant="contained" href="/pricing">View Pricing!</Button>)
      }
    </>
  )
  return (
    <>
      <Box className="user--text">
        <Helmet>
          <title>{`${user.name}'s Profile | Plato's Peach`}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <FeedbackModal />
        <h1>User Profile</h1>
        {/* <Card sx={{ width: "90vw", boxShadow: 1, padding: 5 }}> */}
        <Card className="user-profile--card">
          <Avatar src={user.avatar} sx={{ width: 56, height: 56, marginLeft: "40%" }} />
          <Divider sx={{ margin: 1 }} />
          <Typography variant="h5" className="user--text-details">Details</Typography>
          <Typography className="user--text-details">Name: {user.name}</Typography>
          <Typography className="user--text-details">Email: {user.contact}</Typography>
          {(user.paymentId !== "undefined") ? subscriberSection : additionalDetailsSection}
          {/* {additionalDetailsSection} */}
          {stripeError && <DisplayError title="Failed to connect to stripe! Please try again" />}
        </Card>
      </Box>
    </>
  )
}