import React from 'react';
import { Box } from '@mui/material';
import { QuizCreate } from '../QuizCreate';
import { Footer } from '../../lib/components';
import { Viewer } from '../../graphql/generated';

type Props = {
  viewer: Viewer;
}

export const CreateQuiz = ({ viewer }: Props) => {
  return (
    <Box>
      <QuizCreate viewer={viewer} />
      <Footer viewer={viewer} />
    </Box>
  )
}