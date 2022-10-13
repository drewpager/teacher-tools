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
  const qMap: Array<string> = [];

  function shuffle(array: Array<string>) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return (
    <FormControl>
      <h1>{title}</h1>
      {quiz.questions.map((i) => (
        <>
          <h2>{i.question}</h2>
          <RadioGroup>
            {qMap.push(`${i.correctAnswer}`)}
            {i.answerOptions?.map((q) => {
              qMap.push(`${q}`)
            })}
            {shuffle(qMap)}
            {qMap.map((t) => (
              <FormControlLabel value={t} label={`${t}`} control={<Radio />} />
            ))}
          </RadioGroup>
        </>
      ))}
      <Button type="submit">Check Answers</Button>
    </FormControl>
  )
}