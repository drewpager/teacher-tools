import React, { useReducer, useState, useRef, useEffect, ChangeEvent, SyntheticEvent, useCallback } from 'react';
import { FieldArray, Formik, getIn, FieldProps, Field } from 'formik';
import { QuizQuestion } from '../CreateQuiz/QuizQuestion';
import { useCreateQuizMutation, Viewer, Quiz, Questions, AnswerOptions, AnswerFormat } from '../../graphql/generated';
import { Box, TextField, FormLabel, FormControlLabel, Radio, RadioGroup, Typography, Tooltip, Button, CircularProgress } from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DisplayError } from '../../lib/utils';
import '../CreateQuiz/createQuiz.scss';
import '@mui/material/useMediaQuery'
import * as yup from 'yup';
interface props {
  viewer: Viewer
}

const validationSchema = yup.object({
  title: yup
    .string()
    .min(8, 'Title must be a minimum of 8 characters in length!')
    .required('Title is required'),
  creator: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Creator ID is required'),
  questions: yup
    .array().of(
      yup.object().shape({
        question: yup.string().min(10),
        answerType: yup.mixed().oneOf([AnswerFormat.Multiplechoice, AnswerFormat.Truefalse]).defined(),
        answerOptions: yup.array().of(
          yup.object().shape({
            isCorrect: yup.boolean(),
            answerText: yup.string().min(1)
          })
        )
      })
    )
});

const Input = ({ field, form: { errors, touched } }: FieldProps) => {
  const errorMessage = getIn(errors, field.name);

  return (
    <>
      <TextField 
        {...field} 
        placeholder={field.name}
        sx={{ padding: "0.5rem", gridColumn: 4 }} 
      />
      {!!touched && errors && <div>{errorMessage}</div>}
    </>
  )
}

// TODO: Click to switch answerOption value from True to False
const checkInput = ({ field }: FieldProps) => {
  return (
    <>
       <Tooltip title="Click to switch" onClick={() => !field.value}>
        { field.value ? <CheckCircle color={"primary"} sx={{ marginRight: 1 }} /> : <Cancel sx={{ color: "black", marginRight: 1 }} />  }
      </Tooltip>
    </>
  )
}

