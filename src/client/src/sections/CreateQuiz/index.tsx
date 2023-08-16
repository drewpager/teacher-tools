import React from 'react';
import { Box } from '@mui/material';
import { QuizCreate } from '../QuizCreate';
import { Footer } from '../../lib/components';
import { Viewer } from '../../graphql/generated';
import { Helmet } from 'react-helmet';

type Props = {
  viewer: Viewer;
}

export const CreateQuiz = ({ viewer }: Props) => {
  return (
    <Box>
      <Helmet>
        <title>{`Free Custom Quiz Assessment Generator | Plato's Peach`}</title>
        <meta name="description" content={`Generate custom quizzes and assessments to leverage throughout interactive lesson plans with this free tool from Plato's Peach.`} />
      </Helmet>
      <QuizCreate viewer={viewer} />
      <Footer viewer={viewer} />
    </Box>
  )
}