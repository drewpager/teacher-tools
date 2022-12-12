import React from 'react';
import { FieldArray, Formik, getIn, FieldProps, Field } from 'formik';
import { useCreateQuizMutation, Viewer, AnswerFormat } from '../../graphql/generated';
import { Box, TextField, FormLabel, FormControlLabel, Radio, RadioGroup, Typography, Tooltip, Button, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { DisplayError } from '../../lib/utils';
import './createQuiz.scss';
import * as yup from 'yup';
interface props {
  viewer: Viewer
}

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required'),
  creator: yup
    .string()
    .required('Creator ID is required'),
  questions: yup
    .array().of(
      yup.object().shape({
        question: yup.string().min(4, "Question should be greater than 4 characters!"),
        answerType: yup.mixed().oneOf([AnswerFormat.Multiplechoice, AnswerFormat.Truefalse]).defined().required("Required"),
        answerOptions: yup.array().of(
          yup.object().shape({
            isCorrect: yup.boolean(),
            answerText: yup.string().min(1)
          }).required("Required"),
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
        placeholder={`Question/Prompt`}
        fullWidth
        sx={{ paddingTop: "0.5rem", gridColumn: 4 }}
      />
      {!!touched && errors && <div>{errorMessage}</div>}
    </>
  )
}

// TODO: Click to switch answerOption value from True to False
const checkInput = ({ field, form: { errors, touched } }: FieldProps) => {
  const errorMessage = getIn(errors, field.name)
  return (
    <div>
      <Field 
        type="checkbox" 
        name={field.name}
        default={true}
        sx={{ padding: "0.5rem", gridColumn: 4 }}
      />
      <Typography>{`${field.value}`}</Typography>
      {!!touched && errors && <div>{errorMessage}</div>}
    </div>
  )
}

export const QuizCreate = ({ viewer }: props) => {
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
                label="Assessment Title"
                value={values.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                sx={{
                  gridColumn: 3
                }}
              />
              <FieldArray name="questions">
              {({ insert, remove, push }) => (
                <div>
                  {values.questions.length > 0 && 
                    values.questions.map((question: any, index: number) =>  {
                      return (
                        <div className='row' key={index}>
                          <div className='col' key={index}>
                            <Field 
                              name={`questions[${index}].question`}
                              component={Input}
                            />
                            <Tooltip title="Remove question">
                              <Button onClick={() => remove(index)}>
                                  X
                              </Button>
                            </Tooltip>
                          </div>
                            <FormLabel>Answer Type</FormLabel>
                            <RadioGroup defaultValue={"TRUEFALSE"}>
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
                              /* TODO: disable remove button on last item and only render +/- buttons when last index of array */
                              <FieldArray name={`questions[${index}].answerOptions`}>
                                {({ insert, remove, push }) => (
                                  <div>
                                    {values.questions[index].answerOptions.length > 0 &&
                                      values.questions[index].answerOptions.map((option: any, indy: number) => {
                                        return (
                                          <div className="quiz__multiAnswerArea">
                                            <div className="quiz__multiAnswers">
                                            <Field 
                                              name={`questions[${index}].answerOptions[${indy}].isCorrect`} 
                                              component={checkInput} 
                                            />
                                            <TextField 
                                              label="Enter Answer Option"
                                              fullWidth
                                              sx={{ marginTop: 2 }}
                                              name={`questions[${index}].answerOptions[${indy}].answerText`}
                                              onChange={handleChange}
                                            /> 
                                            <Tooltip title="Add another answer option">
                                              <Button 
                                                onClick={() => push({ answerText: "", isCorrect: false })}
                                              >
                                                +
                                              </Button>
                                            </Tooltip>
                                            <Tooltip title="Remove answer option">
                                              <Button 
                                                onClick={() => remove(indy)}
                                              >
                                                -
                                              </Button>
                                            </Tooltip>
                                          </div>
                                        </div> 
                                        )
                                      })}
                                  </div>
                                )}
                            </FieldArray>
                            ) : (
                              <>
                              </>
                            )}
                            {question.answerType === "TRUEFALSE" ? (
                              /* TODO: disable remove button on last item and only render +/- buttons when last index of array */
                              <FieldArray name={`questions[${index}].answerOptions`}>
                                {({ insert, remove, push }) => (
                                  <div>
                                    {values.questions[index].answerOptions.length > 0 &&
                                      values.questions[index].answerOptions.map((option: any, indy: number) => {
                                        return (
                                          <div className="quiz__multiAnswerArea">
                                            <div className="quiz__multiAnswers">
                                            <Field 
                                              name={`questions[${index}].answerOptions[${indy}].isCorrect`} 
                                              component={checkInput} 
                                            />
                                          </div>
                                        </div> 
                                        )
                                      })}
                                  </div>
                                )}
                            </FieldArray>
                            ) : (
                              <>
                              </>
                            )}
                        </div>
                      )
                    })}
                    <Button onClick={() => push({ question: '', answerType: AnswerFormat, 
                      answerOptions: [  
                        { answerText: "", isCorrect: true },
                      ] })}
                    >
                      Add Question
                    </Button>
                </div>
              )}
              </FieldArray>
              <Button type="submit">Submit</Button>
              {/* UNCOMMENT TO DISPLAY MUTATION CONSTRUCTION
              <pre>
                {JSON.stringify(values, null, 2)}
              </pre>
              <pre>
                {JSON.stringify(errors, null, 2)}
              </pre> */}
          </form>
        )}
      </Formik>
    </Box>
  )
}