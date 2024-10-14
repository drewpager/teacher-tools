import React from "react"
import { Card, Skeleton, Box, Divider } from "@mui/material"
import { Footer } from "../../lib/components";
import "./blogHub.scss";

export const BlogHubSkeleton = () => {
  return (
    <div>
      <Box className="blog-hub--box">
        <h1>Plato's Peach Learn & Teach Center</h1>
      </Box>
      <Box className="blog-hub--recent">
        <h2>Recent Posts</h2>
        <Divider />
      </Box>
      <Box className="card-container">
        <Skeleton variant="rectangular" height={346} className="blog-card" />
        <Skeleton variant="rectangular" height={346} className="blog-card" />
        <Skeleton variant="rectangular" height={346} className="blog-card" />
        <Skeleton variant="rectangular" height={346} className="blog-card" />
      </Box>
      <Footer />
    </div>
  )
}