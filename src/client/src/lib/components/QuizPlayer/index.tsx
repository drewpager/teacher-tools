import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { Quiz } from '../../../graphql/generated';

interface Props {
  quiz: Quiz
}

export const QuizPlayer = ({ quiz }: Props) => {
  const [quizState, setQuizState] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean>(false);

  const title = quiz.title;

  const handleCheck = () => {
    const quizKey: any[] = []
    quiz.questions.map((v, i) => {
      quizKey.push(v.answerOptions?.find((q) => q?.isCorrect))
    })
    const correct = quizState.filter((e, i) => e.matchAll(quizKey[i].isCorrect))
    console.log("Quiz Key: ", correct)
  }

  const handleSelect = (value: string) => {
    console.log(value)
    setChecked(true);
    setQuizState([...quizState, value])
  }

  const handleCorrectness = (e: string) => {
    console.log(e)
    setChecked(true);
    setQuizState([...quizState, e])
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
            <RadioGroup>
              <h2>{i.question}</h2>
              {i.answerType === "MULTIPLECHOICE" && i.answerOptions?.map((t, index) => (
                <FormControlLabel value={t?.answerText} label={`${t?.answerText}`} key={index} control={<Radio onChange={(e) => handleSelect(e.target.value)} />} />
              ))}
              {i.answerType === "TRUEFALSE" && i.answerOptions?.map((f, id) => (
                <>
                  <FormControlLabel value={f?.isCorrect?.valueOf()} label={`${f?.isCorrect?.valueOf()}`} key={id} control={<Radio onChange={(e) => handleCorrectness(e.target.value)} />} sx={{ border: checked ? "3px solid black" : undefined }} />
                  <FormControlLabel value={!f?.isCorrect?.valueOf()} label={`${!f?.isCorrect?.valueOf()}`} key={id + 1} control={<Radio onChange={(e) => handleCorrectness(e.target.value)} />} />
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