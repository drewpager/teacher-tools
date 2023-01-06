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
      {quiz.questions.map((i, indy) => (
        <>
          <RadioGroup key={indy}>
            <h2>{i.question}</h2>
            {i.answerOptions?.map((t, index) => (
              <FormControlLabel value={t?.answerText} label={`${t?.answerText}`} key={index} control={<Radio />} />
            ))}
          </RadioGroup>
        </>
      ))}
      <Button type="submit">Check Answers</Button>
    </form>
    </FormControl>
  )
}