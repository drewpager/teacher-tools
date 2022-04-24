import React from 'react';
import { Grid, Card, Box, Skeleton } from '@mui/material';


export const CardGridSkeleton = () => {
  return (
    <Box>
      <Grid container>
          <Grid item spacing={4} lg={4} md={6} sm={12} xs={12}>
            <Card sx={{ margin: 2}}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Card>
            <Card sx={{ margin: 2}}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Card>
            <Card sx={{ margin: 2}}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Card>
            <Card sx={{ margin: 2}}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Card>
            <Card sx={{ margin: 2}}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Card>
            <Card sx={{ margin: 2}}>
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Card>
        </Grid>
      </Grid>
    </Box>
  )
}