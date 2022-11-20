import React, { useReducer, useState, useRef, useEffect, ChangeEvent, SyntheticEvent, FormEvent } from 'react';
import { QuizQuestion } from '../CreateQuiz/QuizQuestion';
import { useCreateQuizMutation, Viewer, Quiz, Questions, AnswerOptions, AnswerFormat } from '../../graphql/generated';
import { TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Typography, Tooltip, Button } from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material';
import { DisplayError } from '../../lib/utils';
import '../CreateQuiz/createQuiz.scss';
import { valueFromAST } from 'graphql';

type Props = {
  viewer: Viewer
}

type quizInput = {
  title: string,
  questions: Questions[],
  creator: string,
}

const initialInput: quizInput = {
  title: "",
  questions: [{
    // answerType: AnswerFormat.Truefalse || AnswerFormat.Multiplechoice,
    answerType: AnswerFormat.Truefalse, 
    answerOptions: [],
    question: ""
  }],
  creator: ""
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'UPDATE_FORM_FIELD':
      return {
        ...state,
        [action.field]: action.payload
      }
    case 'UPDATE_ANSWER_TYPE':
      return {
        ...state,
        [action.field]: action.payload
      }
    case 'creator':
      return {
        ...state,
        [action.field]: action.payload
      }
    default:
      return state;
  }
}

export const QuizCreate = ({ viewer }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialInput);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'UPDATE_FORM_FIELD',
      field: e.target.name,
      payload: e.target.value
    })
    
    dispatch({
      type: 'creator',
      field: 'creator',
      payload: viewer.id
    })
  }

  const handleAnswerChecked = (e: SyntheticEvent<Element, Event>) => {
    dispatch({
      type: 'UPDATE_ANSWER_TYPE',
      field: 'answerType',
      payload: e.currentTarget.getAttribute("value")
    })
  }

  // const handleQuizCreation = () => {
  
  // }
  console.log(state)
  
  return (
    <div className='quiz__box'>
      <h1>Create Assessment</h1>
      <p>Title: {state.title}</p>
      <p>Question: {state.question}</p>
      <p>AnswerType: {state.answerType}</p>
      <form>
        <TextField 
          label="Enter Assessment Title"
          name="title"
          value={state.title}
          fullWidth
          onChange={(e) => handleFormChange(e)}
        />
        <TextField 
          label="Enter First Question"
          fullWidth
          name="question"
          value={state.question}
          sx={{ marginTop: 2 }}
          onChange={(e) => handleFormChange(e)}
        />
        <FormControl className='quiz__answerType'>
          <FormLabel id="demo-radio-buttons-group-label">Answer Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="TRUEFALSE"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="TRUEFALSE"
              control={<Radio />} 
              label="True/False"
              onChange={(e) => handleAnswerChecked(e)} 
            />
            <FormControlLabel
              value="MULTIPLECHOICE"
              control={<Radio />} 
              label="Multiple Choice" 
              onChange={(e) => handleAnswerChecked(e)} 
            />
          </RadioGroup>
        </FormControl>
        {/* {state.questions.answerType === "TRUEFALSE" ? (
          <div className="quiz__answerArea" onClick={() => setAnswerTrue(!answerTrue)}>
            <div className="quiz__answers">
              <Tooltip title="Click To Switch">
                <CheckCircle color={"primary"} sx={{ marginRight: 1 }} /> 
              </Tooltip>
              <Typography>{answerTrue ? "True" : "False"}</Typography>
            </div>
            <div className="quiz__answers">
              <Tooltip title="Click To Switch">
                <Cancel sx={{ color: "primary", marginRight: 1 }} /> 
              </Tooltip>
              <Typography>{!answerTrue ? "True" : "False"}</Typography>
            </div>
          </div>
        ) : <></>}
        {state.questions.answerType === "MULTIPLECHOICE" ? (
          <div className="quiz__multiAnswerArea">
          <div className="quiz__multiAnswers">
            <Tooltip title="Add Correct Answer">
              <CheckCircle color={"primary"} sx={{ marginRight: 1 }} /> 
            </Tooltip>
            <TextField 
              label="Enter Correct Answer"
              fullWidth
              sx={{ marginTop: 2 }}
              name="answerOptions"
              onChange={(e) => handleFormChange(e)}
              id="corr"
            />
          </div>
          <div className="quiz__multiAnswers">
            <Tooltip title="Add Incorrect Answer">
              <Cancel sx={{ color: "black", marginRight: 1 }} /> 
            </Tooltip>
            <TextField 
              label="Enter Wrong Answer"
              fullWidth
              sx={{ marginTop: 2 }}
              name="answerOptions"
              onChange={(e) => handleFormChange(e)}
              id="incorr"
            />
          </div>
          <div className="quiz__multiAnswers">
            <Tooltip title="Click To Switch">
              <Cancel sx={{ color: "black", marginRight: 1 }} /> 
            </Tooltip>
            <TextField 
              label="Enter Wrong Answer"
              fullWidth
              sx={{ marginTop: 2 }}
              name="answerOptions"
              onChange={(e) => handleFormChange(e)}
              id="incorr"
            />
          </div>
          <div className="quiz__multiAnswers">
            <Tooltip title="Click To Switch">
              <Cancel sx={{ color: "black", marginRight: 1 }} /> 
            </Tooltip>
            <TextField 
              label="Enter Wrong Answer"
              fullWidth
              sx={{ marginTop: 2 }}
              name="answerOptions"
              onChange={(e) => handleFormChange(e)}
              id="incorr"
            />
          </div>
        </div>
        ) : <></>} */}
        {/* { Array.from({ length: addQuestion }).map((_, i) => ( <QuizQuestion quest={questions} quizStart={quiz} key={i} /> )) } */}
        {/* <Button onClick={(e) => saveQuestion(e)}>Add Question</Button>
        <Button onClick={handleNewQuestion}>New Question</Button> */}
        <Button onClick={() => {}}>Create</Button>
      </form>
    </div>
  )
}