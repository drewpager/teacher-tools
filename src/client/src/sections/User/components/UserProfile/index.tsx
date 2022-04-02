import { Card, Typography, Avatar, Box } from '@mui/material';
import { User } from '../../../../lib/graphql/queries/User/__generated__/User'

export const UserProfile = ({ user }: User) => {
  return (
    <>
      <Box sx={{ marginLeft: 5 }}>
        <h1>User Profile</h1>
        <Card sx={{ minWidth: 275, width: 1/4, boxShadow: 1, padding: 5, margin: 5 }}>
          <Avatar src={user.avatar} sx={{ position: "center" }} />
          <Typography>Name: {user.name}</Typography>
          <Typography>Email: {user.contact}</Typography>
        </Card>
      </Box>
    </>
  )
}