export const QuizCreate = ({ viewer }: props) => {
  const [answerTrue, setAnswerTrue] = useState<boolean>();
  const navigate = useNavigate();

  const [createQuiz, { loading, error }] = useCreateQuizMutation({
    variables: {
      input: {
        title: "",
        questions: [{}],
        creator: ""
      }
    }
  })

  if (loading) {
    <Box>
      <CircularProgress color='primary' />
    </Box>
  }

  if (error) {
    <Box>
      <DisplayError title="Failed to create assessment" />
    </Box>
  }

  return (
    <Box 
      display="grid" 
      gap="30px" 
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
    >
      <Formik
        initialValues={{
          title: '',
          questions: [
            {
              question: '',
              answerType: AnswerFormat.Truefalse || AnswerFormat.Multiplechoice,
              answerOptions: [
                { answerText: "", isCorrect: true },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
              ]
            },
          ],
          creator: `${viewer.id}`,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await createQuiz({
            variables: {
              input: {  
                ...values
              }
            }
          });

          navigate(`../user/${viewer.id}`, { replace: true })
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          
          <form onSubmit={handleSubmit}>
            <h1>Create Assessment</h1>
              <TextField
                fullWidth
                type="text"
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                sx={{
                  gridColumn: 3
                }}
              />
              {/* <Field name="title" component={Input} /> */}
              <FieldArray name="questions">
              {({ insert, remove, push }) => (
                <div>
                  {values.questions.length > 0 && 
                    values.questions.map((question: any, index: number) =>  {
                      return (
                        <div className='row' key={index}>
                          <div className='col' key={index}>
                            {/* <TextField 
                              label={`Question ${index + 1}`}
                              name={questionElement}
                              placeholder="Enter Question"
                              onChange={handleChange}
                              value={values.questions[index].question}
                            /> */}
                            <Field 
                              name={`questions[${index}].question`}
                              component={Input}
                            />
                            <Button onClick={() => remove(index)}>
                                X
                            </Button>
                          </div>
                            <FormLabel>Answer Type</FormLabel>
                            <RadioGroup>
                              <FormControlLabel
                                name={`questions[${index}].answerType`}
                                value="TRUEFALSE"
                                control={<Radio />} 
                                label="True/False"
                                onChange={handleChange} 
                              />
                              <FormControlLabel
                                name={`questions[${index}].answerType`}
                                value="MULTIPLECHOICE"
                                control={<Radio />} 
                                label="Multiple Choice" 
                                onChange={handleChange}
                              />
                            </RadioGroup>
                            {question.answerType === "MULTIPLECHOICE" ? (
                              <FieldArray name="answerOptions">
                                {({ insert, remove, push }) => (
                                  <div>
                                    {values.questions[index].answerOptions.length > 0 &&
                                      values.questions[index].answerOptions.map((option: any, indy: number) => {
                                        return (
                                          <div className="quiz__multiAnswerArea">
                                            <div className="quiz__multiAnswers">
                                            {/* <Tooltip title="Click To Switch" onClick={() => { push({ isCorrect: true })}}> */}
                                            {/* <Tooltip title="Correct Answer">
                                              <CheckCircle color={"primary"} sx={{ marginRight: 1 }} /> 
                                            </Tooltip> */}
                                            <Field 
                                              name={`questions[${index}].answerOptions[${indy}].isCorrect`} 
                                              component={checkInput} 
                                            />
                                            <TextField 
                                              label="Enter Answer Option"
                                              fullWidth
                                              sx={{ marginTop: 2 }}
                                              // name={`answerOptions[${index}].answerText`}
                                              name={`questions[${index}].answerOptions[${indy}].answerText`}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </div> 
                                        )
                                      })}
                                  </div>
                                )}
                            </FieldArray>
                            ) : (
                              <div className="quiz__answerArea" onClick={() => setAnswerTrue(!answerTrue)}>
                              <div className="quiz__answers">
                                <Tooltip title="Click To Switch">
                                  <CheckCircle color={"primary"} sx={{ marginRight: 1 }} /> 
                                </Tooltip>
                                <Typography>{answerTrue ? "True" : "False"}</Typography>
                              </div>
                              <div className="quiz__answers">
                              <Tooltip title="Click To Switch">
                                  <Cancel sx={{ color: "primary", marginRight: 1 }} /> 
                                </Tooltip>
                                <Typography>{!answerTrue ? "True" : "False"}</Typography>
                              </div>
                            </div>
                            )}
                        </div>
                      )
                    })}
                    <Button onClick={() => push({ question: '', answerType: AnswerFormat, 
                      answerOptions: [  
                        { answerText: "", isCorrect: true },
                        { answerText: "", isCorrect: false },
                        { answerText: "", isCorrect: false },
                        { answerText: "", isCorrect: false },
                      ] })}
                    >
                      Add Question
                    </Button>
                </div>
              )}
              </FieldArray>
              <Button type="submit">Submit</Button>
              <pre>
                {JSON.stringify(values, null, 2)}
              </pre>
              <pre>
                {JSON.stringify(errors, null, 2)}
              </pre>
          </form>
        )}
      </Formik>
    </Box>
  )
}

// export const QuizCreate = ({ viewer }: Props) => {
//   const isNonMobile = useMediaQuery("(min-width: 600px)");

//   const handleFormSubmit = (values: createQuizInput) => {
//     console.log(values);
//   }

//   return (
//    <Box m="20px" paddingTop={10}>
//     <h2>Create Assessment</h2>

//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={initialInput}
//     >
//       {({ values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
//         <form onSubmit={handleSubmit}>
//           <Box 
//             display="grid" 
//             gap="30px" 
//             gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//             sx={{
//               "& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
//             }}
//           >
//             <TextField 
//               fullWidth 
//               variant='filled'
//               type="text"
//               label="Assessment Title"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.title}
//               name="title"
//               error={!!touched.title}
//               sx={{
//                 gridColumn: 'span 3'
//               }}
//             />
//              <TextField 
//               fullWidth 
//               variant='filled'
//               type="text"
//               label="First Question"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.questions[0].question}
//               name="question"
//               sx={{
//                 gridColumn: 'span 3'
//               }}
//               // error={touched && !!touched.questions[0].question}
//             />
//           </Box>
//         </form>
//       )}
//     </Formik>
//    </Box>
//   )
// }

// type Props = {
//   viewer: Viewer
// }

// type createQuizInput = {
//   title: string,
//   questions: [{
//     answerType?: AnswerFormat,
//     question?: string,
//     answerOptions?: AnswerOptions[]
//   }],
//   creator: string
// }

// type Action =
//   | { type: 'CREATOR', field: string, payload: string | undefined }  
//   | { type: 'UPDATE_FORM_FIELD', field: string, payload: string }
//   | { type: 'UPDATE_QUESTIONS_OBJ', field: string, payload: string | undefined }
//   | { type: 'UPDATE_TYPE_ANSWER', field: string, payload: AnswerFormat }
//   | { type: 'UPDATE_ANSWER_OPTIONS', field: string, payload: AnswerOptions[] };


// const initialInput: createQuizInput = {
//   title: "",
//   questions: [{
//     answerType: AnswerFormat.Truefalse, 
//     question: "",
//     answerOptions: [{ answerText: "", isCorrect: true || false }]
//   }],
//   creator: ""
// }

