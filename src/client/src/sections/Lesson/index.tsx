import React from 'react';
import { LESSON } from '../../lib/graphql/queries/';
import { 
  Lesson as LessonData,
  LessonVariables
} from '../../lib/graphql/queries/Lesson/__generated__/Lesson';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

interface MatchParams {
  id: string;
}

export const Lesson = () => {
  const params = useParams()
  const { loading, data, error } = useQuery<LessonData, LessonVariables>(LESSON, {
    variables: {
      id: params.id ? params.id : "10101"
    }
  });

  if (loading) {
    return (
      <h2>Loading...</h2>
    )
  }

  if (error) {
    return (
      <h2>ERROR!</h2>
    )
  }

  const lesson = data ? data.lesson : null;
  
  return (<h1>Lesson: {lesson}</h1>)
}