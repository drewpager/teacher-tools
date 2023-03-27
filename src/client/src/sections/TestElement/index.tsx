// import React from 'react';
// import { AnswerFormat } from '../../graphql/generated';
// import { QuizPlayer } from '../../lib/components';

// export const TestElement = () => {
//   const name = "Drew"
//   const quiz = {
//     creator: "112129642735396482304",
//     id: "0101",
//     title: "Test Quiz For Drew!",
//     questions: [
//       {
//         question: "What is this about",
//         answerType: AnswerFormat.Truefalse,
//         answerOptions: [
//           { answerText: "True", isCorrect: false },
//           { answerText: "False", isCorrect: true },
//         ]
//       },
//       {
//         question: "Now what about this",
//         answerType: AnswerFormat.Multiplechoice,
//         answerOptions: [
//           { answerText: "Drew", isCorrect: true },
//           { answerText: "Steve", isCorrect: false },
//           { answerText: "Katie", isCorrect: true },
//           { answerText: "Karen", isCorrect: false },
//         ]
//       }
//     ],
//   }

//   // Render your list
//   return (
//     <div style={{ marginTop: 100 }}>
//       <h2>{name}'s Test Page</h2>
//       <QuizPlayer quiz={quiz} />
//     </div>
//   );
// }

import React, { useState } from "react";
import { AnswerFormat } from '../../graphql/generated';
import { Button } from '@mui/material'

const quiz = {
  creator: "112129642735396482304",
  id: "0101",
  title: "Test Quiz For Drew!",
  questions: [
    {
      id: 1,
      question: "What is Chamath's Last Name?",
      answerType: AnswerFormat.Multiplechoice,
      answerOptions: [
        { answerText: "Palihapitiya", isCorrect: true },
        { answerText: "Steve", isCorrect: false },
        { answerText: "Branson", isCorrect: false },
        { answerText: "Karen", isCorrect: false },
      ]
    },
    {
      id: 2,
      question: "What is this about",
      answerType: AnswerFormat.Truefalse,
      answerOptions: [
        { answerText: "True", isCorrect: false },
        { answerText: "False", isCorrect: true },
      ]
    },
    {
      id: 3,
      question: "Now what about this",
      answerType: AnswerFormat.Multiplechoice,
      answerOptions: [
        { answerText: "Drew", isCorrect: true },
        { answerText: "Steve", isCorrect: false },
        { answerText: "Katie", isCorrect: true },
        { answerText: "Karen", isCorrect: false },
      ]
    }
  ],
}

// Define a type for the quiz state
type QuizState = {
  currentQuestionIndex: number;
  userAnswers: { [key: number]: string };
};

// Define the Quiz component
export const TestElement: React.FC = () => {
  // Initialize the quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    userAnswers: {},
  });

  // Get the current question from the questions array
  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];

  // Handle the user's answer to the current question
  const handleAnswer = (answer: string) => {
    setQuizState((prevState) => ({
      ...prevState,
      userAnswers: {
        ...prevState.userAnswers,
        [currentQuestion.id]: answer,
      },
    }));
  };

  // Handle the user clicking the "Next" button
  const handleNextQuestion = () => {
    setQuizState((prevState) => ({
      ...prevState,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }));
  };

  // Calculate the user's score
  const score = Object.keys(quizState.userAnswers).reduce((acc, key) => {
    if (quizState.userAnswers[Number(key)] === quiz.questions[Number(key)].answerOptions.find((q) => q.isCorrect)?.answerText) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  // Render the current question
  return (
    <div style={{ marginTop: 50 }}>
      <h1>{quiz.title}</h1>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.answerOptions.map((choice, inder) => (
        <div key={inder}>
          <input
            type={currentQuestion.answerType === AnswerFormat.Truefalse ? "radio" : "checkbox"}
            name="answer"
            value={choice.answerText}
            onChange={(e) => handleAnswer(e.target.value)}
          />
          <label>{choice.answerText}</label>
        </div>
      ))}
      <div>
        <p>Your score: {score} out of {quiz.questions.length}</p>
      </div>
      {quizState.currentQuestionIndex + 1 < quiz.questions.length && (<Button variant="outlined" onClick={handleNextQuestion}>Next</Button>)}
    </div>
  );
};
