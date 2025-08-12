require("dotenv").config();
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY is not set. Please configure your environment."
  );
}

const openai = new OpenAI({ apiKey: `${process.env.OPENAI_API_KEY}` });

type quizProps = {
  numMCQuestions: number;
  numTFQuestions: number;
  subject: string;
};

export const OpenAIQuiz = async ({
  numMCQuestions,
  numTFQuestions,
  subject,
}: quizProps) => {
  const inputString = `Generate ${numMCQuestions} multiple choice questions and ${numTFQuestions} true/false questions about ${subject}.`;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful teacher assistant that generates a JSON object with a number of questions, the options for students to choose from, and the correct answer. Each object in the questions array should be formatted like this example for Multiple Choice: {question: 'What is the capital of California?', answerType: 'MULTIPLECHOICE', answerOptions: [{ answerText: 'San Francisco', isCorrect: false }, { answerText: 'Los Angeles', isCorrect: false }, { answerText: 'Sacramento', isCorrect: true }, { answerText: 'San Diego', isCorrect: false }]} and importantly like these for true/false questions: {question: 'The capital of California is San Diego.', answerType: 'TRUEFALSE', answerOptions: [{ answerText: '', isCorrect: false }]} or {question: 'The capital of California is Sacramento.', answerType: 'TRUEFALSE', answerOptions: [{ answerText: '', isCorrect: true }]}",
      },
      {
        role: "user",
        content: `${inputString}`,
      },
    ],
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
  });

  console.log(completion);

  const message = completion.choices[0].message.content;

  console.log(message);

  return message;
};
