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
  const [answers, setAnswers] = useState<AnswerOptions[]>([]);
  const [quizOptionId, setQuizOptionId] = useState<number | undefined>();
  const [score, setScore] = useState<number>(0);
  const [quizState, setQuizState] = useState<string[]>([]);

  const title = quiz.title;
  let totalCorrect = 0;
  quiz.questions.map((quest) => quest?.answerOptions?.map((q) => q?.isCorrect ? totalCorrect += 1 : totalCorrect))
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
    if (a && answers.includes(a)) {
      setAnswers(answers.filter((ans) => ans !== a));
      console.log(answers);
    }

    if (a && !answers.includes(a)) {
      setAnswers([...answers, a]);
      console.log(answers);
    }
    setQuizOptionId(id);
    let updatedAnswers = [...userAnswers];
    updatedAnswers[id] = a?.answerText === "" ? true : a?.answerText;
    setUserAnswers(updatedAnswers);

    // if (a?.isCorrect) {
    //   setScore(score + 1)
    // }
    // if (!a?.isCorrect) {
    //   setScore(score - 1)
    // }
  }

  const handleQuizSubmit = () => {
    console.log("Total correct: ", totalCorrect);
    console.log("Answers: ", answers);

    answers.map((ans) => {
      if (ans.isCorrect === true) {
        setScore(score => score + 1);
      }
    })

    setFinalResult(true);
    showResult();
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
      {showFinalResult
        && <><Typography className="quiz-result" style={{ fontSize: 100 }} variant="h2">{score > 0 ? `${Math.round((score / totalCorrect) * 100)}%` : "0%"}</Typography>
          <Button type="submit" variant="outlined" onClick={() => resetQuiz()}>Retake!</Button></>
      }
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
                  <div className='quiz--div'>
                    <label className='quiz--label'>
                      <input
                        type={a.answerType === "TRUEFALSE" ? "radio" : "checkbox"}
                        name="answer"
                        value={`${ans?.answerText}`}
                        checked={answers[index].answerText === ans?.answerText}
                        style={userAnswers[indy] === ans?.answerText ? { border: ans?.isCorrect ? "2px solid #57996A" : "2px solid #BC4710" } : { border: ans?.isCorrect ? "2px solid #57996A" : "2px solid #BC4710" }}
                        disabled
                        key={index}
                      />
                      {ans?.answerText === "" ? "True" : ans?.answerText}</label>
                    {a.answerType === "TRUEFALSE" && (<>
                      <input
                        type="radio"
                        name="answer"
                        value="false"
                        checked={userAnswers[indy] === "false"}
                        style={userAnswers[indy] === "" && !ans?.isCorrect ? { backgroundColor: "#57996A" } : { backgroundColor: "#BC4710" }}
                        key={index}
                      /><label>False</label></>)}
                  </div>
                ))}</p>
              </div>
            </>
          )))
          : (
            <div>
              {quiz.questions.map((q, index) => (
                <form key={index} onSubmit={handleQuizSubmit}>
                  <Chip
                    label={`Question ${index + 1} out of ${quiz.questions.length}`}
                    variant="outlined"
                    color="secondary"
                  />
                  <h2 key={index}>{q.question}</h2>
                  {q.answerOptions && q.answerOptions.map((choice, inder) => (
                    <div className='quiz--div'>
                      <label className='quiz--label'>
                        <input
                          type={q.answerType === "TRUEFALSE" ? "radio" : "checkbox"}
                          name="answer"
                          value={`${choice?.answerText}`}
                          onChange={() => handleClick(choice, inder)}
                          key={inder}
                        />
                        {choice?.answerText === "" ? "True" : choice?.answerText}</label>
                      {q.answerType === "TRUEFALSE" && (<>
                        <input
                          type="radio"
                          name="answer"
                          value="false"
                          onChange={() => handleClick({ __typename: "AnswerOptions", answerText: "false", isCorrect: !choice?.isCorrect }, inder)}
                          key={inder}
                        /><label>False</label></>)}
                    </div>
                  ))}
                  <Divider sx={{ margin: "0.5em" }} />
                </form>
              ))}
              {/* <Button type="submit" variant="outlined" onClick={() => { setFinalResult(true); showResult() }}>Show Results!</Button> */}
              <Button type="submit" variant="outlined" onClick={handleQuizSubmit}>Submit!</Button>
              {showFinalResult && (<Button type="submit" variant="outlined" onClick={() => resetQuiz()}>Retake!</Button>)}
            </div>
          )}
    </Box>
  )
}