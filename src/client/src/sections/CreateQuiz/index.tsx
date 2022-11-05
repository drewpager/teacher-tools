import React, { useState, ChangeEvent, SyntheticEvent } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { useCreateQuizMutation } from '../../graphql/generated';
import { Box, TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Typography, Tooltip, Button } from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material';
import './createQuiz.scss';

export const CreateQuiz = () => {
  const [questions, setQuestions] = useState();
  const [quiz, setQuiz] = useState();
  const [answerType, setAnswerType] = useState<string | undefined>("TRUEFALSE");
  const [answerTrue, setAnswerTrue] = useState<boolean>(true);
  const [addQuestion, setAddQuestion] = useState<number>(0)
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

  const updateAnswers = (t: ChangeEvent<HTMLInputElement>) => {
    console.log(t.target.value)
  }

  return (
    <Box sx={{ marginTop: 10, maxWidth: "50%" }}>
      <h1>Create Assessment</h1>
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
        <FormControl className='quiz__answerType'>
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
          <div className="quiz__answerArea" onClick={() => setAnswerTrue(!answerTrue)}>
            <div className="quiz__answers">
              <Tooltip title="Click To Switch">
                <CheckCircle color={"primary"} sx={{ marginRight: 1 }} /> 
              </Tooltip>
              <Typography>{!answerTrue ? "True" : "False"}</Typography>
            </div>
            <div className="quiz__answers">
              <Tooltip title="Click To Switch">
                <Cancel sx={{ color: "primary", marginRight: 1 }} /> 
              </Tooltip>
              <Typography>{answerTrue ? "True" : "False"}</Typography>
            </div>
          </div>
        ) : <></>}
        {answerType === "MULTIPLECHOICE" ? (
          <div className="quiz__multiAnswerArea">
          <div className="quiz__multiAnswers">
            <Tooltip title="Add Correct Answer">
              <CheckCircle color={"primary"} sx={{ marginRight: 1 }} /> 
            </Tooltip>
            <TextField 
              label="Enter Correct Answer"
              fullWidth
              sx={{ marginTop: 2 }}
              onChange={updateAnswers}
            />
          </div>
          <div className="quiz__multiAnswers">
            <Tooltip title="Add Incorrect Answer">
              <Cancel sx={{ color: "black", marginRight: 1 }} /> 
            </Tooltip>
            <TextField 
              label="Enter Incorrect Answer"
              fullWidth
              sx={{ marginTop: 2 }}
              onChange={updateAnswers}
            />
          </div>
          <div className="quiz__multiAnswers">
            <Tooltip title="Click To Switch">
              <Cancel sx={{ color: "black", marginRight: 1 }} /> 
            </Tooltip>
            <TextField 
              label="Enter Incorrect Answer"
              fullWidth
              sx={{ marginTop: 2 }}
              onChange={updateAnswers}
            />
          </div>
          <div className="quiz__multiAnswers">
            <Tooltip title="Click To Switch">
              <Cancel sx={{ color: "black", marginRight: 1 }} /> 
            </Tooltip>
            <TextField 
              label="Enter Incorrect Answer"
              fullWidth
              sx={{ marginTop: 2 }}
              onChange={updateAnswers}
            />
          </div>
        </div>
        ) : <></>}
        {addQuestion ? <QuizQuestion key={addQuestion} /> : <></>}
        {/* {addQuestion ? Array(addQuestion).map((_, i) => (<QuizQuestion />)) : <></>} */}
        <Button onClick={() => setAddQuestion(addQuestion + 1)}>Add Question</Button>
      </form>
    </Box>
  )
}