import { Skeleton, Card, Divider, Box } from '@mui/material';

export const PageSkeleton = () => {
  return (
    <>
      <Box sx={{ marginLeft: 5 }}>
      <h1>User Profile</h1>
      <Card sx={{ minWidth: 275, width: 1/3, boxShadow: 1, padding: 5, margin: 5 }}>
          <Skeleton variant="circular" width={56} height={56} />
          <Divider />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Divider />
        </Card>
      </Box>
    </>
  )
}