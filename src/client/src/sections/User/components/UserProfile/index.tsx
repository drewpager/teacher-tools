import { Card, Typography, Avatar, Box, Button, Divider } from '@mui/material';
// import { User as UserData } from '../../../../lib/graphql/queries/User/__generated__/User'
import { User } from '../../../../graphql/generated';
import './userProfile.scss';
import { DisplayError } from '../../../../lib/utils';
// require("dotenv").config();
interface Props {
  user: User;
  viewerIsUser: boolean;
}

const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_S_CLIENT_ID}&scope=read_write`

export const UserProfile = ({ user, viewerIsUser }: Props) => {

  const redirectToStripe = () => {
    window.location.href = stripeAuthUrl;
  }

  const handleSubscription = async (user: User) => {
    const res = await fetch('/create-customer-portal-session', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customer: `${user.paymentId}` })
    });
    const content = await res.json()

    console.log(content);
  }
  const stripeError = new URL(window.location.href).searchParams.get("stripe_error");

  const additionalDetailsSection = viewerIsUser ? (
    <>
      <Divider sx={{ margin: 1 }} />
      <Typography variant="h5" className="user--text-details">Additional Details</Typography>
      <Typography variant='body1' className="user--text-details">Ready to bring engaging lesson plans to the classroom? Sign up now!</Typography>
      <Button className='stripe--button' variant="contained" onClick={redirectToStripe}>Connect with Stripe!</Button>
      <Typography variant='body1' className="user--text-details">We use <a href="https://stripe.com/en-US/connect" target="_blank" rel="noopener noreferrer"> Stripe</a> to make payments seamless and secure.</Typography>
    </>
  ) : null;

  const subscriberSection = (
    <>
      <Divider sx={{ margin: 1 }} />
      <Typography variant="h5" className="user--text-details">Subscription Details</Typography>
      <Typography variant='body1' className="user--text-details">Thank you for subscribing!</Typography>
      <Button className='stripe--button' variant="contained" onClick={() => handleSubscription(user)}>Edit Subscription!</Button>
      <Button className='stripe--button' variant="contained" href='https://billing.stripe.com/p/login/test_dR65mV9VY2ty3fifYY'>Manage Subscription!</Button>
    </>
  )
  return (
    <>
      <Box className="user--text">
        <h1>User Profile</h1>
        <Card sx={{ width: 350, boxShadow: 1, padding: 5 }}>
          <Avatar src={user.avatar} sx={{ width: 56, height: 56, marginLeft: "40%" }} />
          <Divider sx={{ margin: 1 }} />
          <Typography variant="h5" className="user--text-details">Details</Typography>
          <Typography className="user--text-details">Name: {user.name}</Typography>
          <Typography className="user--text-details">Email: {user.contact}</Typography>
          <Typography className="user--text-details">Bookmarks: {user.bookmarks?.length}</Typography>
          {(user.paymentId !== "") ? subscriberSection : additionalDetailsSection}
          {/* {additionalDetailsSection} */}
          {stripeError && <DisplayError title="Failed to connect to stripe! Please try again" />}
        </Card>
      </Box>
    </>
  )
}