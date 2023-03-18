import React from 'react';
import { AnswerFormat } from '../../graphql/generated';
import { QuizPlayer } from '../../lib/components';

export const TestElement = () => {
  const name = "Drew"
  const quiz = {
    creator: "112129642735396482304",
    id: "0101",
    title: "Test Quiz For Drew!",
    questions: [
      {
        question: "What is this about",
        answerType: AnswerFormat.Truefalse,
        answerOptions: [
          { answerText: "True", isCorrect: false, id: "123" },
          { answerText: "False", isCorrect: true, id: "124" },
        ]
      },
      {
        question: "Now what about this",
        answerType: AnswerFormat.Multiplechoice,
        answerOptions: [
          { answerText: "Drew", isCorrect: true, id: "111" },
          { answerText: "Steve", isCorrect: false, id: "112" },
          { answerText: "Katie", isCorrect: true, id: "113" },
          { answerText: "Karen", isCorrect: false, id: "114" },
        ]
      }
    ],
  }

  // Render your list
  return (
    <div style={{ marginTop: 100 }}>
      <h2>{name}'s Test Page</h2>
      <QuizPlayer quiz={quiz} />
    </div>
  );
}