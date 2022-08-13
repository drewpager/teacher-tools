import React, { useState, SyntheticEvent } from 'react';
import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Grid, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Playlist } from '../../../graphql/generated';
import { VideoPlayer } from '../index';
// import { Playlist } from '../../../graphql/generated';
interface Props {
  playlist: Playlist
}

// NOTE: Pass lessons object instead of single lesson for Accordion to work correctly
export const PlaylistCard = ({ playlist }: Props) => {
// export const PlaylistCard = (lesson: Lesson) => {
  const [expanded, setExpanded] = useState<string | false>(`${playlist.plan[0]?.id}`);

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <h1>{playlist.name}</h1>
        {playlist.plan.map((lesson, id) => (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Accordion expanded={expanded === `${lesson?.id}`} onChange={handleChange(`${lesson?.id}`)} sx={{ margin: 1 }} key={id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${lesson?.id}bh-content`}
                  id={`panel${lesson?.id}bh-header`}
                >
                  <Typography>
                    {lesson?.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'black' }}>
                    {lesson?.category?.map((i, index) => (<Chip label={i} sx={{ marginRight: 1 }} color="primary" key={index}/>))}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{lesson?.startDate} to {lesson?.endDate}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={8}>
              {expanded === `${lesson?.id}` ? (
                  <VideoPlayer url={`${lesson?.video}`} key={lesson?.id} />
                ) : (
                  <></>
                )}
            </Grid>
          </Grid>
        ))}
    </Box>
  )
}