import React from 'react';
import { LESSON } from '../../lib/graphql/queries/';
import { 
  Lesson as LessonData,
  LessonVariables
} from '../../lib/graphql/queries/Lesson/__generated__/Lesson';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';

export const Lesson = () => {
  const params = useParams()
  const { loading, data, error } = useQuery<LessonData, LessonVariables>(LESSON, {
    variables: {
      id: `${params.id}`
    }
  });

  if (loading) {
    return (
      <LinearProgress color='success'/>
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
    <>
      <h1>Lesson: {lesson?.id}</h1>
      <img src={`${lesson?.image}`} alt={`Text overlay of ${lesson?.title}`} />
      <h2>{lesson?.title}</h2>
    </>
  )
}