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
          "You are a helpful teacher assistant that generates questions for students to practice.",
      },
      {
        role: "user",
        content: `${inputString}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const message = completion.choices[0].message.content;

  return message;
};
