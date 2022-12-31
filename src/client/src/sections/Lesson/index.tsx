import React from 'react';
import { useLessonQuery } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { LinearProgress, Box, Chip } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { VideoPlayer } from '../../lib/components';
import './lessonPage.scss';

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
    <Box className="lesson--page">
      <h1>{lesson?.title}</h1>
      {lesson?.category?.map((i, ind) => (<Chip variant='outlined' label={i} key={ind} color="error" className='lesson--category'/>))}
      <VideoPlayer url={`${lesson?.video}`} />
      {/* <img src={`${lesson?.image}`} alt={`Text overlay of ${lesson?.title}`} /> */}
    </Box>
  )
}