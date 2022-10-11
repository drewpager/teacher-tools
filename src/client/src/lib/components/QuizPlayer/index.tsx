import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { Quiz } from '../../../graphql/generated';

interface Props {
  quiz: Quiz
}

export const QuizPlayer = ({ quiz }: Props) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("Choose Wisely My Friend.");

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>, quiz: Quiz) => {
    e.preventDefault();

    setValue(e.target.value);

    if (value === quiz.questions[0].correctAnswer) {
      setError(false)
      setHelperText("Correct. Nice work!")
    }
  }

  const title = quiz.title;

  return (
    <form>
      <h1>{title}</h1>
      {quiz.questions.map((i) => (
        <>
          <h2>{i.question}</h2>
          <ul>
            <li>{i.answerOptions}</li>
          </ul>
        </>
      ))}
      <Button type="submit">Check Answers</Button>
    </form>
  )
}