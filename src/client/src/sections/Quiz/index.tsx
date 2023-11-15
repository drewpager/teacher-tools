import React from 'react';
import { LinearProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuizQuery } from '../../graphql/generated';
import { QuizPlayer, Footer } from '../../lib/components';
import { DisplayError } from '../../lib/utils';
import { Helmet } from 'react-helmet';

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
    <DisplayError title='Failed to load this Quiz' />
  }

  const quiz = data && data.quiz ? data.quiz : null;

  if (quiz) {
    return (
      <Box sx={{ marginTop: 7 }}>
        <Helmet>
          <title>{`${quiz?.title} | Plato's Peach`}</title>
          <meta name="description" content={`The ${quiz?.title} assessment quiz includes ${quiz.questions.length} questions.`} />
          {!quiz.public && (<meta name="robots" content="noindex" />)}
        </Helmet>
        <QuizPlayer quiz={quiz} />
        <Footer />
      </Box>
    )
  }

  return (
    <Box sx={{ marginLeft: 5 }}>
      <h2>No Quiz By This ID</h2>
      <Footer />
    </Box>
  )
}