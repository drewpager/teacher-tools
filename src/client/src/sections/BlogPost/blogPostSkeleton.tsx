import React from "react"
import { Card, Skeleton, Grid, Box } from "@mui/material"
import { Footer, CTA } from "../../lib/components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./blogPost.scss";

export const BlogPostSkeleton = () => {
  return (
    <div>
      <Box className="blog-post--header">
        <Box className="blog-post--header-left">
          <Skeleton variant="text" width="50%" height="50px" />
          <Skeleton variant="text" width="75%" height="100px" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="circular" width="50px" height="50px" />
          <Skeleton variant="text" width="25%" />
        </Box>
        <Box className="blog-post--header-right">
          <Skeleton variant="rounded" height="250px" width="auto" />
        </Box>
      </Box>
      <Box className="blog-post--body">
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <br />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <br />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <br />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <br />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" height="40px" />
      </Box>
      <CTA />
      <Footer />
    </div>
  )
}