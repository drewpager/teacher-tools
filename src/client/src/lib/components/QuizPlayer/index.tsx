import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { Quiz } from '../../../graphql/generated';

interface Props {
  quiz: Quiz
}

export const QuizPlayer = ({ quiz }: Props) => {
  const [quizState, setQuizState] = useState<boolean[]>([]);

  const title = quiz.title;

  const handleCheck = () => {

  }

  const handleSelect = (z: any) => {
    setQuizState([...quizState, z.isCorrect])
  }

  // TODO: 
  // 1. Randomize order of answerOptions
  // 2. Check answers + Show Errors/Correct
  // Considerations:
  // 1. Allow teachers to set # of attempts before locking in grade?

  return (
    <FormControl>
      <form>
        <h1>{title}</h1>
        {console.log(quiz)}
        {quiz.questions.map((i, indy) => (
          <>
            <RadioGroup key={indy}>
              <h2>{i.question}</h2>
              {i.answerType === "MULTIPLECHOICE" && i.answerOptions?.map((t, index) => (
                <FormControlLabel value={t?.answerText} label={`${t?.answerText}`} key={index} control={<Radio onSelect={(t) => handleSelect(t)} />} />
              ))}
              {i.answerType === "TRUEFALSE" && i.answerOptions?.map((f, index) => (
                <>
                  <FormControlLabel value={f?.isCorrect?.valueOf()} label={`${f?.isCorrect?.valueOf()}`} key={index} control={<Radio onSelect={(f) => handleSelect(f)} />} />
                  <FormControlLabel value={!f?.isCorrect?.valueOf()} label={`${!f?.isCorrect?.valueOf()}`} key={index} control={<Radio onSelect={(f) => handleSelect(f)} />} />
                </>
              ))}
              {console.log(quizState)}
            </RadioGroup>
          </>
        ))}
        <Button type="button" onClick={handleCheck}>Check Answers</Button>
      </form>
    </FormControl>
  )
}