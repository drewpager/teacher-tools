import React, { useState } from 'react';
import { Box, Button, FormControl, Radio, RadioGroup } from '@mui/material';
import { Quiz, AnswerOptions } from '../../../graphql/generated';
import { Formik, Field, Form } from "formik";
import { titleCase } from '../../utils';
import './quizPlayer.scss';
interface Props {
  quiz: Quiz
}

export const QuizPlayer = ({ quiz }: Props) => {
  const [showFinalResult, setFinalResult] = useState<boolean>(false);
  const [quizOptionId, setQuizOptionId] = useState<number | undefined>();
  const [score, setScore] = useState<number>(0);
  const [quizState, setQuizState] = useState<string[]>([]);

  const title = quiz.title;
  let totalCorrect = 0;
  quiz.questions.map((quest) => quest?.answerOptions?.forEach((q) => q?.isCorrect ? totalCorrect = totalCorrect + 1 : totalCorrect))
  interface Values {
    answers: string[] | undefined[];
  }

  let initialAnswers = {
    ...quiz.questions.map((i) =>
      i.answerOptions && i.answerOptions[0]
        ? i.answerOptions[0].answerText
        : "")
  }

  const handleClick = (a: AnswerOptions | null, id: number) => {
    setQuizOptionId(id);

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
  console.log("Score: ", score);
  console.log("Total Correct: ", totalCorrect);
  return (
    <Box>
      <h1>{title}</h1>
      {showFinalResult ? (
        <div>
          <p>Final Result! - {Math.round(score / totalCorrect) * 100 > 0 ? Math.round(score / totalCorrect) * 100 : "0"}%</p>
          <Button type="submit" variant="outlined" onClick={() => resetQuiz()}>Retake!</Button>
        </div>
      ) : (
        <div>
          {quiz.questions.map((q, index) => (
            <form onSubmit={() => console.log(score)}>
              <p>Question {index + 1} out of {quiz.questions.length}</p>
              <h2>{q.question}</h2>
              {q.answerOptions && q.answerOptions.map((choice, inder) => (
                <div key={inder}>
                  <input
                    type={q.answerType === "TRUEFALSE" ? "radio" : "checkbox"}
                    name="answer"
                    value={`${choice?.answerText}`}
                    onChange={() => handleClick(choice, inder)}
                  />
                  <label>{choice?.answerText === "" ? "True" : choice?.answerText}</label>
                  {q.answerType === "TRUEFALSE" && (<><input type="radio" name="answer" value="false" /><label>False</label></>)}
                </div>
              ))}
            </form>
          ))}
          <Button type="submit" variant="outlined" onClick={() => setFinalResult(true)}>Show Results!</Button>
        </div>
      )}
    </Box>
  )
}