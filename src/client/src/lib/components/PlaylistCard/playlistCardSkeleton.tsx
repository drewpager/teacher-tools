import React from 'react';
import { Skeleton, Box, Grid, ListItem } from '@mui/material';
import { Timeline, TimelineItem, TimelineDot, TimelineSeparator, TimelineConnector, TimelineContent } from '@mui/lab';
import './playlistcard.scss';

export const PlaylistCardSkeleton = () => {
  return (
    <>
      <Box className="title-button--section">
        <Skeleton variant="text" height={130} width={350} sx={{ mr: "1rem" }} />
        <Skeleton variant="circular" height={50} width={50} sx={{ mr: "1rem" }} />
        <Skeleton variant="rectangular" height={50} width={50} />
      </Box>
      <Grid container className='playlistcard--grid'>
        <Timeline position="left" className='playist--grid__timeline'>
          {Array.from(Array(5).keys()).map((item, id) => (
            <TimelineItem key={id}>
              <ListItem disableGutters>
                <Skeleton variant="text" height={60} width={150} sx={{ ml: 1 }} />
              </ListItem>
              <TimelineSeparator sx={{ mx: 0.5, my: 0.4 }}>
                <TimelineDot sx={{ mx: 0, my: 2 }}>
                  <Skeleton variant="circular" height={30} width={30} />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent><Skeleton variant="text" height={60} width={100} /></TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        <Grid className='playlistcard--grid__video'>
          <Box sx={{ margin: 2 }}>
            <Skeleton variant="rectangular" width={"80%"} height={600} />
          </Box>
          <Box sx={{ margin: 2 }}>
            <Skeleton variant="rectangular" width={"15%"} height={50} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}