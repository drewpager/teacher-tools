import React, { useState, SyntheticEvent } from 'react';
import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Grid, Card, CardMedia, Chip } from '@mui/material';
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
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    console.log(isExpanded)
  };

  return (
    <Box>
    <h1>{playlist.name}</h1>
      {playlist.plan.map((lesson, id) => (
        <Grid container spacing={2}>
          <Grid item xs={2} md={4} key={id}>
          <Box sx={{ marginBottom: 1, minWidth: 150 }}>
            <Accordion expanded={expanded === `${lesson?.id}`} onChange={handleChange(`${lesson?.id}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${lesson?.id}bh-content`}
                id={`panel${lesson?.id}bh-header`}
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {lesson?.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'black' }}>
                  {lesson?.category?.map((i) => (<Chip label={i} sx={{ marginRight: 1 }} color="primary" />))}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{lesson?.startDate} to {lesson?.endDate}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
        <Grid item xs={10} md={8}>
          <Box>
            {expanded ? (
            <Card sx={{ position: 'absolute', top: "16%", right: "2%", left: "40%" }}>
              <CardMedia>
                <VideoPlayer url={`${lesson?.video}`} />
              </CardMedia>
            </Card>
            ) : (
              <></>
            )}
          </Box>
        </Grid>
      </Grid>
      ))}
    </Box>
  )
}