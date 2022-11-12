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
  const [question, setQuestion] = useState<string>("")
  const [questions, setQuestions] = useState<Array<Questions>>([]);
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
    let quizTitle = t.target.value;
    setTitle(quizTitle)
  }

  const handleAnswerChange = (e: SyntheticEvent) => {
    let type = e.currentTarget.getAttribute("value");
    setEnumAnswerType(type === "TRUEFALSE" ? AnswerFormat.Truefalse : AnswerFormat.Multiplechoice);
    setAnswerType(type?.toLocaleUpperCase());
  }

  const updateQuestion = (t: ChangeEvent<HTMLInputElement>) => {
    t.preventDefault();
    let newQuestion = t.target.value;
    setQuestion(newQuestion)
  }


  const updateAnswers = (t: ChangeEvent<HTMLInputElement>) => {
    if (answerType === "TRUEFALSE") {
      let answer = answerType && answerTrue ? [{ isCorrect: true, answerText: "True" }, { isCorrect: false, answerText: "False" }] : [{ isCorrect: true, answerText: "False" }, { isCorrect: false, answerText: "True" }];
      setAnswers([...answer]);
    }

    if (answerType === 'MULTIPLECHOICE') {
      t.preventDefault();
      let corrAnswer = t.target.id === "corr";
      let answerText = t.target.value;
      let answer = corrAnswer && answerText ? { isCorrect: true, answerText: answerText, } : { isCorrect: false, answerText: answerText }
      setAnswers([...answers, answer])
    }

    setQuiz({
      title: title,
      questions: [{
        question: question,
        answerOptions: answers,
        answerType: enumAnswerType
      }],
      creator: `${viewer.id}`
    })
  }
  
  // console.log(answers)
  console.log(title)
  console.log(question)
  console.log(answers)
  console.log(enumAnswerType)
  console.log(viewer.id)

  const saveQuestion = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (answerType === "TRUEFALSE") {
      let answer = answerType && answerTrue ? [{ isCorrect: true, answerText: "True" }, { isCorrect: false, answerText: "False" }] : [{ isCorrect: true, answerText: "False" }, { isCorrect: false, answerText: "True" }];
      setAnswers([...answer]);
    }

    setQuiz({
      title: title,
      questions: [{
        question: question,
        answerOptions: answers,
        answerType: enumAnswerType
      }],
      creator: `${viewer.id}`
    })
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
          // onChange={updateTitle}
          onInput={updateTitle}
        />
        <TextField 
          label="Enter First Question"
          fullWidth
          sx={{ marginTop: 2 }}
          onChange={() => updateQuestion}
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
              onChange={() => updateAnswers}
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
              onChange={() => updateAnswers}
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
              onChange={() => updateAnswers}
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
              onChange={() => updateAnswers}
              id="incorr"
            />
          </div>
        </div>
        ) : <></>}
        { Array.from({ length: addQuestion }).map((_, i) => ( <QuizQuestion key={i} /> )) }
        <Button onClick={(e) => saveQuestion(e)}>Add Question</Button>
        <Button onClick={() => setAddQuestion(addQuestion + 1)}>New Question</Button>
        <Button onClick={() => {}}>Create</Button>
      </form>
    </div>
  )
}

  // "input": {
  //   "title": "Testing Quiz Mutation",
  //   "questions": [
  //     {
  //       "question": "What is a mutation?",
  //       "answerOptions": [
  //         {
  //           "isCorrect": true,
  //           "answerText": "it's a graphql write operation"
  //         },
  //         {
  //           "isCorrect": false,
  //           "answerText": "It's a gene editing tool"
  //         }
  //       ],
  //       "answerType": "TRUEFALSE"
  //     },
  //     {
  //       "question": "What is Drew's Middle Name?",
  //       "answerOptions": [
  //         {
  //           "isCorrect": true,
  //           "answerText": "Thomas"
  //         },
  //         {
  //           "isCorrect": false,
  //           "answerText": "Roger"
  //         },
  //         {
  //           "isCorrect": false,
  //           "answerText": "Joe"
  //         },
  //         {
  //           "isCorrect": false,
  //           "answerText": "Jim"
  //         }
  //       ],
  //       "answerType": "MULTIPLECHOICE"
  //     }
  //   ],
  //   "creator": "116143759549242008910"
  // }