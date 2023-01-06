import React from 'react';
import { LinearProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuizQuery } from '../../graphql/generated';
import { QuizPlayer } from '../../lib/components';
import { DisplayError } from '../../lib/utils';

export const Quiz = () => {
  const params = useParams();
  const { data, loading, error } = useQuizQuery({
    variables: {
      id: `${params.id}`
    }
  })

  if (loading) {
    return (
      <LinearProgress />
    )
  }

  if (error) {
    <DisplayError title='Failed to load this Quiz'/>
  }

  const quiz = data && data.quiz ? data.quiz : null;

  if (quiz) {
    console.log(quiz)
    return (
      <Box sx={{ marginTop: 7 }}>
        <QuizPlayer quiz={quiz} />
      </Box>
    )
  }

  return (
    <Box sx={{ marginLeft: 5 }}>
      <h2>No Quiz By This ID</h2>
    </Box>
  )
}