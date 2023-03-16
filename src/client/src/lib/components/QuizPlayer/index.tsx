import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Quiz } from '../../../graphql/generated';
import { Formik, Field, Form } from "formik";
import { titleCase } from '../../utils';
import './quizPlayer.scss';
interface Props {
  quiz: Quiz
}

export const QuizPlayer = ({ quiz }: Props) => {
  const [showFinalResult, setFinalResult] = useState<boolean>(false);
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

  const handleClick = (isCorrect: boolean | string | undefined | null) => {
    if (isCorrect) {
      setScore(score + 1)
    }
  }
  console.log("Score: ", score);
  return (
    <Box>
      <h1>{title}</h1>
      {showFinalResult ? (
      <div>
        <p>Final Result! - {Math.round(score / totalCorrect) + "%"}</p>
      </div>
    ) : (
      <div>
        {quiz.questions.map((q, index) => (
          <>
          <p>Question {index + 1} out of {quiz.questions.length}</p>
          <h2>{q.question}</h2>
          <ul className='answer--options'>
            {q.answerOptions?.map((a, id) => (
              <li 
                key={id}
                onClick={() => handleClick(a?.isCorrect)}
              >
                {a?.answerText === "" ? "True" : a?.answerText}
              </li>
            ))}
          </ul>
          </>
        ))}
      </div>
    )}
   </Box>
  )
}

// export const QuizPlayer = ({ quiz }: Props) => {
//   const [quizState, setQuizState] = useState<string[]>([]);
//   const [checked, setChecked] = useState<boolean>(false);

//   const title = quiz.title;

//   const handleCheck = () => {
//     const quizKey: any[] = []
//     quiz.questions.map((v, i) => {
//       quizKey.push(v.answerOptions?.find((q) => q?.isCorrect))
//     })
//     const correct = quizState.filter((e, i) => e.matchAll(quizKey[i].isCorrect))
//   }

//   const handleSelect = (value: string) => {
//     setChecked(true);
//     setQuizState([...quizState, value])
//   }

//   const handleCorrectness = (e: string) => {
//     setChecked(true);
//     setQuizState([...quizState, e])
//   }

//   interface Values {
//     answers: string[] | undefined[];
//   }

//   let initialAnswers = {
//     ...quiz.questions.map((i) => 
//       i.answerOptions && i.answerOptions[0] 
//       ? i.answerOptions[0].answerText 
//       : "")
//   }
  
//   console.log("Initial: ", initialAnswers);
//   // TODO: 
//   // 1. Randomize order of answerOptions
//   // 2. Check answers + Show Errors/Correct
//   // Considerations:
//   // 1. Allow teachers to set # of attempts before locking in grade?

//   return (
//     <Box className="quiz--container">
//       <h1 className="quiz--title">{title}</h1>
//       <Formik
//         initialValues={{
//           answers: [],
//         }}
//         onSubmit={async (values: Values) => {
//           await new Promise((r) => setTimeout(r, 500));
//           alert(JSON.stringify(values, null, 2));
//         }}
//       >
//         {({ values }) => (
//           <Box>
//             {quiz.questions.map((i, index) => (
//               <>
//                 <h2 key={index}>{i.question}</h2>
//                   <Form className='quiz--form'>
//                     {i.answerType === "TRUEFALSE" && i.answerOptions?.map((od, ip) => (
//                       // <div role="group" id="my-radio-group" aria-labelledby="my-radio-group">
//                       <div>
//                         <label>
//                         <Field 
//                           type="checkbox" 
//                           name={values.answers[index]}  
//                         />
//                           {titleCase(`${od?.isCorrect}`)}
//                         </label>
//                       </div>
//                     ))}
//                     {i.answerType === "MULTIPLECHOICE" && i.answerOptions?.map((op, id) => (
//                       <label>
//                         <Field type="checkbox" name={`values.answers[${index}]`} value={op?.answerText} key={id} />
//                         {op?.answerText}
//                       </label>
//                     ))}
//                   </Form>
//               </>
//             ))}
//             <Button
//               variant="outlined"
//               type="submit"
//               onClick={() => console.log(values.answers)}
//               className="checkAnswersButton"
//             >Submit</Button>
//           </Box>
//         )}
//       </Formik>
//     </Box>
//   )
// }