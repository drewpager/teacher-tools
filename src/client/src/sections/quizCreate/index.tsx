import React, { useState, useEffect } from 'react';
import { FieldArray, Formik, getIn, FieldProps, Field } from 'formik';
import { useCreateQuizMutation, Viewer, AnswerFormat } from '../../graphql/generated';
import {
  Box,
  TextField,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Tooltip,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
  Select,
  MenuItem
} from '@mui/material'
import { Cancel, ControlPoint, Remove } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { DisplayError } from '../../lib/utils';
import { ReactComponent as PeachIcon } from '../../lib/assets/peach-logo.svg';
import { Footer } from '../../lib/components';
import './createQuiz.scss';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { FeedbackModal } from '../Contact/FeedbackModal';

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
        placeholder={`Question`}
        fullWidth
        sx={{ paddingTop: "0.5rem", gridColumn: 4 }}
      />
      {!!touched && errors && <div>{errorMessage}</div>}
    </>
  )
}

// TODO: Click to switch answerOption value from True to False
const checkInput = ({ field, form: { errors, touched, setFieldValue } }: FieldProps) => {
  const errorMessage = getIn(errors, field.name)

  return (
    <div>
      <IconButton
        // onClick={() => field.name = !field.value}
        onClick={() => setFieldValue(field.name, !field.value)}
        disableRipple
        disableFocusRipple
      >
        <Tooltip title={field.value ? "This is a true/correct answer" : "This is a false/incorrect answer"}>
          <CheckCircleIcon
            {...field}
            name={field.name}
            className="button--check"
            color={field.value ? "success" : "info"}
          />
        </Tooltip>
      </IconButton>
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
      <FeedbackModal />
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
                answerType: AnswerFormat.Multiplechoice || AnswerFormat.Truefalse,
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
                label="Enter assessment title"
                value={values.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                className="quizCreate--title"
                variant="standard"
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
                                placeholder={`Question`}
                                fullWidth
                                sx={{ paddingTop: "1rem", gridColumn: 4 }}
                                name={`questions[${index}].question`}
                                onChange={handleChange}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <DeleteForeverIcon onClick={() => remove(index)} className="button--cancel" />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </div>
                            <Select
                              variant='outlined'
                              onChange={handleChange}
                              fullWidth
                              defaultValue={`MULTIPLECHOICE`}
                              inputProps={{
                                name: `questions[${index}].answerType`,
                              }}
                              className="quizCreate--answerType-select"
                            >
                              <MenuItem value={`MULTIPLECHOICE`}>Multiple Choice</MenuItem>
                              <MenuItem value={`TRUEFALSE`}>True/False</MenuItem>
                            </Select>
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
                                              <Tooltip title="Remove answer option" className="quiz--modicons">
                                                <RemoveCircleOutlineIcon onClick={() => remove(indy)} />
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
                    <div className="add--question-box">
                      <IconButton
                        className="quiz--button-add"
                        onClick={() => push({
                          question: '', answerType: AnswerFormat.Multiplechoice,
                          answerOptions: [
                            { answerText: "", isCorrect: true },
                          ]
                        })}
                        disableRipple
                        disableFocusRipple
                      >
                        <AddCircleIcon fontSize='large' />
                        <Typography variant="h4" className="addQuestion--text">Add Question</Typography>
                      </IconButton>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="quiz--button-area">
                <Link to={`../user/${viewer.id}`} style={{ textDecoration: "none" }}>
                  <Typography variant="h4" className="quiz--button-cancel">Cancel</Typography>
                </Link>
                <Button
                  variant="outlined"
                  type="submit"
                  className="quiz--button-submit"
                >Save Assessment</Button>
              </div>
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