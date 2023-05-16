import React from 'react';
import { FieldArray, Formik, getIn, FieldProps, Field } from 'formik';
import { useCreateQuizMutation, Viewer, AnswerFormat } from '../../graphql/generated';
import { Box, TextField, FormLabel, FormControlLabel, Radio, RadioGroup, Typography, Tooltip, Button, CircularProgress, InputAdornment } from '@mui/material'
import { Cancel, ControlPoint, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DisplayError } from '../../lib/utils';
import { ReactComponent as PeachIcon } from '../../lib/assets/peach-logo.svg';
import { Footer } from '../../lib/components';
import './createQuiz.scss';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
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
    <div>
      <Box className="breadcrumb">
        <Link to={`../user/${viewer.id}`}>
          <p>⟨ Back to dashboard</p>
        </Link>
        <h1>Create Assessment</h1>
      </Box>
      <Box className="quizCreate--form">
        <Formik
          initialValues={{
            title: "",
            questions: [
              {
                question: "",
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
                input: values
              }
            });

            navigate(`../user/${viewer.id}`, { replace: true })
          }}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              {/* <div className="assessment--heading">
                <h1>Create Assessment</h1>
                <PeachIcon className="peach--icon" />
              </div> */}
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
                      values.questions.map((question: any, index: number) => {
                        return (
                          <div className='row' key={index}>
                            <div className='col' key={index}>
                              <TextField
                                placeholder={`Question/Prompt`}
                                fullWidth
                                sx={{ paddingTop: "0.5rem", gridColumn: 4 }}
                                name={`questions[${index}].question`}
                                onChange={handleChange}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Cancel onClick={() => remove(index)} className="button--cancel" />
                                    </InputAdornment>
                                  )
                                }}
                              />
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
                                              <Tooltip title="Add another answer option" className="quiz--modicons">
                                                <ControlPoint onClick={() => push({ answerText: "", isCorrect: false })} />
                                              </Tooltip>
                                              {(indy === 0) ? (
                                                <>
                                                </>
                                              ) : (
                                                <Tooltip title="Remove answer option" className="quiz--modicons">
                                                  <Remove onClick={() => remove(indy)} />
                                                </Tooltip>
                                              )}
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
                    <Button
                      variant="outlined"
                      className="quiz--button-add"
                      onClick={() => push({
                        question: '', answerType: AnswerFormat,
                        answerOptions: [
                          { answerText: "", isCorrect: true },
                        ]
                      })}
                    >
                      Add Question
                    </Button>
                  </div>
                )}
              </FieldArray>
              <Button
                variant="outlined"
                type="submit"
                className="quiz--button-submit"
              >Submit</Button>
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
    </div>
  )
}