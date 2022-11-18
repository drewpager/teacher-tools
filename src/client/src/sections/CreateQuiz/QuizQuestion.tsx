import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import { TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Typography, Tooltip } from '@mui/material'
import { Questions, AnswerOptions, AnswerFormat } from '../../graphql/generated';
import { CheckCircle, Cancel } from '@mui/icons-material';
import './createQuiz.scss';

type Props = {
  quest: Questions[];
  quizStart: quizInput;
}

type quizInput = {
  title: string,
  questions: Questions[],
  creator: string,
}

export const QuizQuestion = ({ quest, quizStart }: Props) => {
  const [question, setQuestion] = useState<string>("")
  const [questions, setQuestions] = useState<Array<Questions>>(quest);
  const [answers, setAnswers] = useState<Array<AnswerOptions>>([]);
  const [quiz, setQuiz] = useState<quizInput>(quizStart);
  const [answerType, setAnswerType] = useState<string | undefined>("TRUEFALSE");
  const [answerTrue, setAnswerTrue] = useState<boolean>(true);
  const [enumAnswerType, setEnumAnswerType] = useState<AnswerFormat>(AnswerFormat.Truefalse);

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
      setAnswers(answer);
    }

    if (answerType === 'MULTIPLECHOICE') {
      t.preventDefault();
      let corrAnswer = t.target.id === "corr";
      let answerText = t.target.value;
      let answer = corrAnswer && answerText ? { isCorrect: true, answerText: answerText, } : { isCorrect: false, answerText: answerText }
      setAnswers([...answers, answer])
    }
  }

  const handleChanges = () => {
    setQuestions([...questions, {
      question: question,
      answerOptions: answers,
      answerType: enumAnswerType
    }])

    setQuiz({
      ...quiz,
      questions: questions
    })
  }

  console.log(quiz);
  
  return (
    <div onChange={handleChanges}>
      <TextField 
        label="Enter Question"
        fullWidth
        sx={{ marginTop: 2 }}
        onChange={updateQuestion}
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
              onChange={updateAnswers}
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
              onChange={updateAnswers}
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
              onChange={updateAnswers}
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
              onChange={updateAnswers}
              id="incorr"
            />
          </div>
        </div>
        ) : <></>}
    </div>
  )
}