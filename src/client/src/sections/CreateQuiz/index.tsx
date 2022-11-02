import React, { useState, ChangeEvent } from 'react';
import { useCreateQuizMutation } from '../../graphql/generated';
import { Box, TextField } from '@mui/material'

export const CreateQuiz = () => {
  const [questions, setQuestions] = useState();
  const [quiz, setQuiz] = useState();
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
      </form>
    </Box>
  )
}