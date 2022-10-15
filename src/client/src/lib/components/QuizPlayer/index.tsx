import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { Quiz } from '../../../graphql/generated';

interface Props {
  quiz: Quiz
}

export const QuizPlayer = ({ quiz }: Props) => {
  
  const title = quiz.title;

  return (
    <FormControl>
      <form>
      <h1>{title}</h1>
      {quiz.questions.map((i) => (
        <>
          <h2>{i.question}</h2>
          <RadioGroup>
            {i.answerOptions?.map((t) => (
              <FormControlLabel value={t?.answerText} label={`${t?.answerText}`} control={<Radio />} />
            ))}
          </RadioGroup>
        </>
      ))}
      <Button type="submit">Check Answers</Button>
    </form>
    </FormControl>
  )
}