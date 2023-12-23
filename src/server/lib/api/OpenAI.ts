require("dotenv").config();
import OpenAI from "openai";

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
  // const mcQuestions = Number(numMCQuestions);
  // const subjectMatter = String(subject);
  const inputString = `Generate ${numMCQuestions} multiple choice questions about ${subject}.`;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful teacher assistant that generates a JSON object with a number of questions, the options for students to choose from, and the correct answer. Each object in the questions array should be formatted like this example: {question: 'What is the capital of California?', answerType: 'MULTIPLECHOICE', answerOptions: [{ answerText: 'San Francisco', isCorrect: false }, { answerText: 'Los Angeles', isCorrect: false }, { answerText: 'Sacramento', isCorrect: true }, { answerText: 'San Diego', isCorrect: false }]}",
      },
      {
        role: "user",
        content: `${inputString}`,
      },
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });

  const message = completion.choices[0].message.content;

  return message;
};
