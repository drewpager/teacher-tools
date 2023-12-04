import React from 'react';
import { Card, Box, CardContent, Typography, IconButton, Chip, Grid } from '@mui/material';
import { titleCase, formatDate } from '../../utils';
import { UseVideoModal } from '../VideoModal';
import { Lesson } from '../../../graphql/generated';

export const CreatePlaylistCard = (props: Lesson) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#535ac8', borderRadius: 5, height: "auto", width: "95%", margin: "0.25rem 0.5rem" }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h3" style={{ color: "#FAF9F6" }}>
          {props.title}
        </Typography>
        <Typography variant="subtitle1" color="#e0e0e0" component="div">
          {(props.startDate === props.endDate) ? (formatDate(props.startDate)) : (`${formatDate(props.startDate)} to ${formatDate(props.endDate)}`)}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <IconButton aria-label="play/pause" sx={{ color: "#FAF9F6" }}>
          <UseVideoModal video={`${props.video}`} />
        </IconButton>
        {props.category?.map((c, idx) => (
          idx !== 0 && <Chip label={titleCase(`${c}`)} color="primary" key={idx} />
        ))}
        <Chip label="Lesson" color="secondary" sx={{ ml: 1 }} />
      </Box>
    </Card>
  )
}