import React, { useState, SyntheticEvent } from 'react';
import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Grid, Card, CardMedia, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Lesson } from '../../../graphql/generated';
import { VideoPlayer } from '../index';
// import { Playlist } from '../../../graphql/generated';

// NOTE: Pass lessons object instead of single lesson for Accordion to work correctly
export const PlaylistCard = (lesson: Lesson) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    console.log(expanded)
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box sx={{ marginBottom: 1, maxWidth: "100%" }}>
          <Accordion expanded={expanded === `${lesson.title}`} onChange={handleChange(`${lesson.title}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${lesson.id}bh-content`}
              id={`panel${lesson.id}bh-header`}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {lesson.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'black' }}>
                {lesson.category?.map((i) => (<Chip label={i} sx={{ marginRight: 1 }}/>))}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{lesson.startDate} to {lesson.endDate}</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box>
          {expanded ? (
          <Card sx={{ position: 'absolute', top: 160, maxWidth: "100%" }}>
            <CardMedia>
              <VideoPlayer url={`${lesson.video}`} />
            </CardMedia>
          </Card>
          ) : (
            <></>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}