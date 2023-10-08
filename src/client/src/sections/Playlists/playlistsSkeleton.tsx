import React from "react"
import { Card, Skeleton, Grid, Box } from "@mui/material"
import { Footer } from "../../lib/components";

export const PlaylistsSkeleton = () => {
  return (
    <div>
      <Box sx={{ marginTop: "7rem" }}>
        <h2 style={{ marginLeft: "2rem" }}>Playlist Catalog</h2>
        <Grid container>
          {Array.from(new Array(21)).map((item, index) => (
            <Grid item lg={4} md={6} sm={12} xs={12} key={index}>
              <Skeleton variant="rectangular" height="100px" sx={{ m: "1rem" }}/>
              <br />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}