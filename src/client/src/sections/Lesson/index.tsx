import React from 'react';
import { useLessonQuery } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { LinearProgress, Box } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { VideoPlayer } from '../../lib/components';

export const Lesson = () => {
  const params = useParams()
  const { loading, data, error } = useLessonQuery({
    variables: {
      id: `${params.id}`
    }
  });

  if (loading) {
    return (
      <LinearProgress />
    )
  }

  if (error) {
    return (
      <>
        <DisplayError title='Failed to load lesson' />
      </>
    )
  }

  const lesson = data ? data.lesson : null;
  
  return (
    <Box sx={{ marginLeft: 5 }}>
      <h1>Lesson: {lesson?.id}</h1>
      <img src={`${lesson?.image}`} alt={`Text overlay of ${lesson?.title}`} />
      <h2>{lesson?.title}</h2>
      <VideoPlayer url={`${lesson?.video}`} id={`${lesson?.id}`} />
    </Box>
  )
}