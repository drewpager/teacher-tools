import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Box, Skeleton, Button, Typography } from '@mui/material';
import '../HomeDetails/homedetails.scss';

export const HomeDetailsSkeleton = () => {
  return (
    <Box>
      <h2 className="homeDetails--box">Short History Documentaries</h2>
      <Grid container>
        <Grid item lg={2.4} md={2.4} sm={4} xs={4}>
          <Card sx={{ marginLeft: 2, marginRight: 2, borderRadius: "15px" }}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Card>
        </Grid>
        <Grid item lg={2.4} md={2.4} sm={4} xs={4}>
          <Card sx={{ marginLeft: 2, marginRight: 2, borderRadius: "15px" }}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Card>
        </Grid>
        <Grid item lg={2.4} md={2.4} sm={4} xs={4}>
          <Card sx={{ marginLeft: 2, marginRight: 2, borderRadius: "15px" }}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Card>
        </Grid>
        <Grid item lg={2.4} md={2.4} sm={0} xs={0}>
          <Card sx={{ marginLeft: 2, marginRight: 2, borderRadius: "15px" }}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Card>
        </Grid>
        <Grid item lg={2.4} md={2.4} sm={0} xs={0}>
          <Card sx={{ marginLeft: 2, marginRight: 2, borderRadius: "15px" }}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Card>
        </Grid>
      </Grid>
      <div className="viewAll--button">
        <Link to="/catalog" style={{ textDecoration: "none" }}>
          <Button variant='outlined'>
            <Typography variant="button">View All</Typography>
          </Button>
        </Link>
      </div>
    </Box>
  )
}