import { Card, Typography, Avatar, Box, Button, Divider } from '@mui/material';
// import { User as UserData } from '../../../../lib/graphql/queries/User/__generated__/User'
import { User } from '../../../../graphql/generated';
import './userProfile.scss';

interface Props {
  user: User;
  viewerIsUser: boolean;
}

export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const additionalDetailsSection = viewerIsUser ? (
    <>
      <Divider sx={{ margin: 1 }} />
      <Typography variant="h5" className="user--text-details">Additional Details</Typography>
      <Typography variant='body1' className="user--text-details">Ready to bring engaging lesson plans to the classroom? Sign up now!</Typography>
      <Button className='stripe--button' variant="contained">Connect with Stripe!</Button>
      <Typography variant='body1' className="user--text-details">We use <a href="https://stripe.com/en-US/connect" target="_blank" rel="noopener noreferrer"> Stripe</a> to make payments seamless and secure.</Typography>
    </>
  ) : null;
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
          <Typography className="user--text-details">bookmarks: {user.bookmarks?.length}</Typography>
          {additionalDetailsSection}
        </Card>
      </Box>
    </>
  )
}