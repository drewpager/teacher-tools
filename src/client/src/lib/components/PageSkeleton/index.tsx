import { Skeleton, Card, Divider, Box, Grid } from '@mui/material';

export const PageSkeleton = () => {
  return (
    <>
      <Box sx={{ marginLeft: 5 }}>
      <h1>User Profile</h1>
      <Card sx={{ minWidth: 430, minHeight: 454, width: 1/3, boxShadow: 1, padding: 5, margin: 5 }}>
          <Skeleton variant="circular" width={56} height={56} />
          <Divider />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Divider />
      </Card>
      <h2>Lessons</h2>
      <Grid container>
        <Grid item xs={1} sm={2} lg={3} xl={3}>
          <Skeleton variant="rectangular" width={300} height={264}/>
        </Grid>
        <Grid item xs={1} sm={2} lg={3} xl={3}>
          <Skeleton variant="rectangular" width={300} height={264}/>
        </Grid>
        <Grid item xs={1} sm={2} lg={3} xl={3}>
          <Skeleton variant="rectangular" width={300} height={264}/>
        </Grid>
      </Grid>
      
      </Box>
    </>
  )
}