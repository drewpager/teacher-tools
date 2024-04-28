import React from 'react';
import { Grid, Box, Skeleton, Typography, Chip, Switch } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { Footer } from '../../lib/components';
import './catalogSkeleton.scss';
// import './catalog.scss';

export const CatalogSkeletonList = () => {
  return (
    <Box width="100%">
      <Grid container overflow={"hidden"}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Box className="catalogGrid--categories">
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <Box className="catalogBackground" sx={{ marginBottom: "80px" }}>
            <Box className="catalogSkeleton--header">
              <h1 className="catalogTitle">Documentary Catalog <Chip label={"1,000"} color="primary" size="medium" /></h1>
              <Skeleton variant='rectangular' width="236px" height={59} className="skeleton--search" />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Switch checked /><Skeleton variant="text" sx={{ fontSize: "1rem", width: "150px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: "20px", marginLeft: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: "20px", marginLeft: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: "20px", marginLeft: "1rem" }} />
            </Box>
            <div>
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px", height: "50px" }} /><Chip label={"xxx"} color="primary" size="medium" />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            </div>
            <div>
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px", height: "50px" }} /><Chip label={"xxx"} color="primary" size="medium" />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", height: "50px" }} />
            </div>
          </Box>
        </Grid>
      </Grid>
      {/* <Footer viewer={viewer} /> */}
    </Box>
  )
}