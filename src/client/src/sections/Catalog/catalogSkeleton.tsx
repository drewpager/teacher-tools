import React from 'react';
import { Grid, Box, Skeleton, Typography, Chip, Switch } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { Footer } from '../../lib/components';
import './catalogSkeleton.scss';
// import './catalog.scss';

export const CatalogSkeleton = () => {
  return (
    <Box>
      <Grid container maxWidth={"100%"} overflow={"hidden"}>
        <Grid item sm={12} md={3} lg={3}>
          <Box className="catalogGrid--categories">
            <TreeView>
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
            </TreeView>
          </Box>
        </Grid>
        <Grid item sm={12} md={9} lg={9}>
          <Box className="catalogBackground" sx={{ marginBottom: "80px" }}>
            <h1 className="catalogTitle">Catalog <Chip label={"xxx"} color="primary" size="medium" /></h1>
            <Box sx={{ display: 'flex' }}>
              <Switch /><Skeleton variant="text" sx={{ fontSize: "1rem", width: "150px" }} />
            </Box>
            <div className="skeletonGrid" style={{ width: "100%" }}>
              <div className="skeletonGrid--item1">
                <Skeleton variant='rectangular' width="100%" height={100} />
              </div>
              <div className="skeletonGrid--item2">
                <Skeleton variant='rectangular' width="100%" height={100} />
              </div>
              <div className="skeletonGrid--item3">
                <Skeleton variant='rectangular' width="100%" height={100} />
              </div>
            </div>
            <div className="catalogGrid--item">
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} /><Chip label={"xxx"} color="primary" size="medium" />
              <div className="skeletonGrid--item">
                <Skeleton variant='rectangular' width="100%" height={100} />
                <Skeleton variant='rectangular' width="100%" height={100} />
                <Skeleton variant='rectangular' width="100%" height={100} />
              </div>
            </div>
            <div className="catalogGrid--item">
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} /><Chip label={"xxx"} color="primary" size="medium" />
              <Skeleton variant='rectangular' width="100%" height={100} />
            </div>
          </Box>
        </Grid>
      </Grid>
      {/* <Footer viewer={viewer} /> */}
    </Box>
  )
}