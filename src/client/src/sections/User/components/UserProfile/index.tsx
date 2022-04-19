import { Card, Typography, Avatar, Box, Button, Divider } from '@mui/material';
// import { User as UserData } from '../../../../lib/graphql/queries/User/__generated__/User'
import { User } from '../../../../graphql/generated';

interface Props {
  user: User;
  viewerIsUser: boolean;
}

export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const additionalDetailsSection = viewerIsUser ? (
    <>
      <Divider sx={{ margin: 1 }}/>
      <Typography variant="h5" sx={{ color: "primary" }}>Additional Details</Typography>
      <Typography variant='body1'>Ready to bring engaging lesson plans to the classroom? Sign up now!</Typography>
      <Button variant="contained" sx={{ margin: 1 }}>Connect with Stripe!</Button>
      <Typography variant='body1'>We use <a href="https://stripe.com/en-US/connect" target="_blank" rel="noopener noreferrer"> Stripe</a> to make payments seamless and secure.</Typography>
    </>
  ) : null;
  return (
    <>
      <Box sx={{ marginLeft: 5 }}>
        <h1>User Profile</h1>
        <Card sx={{ minWidth: 275, width: 1/3, boxShadow: 1, padding: 5, margin: 5 }}>
          <Avatar src={user.avatar} sx={{ width: 56, height: 56, marginLeft: "40%" }} />
          <Divider sx={{ margin: 1 }}/>
          <Typography variant="h5" sx={{ color: "primary" }}>Details</Typography>
          <Typography>Name: {user.name}</Typography>
          <Typography>Email: {user.contact}</Typography>
          {additionalDetailsSection}
        </Card>
      </Box>
    </>
  )
}