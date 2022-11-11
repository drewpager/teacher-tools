import React, { useState, useRef, useEffect, ChangeEvent, SyntheticEvent, FormEvent } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { useCreateQuizMutation, Viewer, Quiz, Questions, AnswerOptions, AnswerFormat } from '../../graphql/generated';
import { Box, TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Typography, Tooltip, Button } from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material';
import { DisplayError } from '../../lib/utils';
import './createQuiz.scss';
interface Props {
  viewer: Viewer;
}

type quizInput = {
  title: string,
  questions: Questions[],
  creator: string,
}

const initialInput: quizInput = {
  title: "",
  questions: [],
  creator: ""
}

export const CreateQuiz = ({ viewer }: Props) => {
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [answers, setAnswers] = useState<Array<AnswerOptions>>([]);
  const [quiz, setQuiz] = useState<quizInput>(initialInput);
  const [answerType, setAnswerType] = useState<string | undefined>("TRUEFALSE");
  const [answerTrue, setAnswerTrue] = useState<boolean>(true);
  const [enumAnswerType, setEnumAnswerType] = useState<AnswerFormat>(AnswerFormat.Truefalse);
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
    setQuiz({
      ...quiz,
      title: title
    })
  }

  const handleAnswerChange = (e: SyntheticEvent) => {
    let type = e.currentTarget.getAttribute("value");
    setEnumAnswerType(type === "TRUEFALSE" ? AnswerFormat.Truefalse : AnswerFormat.Multiplechoice);
    setAnswerType(type?.toLocaleUpperCase());
  }

  const updateAnswers = (t: ChangeEvent<HTMLInputElement>) => {
    if (answerType === "TRUEFALSE") {
      let answer = answerTrue ? { answerText: "True", isCorrect: true } : { answerText: "False", isCorrect: true };
      setAnswers([...answers, answer]);
    }

    if (answerType === "MULTIPLECHOICE") {
      t.preventDefault()
      let isTrue = t.currentTarget.getAttribute("label")?.includes("correct");
      console.log(isTrue);
      let answerText = t.target.value;
      let answer = answerText ? { answerText: answerText, isCorrect: true} : { answerText: answerText, isCorrect: false }
      setAnswers([...answers, answer])
    }
  }

  const updateQuestions = (t: ChangeEvent<HTMLInputElement>) => {
    t.preventDefault();
    let question = t.target.value;
    setQuestions([...questions, question])

    setQuiz({
      ...quiz,
      questions: [{
        question: question,
        answerOptions: [...answers],
        answerType: enumAnswerType,
      }],
      creator: `${viewer.id}`
    })
  }
  // console.log(answerType)
  // console.log(viewer.id)
  // console.log("Title: ", title)
  // console.log("Questions: ", questions)
  // console.log("Answers: ", answers)
  // console.log(questions)
  console.log(quiz)

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
  
  }

  if (!viewer.id) {
    return (
      <div>
        <DisplayError title="Must be logged in to create a quiz!" />
        <Box sx={{ marginTop: 15 }}>
          <h2>Please Log In Before Creating an Assessment!</h2>
          <Button href='/login' variant='contained'>Go To Log In Page</Button>
        </Box>
      </div>
    )
  }

  return (
    <div className='quiz__box'>
      <h1>Create Assessment</h1>
      <form>
        <TextField 
          label="Enter Assessment Title"
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
              label="Enter Wrong Answer"
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
              label="Enter Wrong Answer"
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
              label="Enter Wrong Answer"
              fullWidth
              sx={{ marginTop: 2 }}
              onChange={updateAnswers}
            />
          </div>
        </div>
        ) : <></>}
        { Array.from({ length: addQuestion }).map((_, i) => ( <QuizQuestion key={i} /> )) }
        <Button onClick={() => setAddQuestion(addQuestion + 1)}>Add Question</Button>
        <Button onSubmit={handleSubmit}>Create</Button>
      </form>
    </div>
  )
}