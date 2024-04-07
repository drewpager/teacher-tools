import React from "react"
import { Card, Skeleton, Grid, Box } from "@mui/material"
import { Footer } from "../../lib/components";
import "./playlistsCatalogStyle.scss";

export const PlaylistsSkeleton = () => {
  return (
    <div>
      <Box sx={{ marginTop: "7rem" }}>
        <Skeleton
          variant="rounded"
          height="35px"
          width="208px"
          className="playlistsSkeleton--chip"
        />
        <Box className="playlists--header">
          <Skeleton variant="rectangular" height="60px" width="239px" />
          <h1 className='lessonPlan--h1'>Lesson Plans</h1>
        </Box>
        <Grid container>
          {/* Mobile Filter Treatment - Dropdown Menus */}
          <Grid item xs={12} sm={12} md={12} lg={0} className="lessonPlans--dropdownFilter">
            <Skeleton variant="rectangular" width={"33%"} height={65} sx={{ marginLeft: "1rem", marginRight: "1rem" }} />
            <Skeleton variant="rectangular" width={"33%"} height={65} sx={{ marginRight: "1rem" }} />
            <Skeleton variant="rectangular" width={"33%"} height={65} sx={{ marginRight: "1rem" }} />
          </Grid>

          {/* Desktop Filter Treatment - Left Rail Radio Button Groups */}
          <Grid item xs={12} sm={12} md={12} lg={3} className="lessonPlans--filterRadio">
            <Skeleton variant="rectangular" width={210} height={"100%"} sx={{ marginLeft: "2rem" }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9} className="lessonPlans--grid">
            {Array.from(new Array(21)).map((item, index) => (
              <Grid item lg={4} md={6} sm={12} xs={12} key={index}>
                <Skeleton variant="rectangular" height="100px" sx={{ m: "1rem" }} />
                <br />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}