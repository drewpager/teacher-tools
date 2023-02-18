import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { Quiz } from '../../../graphql/generated';
import { Formik, Field, Form } from "formik";

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
  }

  const handleSelect = (value: string) => {
    setChecked(true);
    setQuizState([...quizState, value])
  }

  const handleCorrectness = (e: string) => {
    setChecked(true);
    setQuizState([...quizState, e])
  }

  // TODO: 
  // 1. Randomize order of answerOptions
  // 2. Check answers + Show Errors/Correct
  // Considerations:
  // 1. Allow teachers to set # of attempts before locking in grade?

  return (
    <Box>
      <h1>{title}</h1>
      <Formik
        initialValues={{
          question: {
            answers: [""],
          }
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Box>
            {quiz.questions.map((i, index) => (
              <>
                <div id="my-radio-group" key={index}>{i.question}</div>
                <div role="group" aria-labelledby="my-radio-group">
                  <Form>
                    {i.answerType === "MULTIPLECHOICE" && i.answerOptions?.map((op, id) => (
                      <label>
                        <Field type="radio" name={`question.answers[${i}]`} value={op?.answerText} key={id} />
                        {op?.answerText}
                      </label>
                    ))}
                    {i.answerType === "TRUEFALSE" && i.answerOptions?.map((od, ip) => (
                      <div>
                        <label key={index}>
                          <Field type="radio" name="answers" value={od?.isCorrect} key={ip} />
                          True
                        </label>
                        <label>
                          <Field type="radio" name="answers" value={!od?.isCorrect} key={ip} />
                          False
                        </label>
                      </div>
                    ))}
                  </Form>
                </div>
              </>
            ))}
            <button type="submit">Submit</button>
          </Box>
        )}
      </Formik>
      {/* {quiz.questions.map((i, indy) => (
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
        <Button type="button" onClick={handleCheck}>Check Answers</Button> */}
    </Box>
  )
}