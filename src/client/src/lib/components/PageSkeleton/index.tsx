import { Skeleton, Card, Divider, Box, Grid, Typography } from '@mui/material';
import './userPageSkeleton.scss';

export const PageSkeleton = () => {
  return (
    <>
      <Box className="user--skeleton">
      <h1>User Profile</h1>
      <Card sx={{ width: 350, boxShadow: 1, padding: 5 }}>
          <Skeleton variant="circular" width={56} height={56} />
          <Divider />
          <Typography variant="h5">Details</Typography>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Divider />
          <Typography variant="h5">Additional Details</Typography>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" width={200} height={50} sx={{ marginLeft: "10%", borderRadius: 3 }} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
      </Card>
      <br />
      <br />
      <h2>Lessons</h2>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Skeleton variant="rectangular" width={350} height={200}/>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Skeleton variant="rectangular" width={350} height={200}/>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Skeleton variant="rectangular" width={350} height={200}/>
        </Grid>
      </Grid>
      <h2>Playlists</h2>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Skeleton variant="rectangular" width={350} height={200} />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Skeleton variant="rectangular" width={350} height={200} />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Skeleton variant="rectangular" width={350} height={200} />
        </Grid>
      </Grid>
      
      </Box>
    </>
  )
}