// const reducer = (state: createQuizInput, action: Action): createQuizInput => {
//   switch (action.type) {
//     case 'UPDATE_FORM_FIELD':
//       return {
//         ...state,
//         [action.field]: action.payload
//       }
//     case 'UPDATE_TYPE_ANSWER':
//       return {
//         ...state,
//         questions: [{ 
//           ...state.questions, 
//           answerType: action.payload 
//         }]
//       }
//     case 'UPDATE_QUESTIONS_OBJ':
//       return {
//         ...state,
//         questions: [{
//           ...state.questions, 
//           question: action.payload 
//         }]
//       }
//     case 'UPDATE_ANSWER_OPTIONS':
//       return {
//         ...state,
//         questions: [{ 
//           ...state.questions, 
//           answerOptions: action.payload
//         }]
//       }
//     case 'CREATOR':
//       return {
//         ...state,
//         [action.field]: action.payload
//       }
//     default:
//       return state;
//   }
// }

// export const QuizCreate = ({ viewer }: Props) => {
//   const [state, dispatch] = useReducer(reducer, initialInput);
//   const [answerTrue, setAnswerTrue] = useState<boolean>(true);
//   const [addQuestion, setAddQuestion] = useState<number>(0);
//   const [answerOptions, setAnswerOptions] = useState<Array<AnswerOptions>>([])
//   const [questions, setQuestions] = useState<Array<string>>([])
//   let navigate = useNavigate();

//   const correctRef = useRef<any>();
//   const incorrectOneRef = useRef<any>();
//   const incorrectTwoRef = useRef<any>();
//   const incorrectThreeRef = useRef<any>();
//   const questionRef = useRef<any>();

//   useEffect(() => {
//     if (viewer && viewer.id) {
//       dispatch({
//         type: 'CREATOR',
//         field: 'creator',
//         payload: viewer.id
//       })
//     }
//   }, [viewer])  

//   const [createQuiz] = useCreateQuizMutation({
//     variables: {
//       input: {
//         title: state.title,
//         questions: [...state.questions],
//         creator: state.creator
//       }
//     }
//   })

//   const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     dispatch({
//       type: 'UPDATE_FORM_FIELD',
//       field: e.target.name,
//       payload: e.target.value
//     })
//   }

//   const handleAnswerOptions = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     e.preventDefault()
//     setAnswerOptions([ ...answerOptions, {
//       answerText: e.target.value,
//       isCorrect: e.currentTarget.id === "true" ? true : false
//      }])
//   }


//   const handleAnswerChecked = (e: SyntheticEvent<Element, Event>) => {
//     let str1 = e?.currentTarget?.getAttribute("value")?.charAt(0).toUpperCase()
//     let str2 = e?.currentTarget?.getAttribute("value")?.toLowerCase().slice(1, )
    
//     if (str1 && str2) {
//       let answerType = `${str1+str2}`
//       dispatch({
//         type: 'UPDATE_TYPE_ANSWER',
//         field: 'answerType',
//         payload: answerType === "Multiplechoice" ? AnswerFormat.Multiplechoice : AnswerFormat.Truefalse
//       })
//     }
//   }

//   const handleQuestionsUpdate = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     dispatch({
//       type: 'UPDATE_QUESTIONS_OBJ',
//       field: e.target.name,
//       payload: questionRef?.current?.value
//     })
//   }

//   const handleNewQuestion = () => {
//     setAddQuestion(addQuestion + 1)

//     dispatch({
//       type: 'UPDATE_ANSWER_OPTIONS',
//       field: 'answerOptions',
//       payload: answerOptions
//     })
//   }

//   const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const data = [
//       {isCorrect: true, answerText: correctRef?.current?.value },
//       {isCorrect: false, answerText: incorrectOneRef?.current?.value }, 
//       {isCorrect: false, answerText: incorrectTwoRef?.current?.value }, 
//       {isCorrect: false, answerText: incorrectThreeRef?.current?.value }, 
//     ]

//     dispatch({
//       type: 'UPDATE_ANSWER_OPTIONS',
//       field: 'answerOptions',
//       payload: data
//     })
    

//     console.log(state)

//     // if (state && state.questions) {
//     //   await createQuiz({
//     //     variables: {
//     //       input: {
//     //         title: state.title,
//     //         questions: state.questions,
//     //         creator: state.creator
//     //       }
//     //     }
//     //   });
//     // }
//     // Navigate to User Profile Page
//     // navigate(`../user/${viewer.id}`, { replace: true })    
//   }

//   // console.log(answerTrue)
//   console.log(state.questions);
//   // console.log(answerOptions);
  
