import React from "react"
import { Card, Skeleton, Grid, Box } from "@mui/material"
import { Footer } from "../../lib/components";
import "./playlistsCatalogStyle.scss";

export const PlaylistsSkeleton = () => {
  return (
    <div>
      <Box sx={{ marginTop: "7rem" }}>
        <Skeleton variant="rounded" height="35px" width="208px" className="playlists--chip" />
        <Box className="playlists--header">
          <h1>Lesson Plans</h1>
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