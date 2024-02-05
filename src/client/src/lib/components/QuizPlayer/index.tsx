import React, { FormEvent, ReactHTMLElement, useState } from 'react';
import { Box, Button, FormControl, Radio, RadioGroup, Chip, Divider, Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { Quiz, AnswerOptions } from '../../../graphql/generated';
import { Formik, Field, Form } from "formik";
import { titleCase } from '../../utils';
import './quizPlayer.scss';

interface Props {
  quiz: Quiz
}

export const QuizPlayer = ({ quiz }: Props) => {
  const [showFinalResult, setFinalResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState(Array(quiz.questions.length).fill(null));
  const [quizOptionId, setQuizOptionId] = useState<number | undefined>();
  const [score, setScore] = useState<number>(0);
  const [quizState, setQuizState] = useState<string[]>([]);

  const title = quiz.title;
  let totalCorrect = 0;
  quiz.questions.map((quest) => quest?.answerOptions?.forEach((q) => q?.isCorrect ? totalCorrect = totalCorrect + 1 : totalCorrect))
  interface Values {
    answers: string[] | undefined[];
  }

  // let initialAnswers = {
  //   ...quiz.questions.map((i) =>
  //     i.answerOptions && i.answerOptions[0]
  //       ? i.answerOptions[0].answerText
  //       : "")
  // }

  const handleClick = (a: AnswerOptions | null, id: number) => {
    setQuizOptionId(id);
    let updatedAnswers = [...userAnswers];
    updatedAnswers[id] = a?.answerText === "" ? true : a?.answerText;
    setUserAnswers(updatedAnswers);

    if (a?.isCorrect) {
      setScore(score + 1)
    }
    if (!a?.isCorrect) {
      setScore(score - 1)
    }
  }
  const resetQuiz = () => {
    setFinalResult(false);
    setScore(0);
    setQuizOptionId(undefined)
  }

  const showResult = () => {
    const res = document.querySelector('div.quiz--container');

    if (res) {
      res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  //TODO: Evaluate final submission state before calculating score.
  return (
    <Box className='quiz--container'>
      <h1><QuizIcon color="secondary" /> {title}</h1>
      {showFinalResult && <Typography className="quiz-result" style={{ fontSize: 100 }} variant="h2">{score > 0 ? `${Math.round((score / totalCorrect) * 100)}%` : "0%"}</Typography>}
      <Divider sx={{ margin: "0.5em" }} />
      {
        // showFinalResult ? (
        //   <div>
        //     <Typography className="quiz-result" style={{ fontSize: 100 }} variant="h2">{score > 0 ? `${Math.round((score / totalCorrect) * 100)}%` : "0%"}</Typography>
        //     <Button type="submit" variant="outlined" onClick={() => resetQuiz()}>Retake!</Button>
        //   </div>
        // ) 
        showFinalResult ? (
          quiz.questions.map((a, index) => (
            <>
              <div key={index}>
                <h2>{a.question}</h2>
                <p>{a.answerOptions?.map((ans, indy) => (
                  <div key={index} className='quiz--div'>
                    {console.log(userAnswers)}
                    <label className='quiz--label'>
                      <input
                        type={a.answerType === "TRUEFALSE" ? "radio" : "checkbox"}
                        name="answer"
                        value={`${ans?.answerText}`}
                        checked={userAnswers[indy] === ans?.answerText}
                        style={userAnswers[indy] === ans?.answerText ? { border: ans?.isCorrect ? "2px solid green" : "2px solid red" } : { border: ans?.isCorrect ? "2px solid green" : "2px solid red" }}
                        disabled
                      />
                      {ans?.answerText === "" ? "True" : ans?.answerText}</label>
                    {a.answerType === "TRUEFALSE" && (<>
                      <input
                        type="radio"
                        name="answer"
                        value="false"
                      /><label>False</label></>)}
                  </div>
                ))}</p>
              </div>
            </>
          )))
          : (
            <div>
              {quiz.questions.map((q, index) => (
                <form key={index} onSubmit={() => console.log(score, userAnswers)}>
                  <Chip
                    label={`Question ${index + 1} out of ${quiz.questions.length}`}
                    variant="outlined"
                    color="secondary"
                  />
                  <h2 key={index}>{q.question}</h2>
                  {q.answerOptions && q.answerOptions.map((choice, inder) => (
                    <div key={inder} className='quiz--div'>
                      <label className='quiz--label'>
                        <input
                          type={q.answerType === "TRUEFALSE" ? "radio" : "checkbox"}
                          name="answer"
                          value={`${choice?.answerText}`}
                          onChange={() => handleClick(choice, inder)}
                        />
                        {choice?.answerText === "" ? "True" : choice?.answerText}</label>
                      {q.answerType === "TRUEFALSE" && (<>
                        <input
                          type="radio"
                          name="answer"
                          value="false"
                          onChange={() => handleClick(choice, inder)}
                        /><label>False</label></>)}
                    </div>
                  ))}
                  <Divider sx={{ margin: "0.5em" }} />
                </form>
              ))}
              <Button type="submit" variant="outlined" onClick={() => { setFinalResult(true); showResult() }}>Show Results!</Button>
            </div>
          )}
    </Box>
  )
}