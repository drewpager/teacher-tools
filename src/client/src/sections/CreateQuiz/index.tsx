import React, { useState, ChangeEvent, SyntheticEvent } from 'react';
import { useCreateQuizMutation } from '../../graphql/generated';
import { Box, TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { EnumValueNode } from 'graphql';
import { AnswerFormat } from '../../graphql/generated';

export const CreateQuiz = () => {
  const [questions, setQuestions] = useState();
  const [quiz, setQuiz] = useState();
  const [answerType, setAnswerType] = useState<string | undefined>("TRUEFALSE");
  const [title, setTitle] = useState<string>("");

  // const [createQuiz] = useCreateQuizMutation({
  //   variables: {
  //     input: quiz
  //   }
  // })

  const updateTitle = (t: ChangeEvent<HTMLInputElement>) => {
    t.preventDefault();
    let title = t.target.value;
    setTitle(title)
  }

  const handleAnswerChange = (e: SyntheticEvent) => {
    let type = e.currentTarget.getAttribute("value");
    setAnswerType(type?.toLocaleUpperCase());
  }

  const updateQuestions = (t: ChangeEvent<HTMLInputElement>) => {

  }

  return (
    <Box sx={{ marginTop: 10, maxWidth: "50%" }}>
      <h1>Quiz Creation Page</h1>
      <form>
        <TextField 
          label="Enter Quiz Title"
          fullWidth
          onChange={updateTitle}
        />
        <TextField 
          label="Enter First Question"
          fullWidth
          sx={{ marginTop: 2 }}
          onChange={updateQuestions}
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Answer Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="TRUEFALSE"
            name="radio-buttons-group"
          >
            <FormControlLabel value="TRUEFALSE" control={<Radio />} label="True/False" onChange={(e) => handleAnswerChange(e)} />
            <FormControlLabel value="MULTIPLECHOICE" control={<Radio />} label="Multiple Choice" onChange={(e) => handleAnswerChange(e)} />
          </RadioGroup>
        </FormControl>
        {answerType === "TRUEFALSE" ? (
          <h2>True False!</h2>
        ) : <></>}
        {answerType === "MULTIPLECHOICE" ? (
          <h2>Multiple Choice!</h2>
        ) : <></>}
      </form>
    </Box>
  )
}