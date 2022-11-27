import React, { useReducer, useState, useRef, useEffect, ChangeEvent, SyntheticEvent, FormEvent, MouseEventHandler } from 'react';
import { QuizQuestion } from '../CreateQuiz/QuizQuestion';
import { useCreateQuizMutation, Viewer, Quiz, Questions, AnswerOptions, AnswerFormat } from '../../graphql/generated';
import { TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Typography, Tooltip, Button } from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material';
import { DisplayError } from '../../lib/utils';
import '../CreateQuiz/createQuiz.scss';

type Props = {
  viewer: Viewer
}

type quizInput = {
  title: string,
  questions: [{
    answerType?: AnswerFormat | undefined,
    question?: string,
    answerOptions?: AnswerOptions[]
  }],
  creator: string,
}

type Action =
  | { type: 'CREATOR', field: string, payload: string | undefined }  
  | { type: 'UPDATE_FORM_FIELD', field: string, payload: string }
  | { type: 'UPDATE_QUESTIONS_OBJ', field: string, payload: string | undefined }
  | { type: 'UPDATE_TYPE_ANSWER', field: string, payload: AnswerFormat | undefined }
  | { type: 'UPDATE_ANSWER_OPTIONS', field: string, payload: AnswerOptions[] };

const initialInput: quizInput = {
  title: "",
  questions: [{
    answerType: undefined, 
    question: "",
    answerOptions: [{ isCorrect: undefined, answerText: undefined }]
  }],
  creator: ""
}

const reducer = (state: quizInput, action: Action): quizInput => {
  switch (action.type) {
    case 'UPDATE_FORM_FIELD':
      return {
        ...state,
        [action.field]: action.payload
      }
    case 'UPDATE_TYPE_ANSWER':
      return {
        ...state,
        questions: [{ 
          ...state.questions, 
          answerType: action.payload 
        }]
      }
    case 'UPDATE_QUESTIONS_OBJ':
      return {
        ...state,
        questions: [{
          ...state.questions, 
          question: action.payload 
        }]
      }
    case 'UPDATE_ANSWER_OPTIONS':
      return {
        ...state,
        questions: [{ 
          ...state.questions, 
          answerOptions: action.payload
        }]
      }
    case 'CREATOR':
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
  const [answerTrue, setAnswerTrue] = useState<boolean>(true);
  const [addQuestion, setAddQuestion] = useState<number>(0);
  const [answerOptions, setAnswerOptions] = useState<Array<AnswerOptions>>([])

  useEffect(() => {
    if (viewer && viewer.id) {
      dispatch({
        type: 'CREATOR',
        field: 'creator',
        payload: viewer.id
      })
    }
  }, [viewer])  

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'UPDATE_FORM_FIELD',
      field: e.target.name,
      payload: e.target.value
    })
  }

  const handleAnswerOptions = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    setAnswerOptions([{
      isCorrect: e.currentTarget.id === "true" ? true : false,
      answerText: e.target.value
     }, ...answerOptions])
  }


  const handleAnswerChecked = (e: SyntheticEvent<Element, Event>) => {
    let str1 = e?.currentTarget?.getAttribute("value")?.charAt(0).toUpperCase()
    let str2 = e?.currentTarget?.getAttribute("value")?.toLowerCase().slice(1, )
    
    if (str1 && str2) {
      let answerType = `${str1+str2}`
      dispatch({
        type: 'UPDATE_TYPE_ANSWER',
        field: 'answerType',
        payload: answerType === "Multiplechoice" ? AnswerFormat.Multiplechoice : AnswerFormat.Truefalse
      })
    }
  }

  const handleQuestionsUpdate = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'UPDATE_QUESTIONS_OBJ',
      field: e.target.name,
      payload: e.target.value
    })
  }


  const handleNewQuestion = () => {
    setAddQuestion(addQuestion + 1)

    dispatch({
      type: 'UPDATE_ANSWER_OPTIONS',
      field: 'answerOptions',
      payload: answerOptions
    })
  }

  // const handleQuizCreation = () => {
  
  // }
  // console.log(answerTrue)
  console.log(state);
  console.log(answerOptions);
  
  return (
    <div className='quiz__box'>
      <h1>Create Assessment</h1>
      <p>Title: {state.title}</p>
      <p>Question: {state.questions[addQuestion].question}</p>
      <p>AnswerType: {state.questions[addQuestion].answerType}</p>
      <form>
        <TextField 
          label="Enter Assessment Title"
          name="title"
          fullWidth
          onChange={(e) => handleFormChange(e)}
        />
        <TextField 
          label="Enter First Question"
          fullWidth
          name="question"
          sx={{ marginTop: 2 }}
          onChange={(e) => handleQuestionsUpdate(e)}
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
        {state.questions[addQuestion].answerType === 'TRUEFALSE' ? (
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
        {state.questions[addQuestion].answerType === 'MULTIPLECHOICE' ? (
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
              onChange={(e) => handleAnswerOptions(e)}
              id="true"
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
              onChange={(e) => handleAnswerOptions(e)}
              id="false"
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
              onChange={(e) => handleAnswerOptions(e)}
              id="false"
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
              onChange={(e) => handleAnswerOptions(e)}
              id="false"
            />
          </div>
        </div>
        ) : <></>}
        {/* { Array.from({ length: addQuestion }).map((_, i) => ( <QuizQuestion quest={questions} quizStart={quiz} key={i} /> )) } */}
        {/* <Button onClick={(e) => saveQuestion(e)}>Add Question</Button> */}
        <Button onClick={handleNewQuestion}>New Question</Button> 
        <Button onClick={() => {}}>Create</Button>
      </form>
    </div>
  )
}