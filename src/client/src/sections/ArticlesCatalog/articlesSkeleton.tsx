import React from "react"
import { Card, Skeleton, Grid, Box } from "@mui/material"
import { Footer } from "../../lib/components";
import "./articlesCatalogStyle.scss";

export const ArticlesSkeleton = () => {
  return (
    <div>
      <Box sx={{ marginTop: "7rem" }}>
        <Skeleton variant="rounded" height="35px" width="208px" className="articles--chip" />
        <Box className="articles--header">
          <h1>Articles</h1>
          <Skeleton variant="rectangular" height="60px" width="239px" sx={{ m: "1rem" }} />
        </Box>
        <Grid container>
          {Array.from(new Array(21)).map((item, index) => (
            <Grid item lg={4} md={6} sm={12} xs={12} key={index}>
              <Skeleton variant="rectangular" height="100px" sx={{ m: "1rem" }} />
              <br />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}