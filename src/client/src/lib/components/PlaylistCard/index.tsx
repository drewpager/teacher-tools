import React, { useState, SyntheticEvent } from 'react';
import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Grid, Card, CardMedia } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Lesson } from '../../../graphql/generated';
// import { Playlist } from '../../../graphql/generated';

export const PlaylistCard = (lesson: Lesson) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  }
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box sx={{ marginBottom: 1, maxWidth: 500 }}>
          <Accordion expanded={expanded === `panel${lesson.id}`} onChange={handleChange(`panel${lesson.id}`)}>
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
                {lesson.video}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{lesson.startDate} to {lesson.endDate}</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box>
          {expanded ? (
          <Card sx={{ justifySelf: 'top', marginBottom: 1 }}>
            <CardMedia 
              component="video"
              width="350"
              src={`${lesson.video}`}
            />
          </Card>
          ) : (
            <></>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}