import React, { useState } from 'react';
import { Box, Button, FormControl, Radio, RadioGroup, Chip, Divider } from '@mui/material';
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
  //TODO: Evaluate final submission state before calculating score.
  return (
    <Box className='quiz--container'>
      <h1><QuizIcon color="secondary" /> {title}</h1>
      <Divider sx={{ margin: "0.5em" }} />
      {showFinalResult ? (
        <div>
          <p>Result: <Chip
            label={score > 0 ? `${(score / totalCorrect) * 100}%` : "0%"}
            variant="outlined"
            color="secondary"
          /></p>

          <Button type="submit" variant="outlined" onClick={() => resetQuiz()}>Retake!</Button>
        </div>
      ) : (
        <div>
          {quiz.questions.map((q, index) => (
            <form onSubmit={() => console.log(score)}>
              <Chip
                label={`Question ${index + 1} out of ${quiz.questions.length}`}
                variant="outlined"
                color="secondary"
              />
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
              <Divider sx={{ margin: "0.5em" }} />
            </form>
          ))}
          <Button type="submit" variant="outlined" onClick={() => setFinalResult(true)}>Show Results!</Button>
        </div>
      )}
    </Box>
  )
}