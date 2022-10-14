import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { Quiz } from '../../../graphql/generated';

interface Props {
  quiz: Quiz
}

export const QuizPlayer = ({ quiz }: Props) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("Choose Wisely My Friend.");
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    let quizQs: Array<string> = [];

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
    }
  
    function combineShuffle(q: Array<string>) {
      // Push the correct answer and options to an array
      q.map((t) => {
        quizQs.push(t)
      })
      // Shuffle said array
      shuffle(quizQs)
    }
  }, [])

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>, quiz: Quiz) => {
    e.preventDefault();

    setValue(e.target.value);

    if (value === quiz.questions[0].correctAnswer) {
      setError(false)
      setScore(score + 1)
    }

    return score;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, correct: string) => {
    e.preventDefault();

    setValue(e.target.value);

    if (value !== correct) {
      setError(false)
      setScore(score + 1)
      setHelperText('Nice Work!')
    }

    if (value === correct) {
      setError(true)
      setScore(score - 1)
      setHelperText('Not that one...')
    }

    return score;
  }

  const title = quiz.title;

  return (
    <FormControl>
      <form>
      <h1>{title}</h1>
      {quiz.questions.map((i) => (
        <>
          <h2>{i.question}</h2>
          <RadioGroup onChange={(e: ChangeEvent<HTMLInputElement>, correct: string) => handleChange(e, correct = `${i.correctAnswer}`)}>
            {i.answerOptions?.map((t) => (
              <FormControlLabel value={t} label={`${t}`} control={<Radio />} />
            ))}
            <FormControlLabel value={i.correctAnswer} label={`${i.correctAnswer}`} control={<Radio />} />
          </RadioGroup>
        </>
      ))}
      <h2>
      {Math.round(score / quiz.questions.length * 100)}%
      </h2>
      {/* <Button type="submit">Check Answers</Button> */}
    </form>
    </FormControl>
  )
}