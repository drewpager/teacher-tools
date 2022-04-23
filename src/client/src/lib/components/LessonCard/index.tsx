import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
interface Props {
  lesson: {
    id: string;
    category: string[];
    title: string;
    meta: string;
    video: string;
    image: string;
    startDate: number;
    endDate: number;
    creator: string;
  }
}

export const LessonCard = ({ lesson }: Props) => {
  const { title, category, video, image, startDate, endDate } = lesson;
  return (
    <Grid container spacing={3}>
      <Grid item xs={1} md={2}>
        <Card sx={{ minWidth: 275, width: 1/4, boxShadow: 1, padding: 5, margin: 5 }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="h6">{category}</Typography>
          <Typography variant="body2">{startDate}</Typography>
          <Typography variant="body2">{endDate}</Typography>
        </Card>
      </Grid>
    </Grid>
  )
}