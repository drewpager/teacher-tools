import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Typography, Tooltip } from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material';

export const QuizQuestion = () => {
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [answerType, setAnswerType] = useState<string | undefined>("TRUEFALSE");
  const [answerTrue, setAnswerTrue] = useState<boolean>(true); 

  const handleAnswerChange = (e: SyntheticEvent) => {
    let type = e.currentTarget.getAttribute("value");
    setAnswerType(type?.toLocaleUpperCase());
  }
  
  const updateQuestions = (t: ChangeEvent<HTMLInputElement>) => {
    let question = t.target.value;
    setQuestions([...questions, question])
  }
  
  const updateAnswers = (t: ChangeEvent<HTMLInputElement>) => {
    if (answerType === "TRUEFALSE") {
      const answer = answerTrue ? "True" : "False";
      setAnswers([...answers, answer])
    }

    if (answerType === "MULTIPLECHOICE") {
      let answer = t.target.value;
      setAnswers([...answers, answer])
    }
  }
return (
    <div>
      <TextField 
        label="Enter Question"
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
    </div>
  )
}