//   return (
//     <div className='quiz__box'>
//       <h1>Create Assessment</h1>
//       <p>Title: {state.title}</p>
//       <p>Question: {questionRef?.current?.value}</p>
//       {/* <p>Question: {state.questions[addQuestion].question}</p> */}
//       <p>AnswerType: {state.questions[addQuestion].answerType}</p>
//       {/* <form onSubmit={() => formHandler()}> */}
//       <form onSubmit={handleSubmit}>
//         <TextField 
//           label="Enter Assessment Title"
//           name="title"
//           fullWidth
//           onChange={handleFormChange}
//         />
//         <TextField 
//           label="Enter First Question"
//           fullWidth
//           name="question"
//           sx={{ marginTop: 2 }}
//           // onChange={handleQuestionsUpdate}
//           inputRef={questionRef}
//         />
//         <FormControl className='quiz__answerType'>
//           <FormLabel id="demo-radio-buttons-group-label">Answer Type</FormLabel>
//           <RadioGroup
//             aria-labelledby="demo-radio-buttons-group-label"
//             // defaultValue="TRUEFALSE"
//             name="radio-buttons-group"
//           >
//             <FormControlLabel
//               value="TRUEFALSE"
//               control={<Radio />} 
//               label="True/False"
//               onChange={(e) => handleAnswerChecked(e)} 
//             />
//             <FormControlLabel
//               value="MULTIPLECHOICE"
//               control={<Radio />} 
//               label="Multiple Choice" 
//               onChange={(e) => handleAnswerChecked(e)} 
//             />
//           </RadioGroup>
//         </FormControl>
//         {state.questions[addQuestion].answerType === 'TRUEFALSE' ? (
//           <div className="quiz__answerArea" onClick={() => setAnswerTrue(!answerTrue)}>
//             <div className="quiz__answers">
//               <Tooltip title="Click To Switch">
//                 <CheckCircle color={"primary"} sx={{ marginRight: 1 }} /> 
//               </Tooltip>
//               <Typography>{answerTrue ? "True" : "False"}</Typography>
//             </div>
//             <div className="quiz__answers">
//               <Tooltip title="Click To Switch">
//                 <Cancel sx={{ color: "primary", marginRight: 1 }} /> 
//               </Tooltip>
//               <Typography>{!answerTrue ? "True" : "False"}</Typography>
//             </div>
//           </div>
//         ) : <></>}
//         {state.questions[addQuestion].answerType === 'MULTIPLECHOICE' ? (
//           <div className="quiz__multiAnswerArea">
//           <div className="quiz__multiAnswers">
//             <Tooltip title="Add Correct Answer">
//               <CheckCircle color={"primary"} sx={{ marginRight: 1 }} /> 
//             </Tooltip>
//             <TextField 
//               label="Enter Correct Answer"
//               fullWidth
//               sx={{ marginTop: 2 }}
//               name="answerOptions"
//               inputRef={correctRef}
//               id="true"
//             />
//           </div>
//           <div className="quiz__multiAnswers">
//             <Tooltip title="Add Incorrect Answer">
//               <Cancel sx={{ color: "black", marginRight: 1 }} /> 
//             </Tooltip>
//             <TextField 
//               label="Enter Wrong Answer"
//               fullWidth
//               sx={{ marginTop: 2 }}
//               name="answerOptions"
//               inputRef={incorrectOneRef}
//               id="false"
//             />
//           </div>
//           <div className="quiz__multiAnswers">
//             <Tooltip title="Click To Switch">
//               <Cancel sx={{ color: "black", marginRight: 1 }} /> 
//             </Tooltip>
//             <TextField 
//               label="Enter Wrong Answer"
//               fullWidth
//               sx={{ marginTop: 2 }}
//               name="answerOptions"
//               inputRef={incorrectTwoRef}
//               id="false"
//             />
//           </div>
//           <div className="quiz__multiAnswers">
//             <Tooltip title="Click To Switch">
//               <Cancel sx={{ color: "black", marginRight: 1 }} /> 
//             </Tooltip>
//             <TextField 
//               label="Enter Wrong Answer"
//               fullWidth
//               sx={{ marginTop: 2 }}
//               name="answerOptions"
//               inputRef={incorrectThreeRef}
//               id="false"
//             />
//           </div>
//         </div>
//         ) : <></>}
//         {/* { Array.from({ length: addQuestion }).map((_, i) => ( <QuizQuestion quest={questions} quizStart={quiz} key={i} /> )) } */}
//         {/* <Button onClick={(e) => saveQuestion(e)}>Add Question</Button> */}
//         <Button onClick={handleNewQuestion}>New Question</Button> 
//         <Button type="submit">Submit Assessment</Button>
//         {/* <Button type="submit">Create</Button> */}
//       </form>
//     </div>
//   )
// }