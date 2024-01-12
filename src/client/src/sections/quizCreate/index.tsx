import React, { useState, useEffect, useCallback } from 'react';
import { FieldArray, Formik, getIn, FieldProps, Field } from 'formik';
import { useCreateQuizMutation, Viewer, AnswerFormat, useGenerateQuizMutation, QuestionInput, Questions } from '../../graphql/generated';
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
  MenuItem,
  Switch,
  Fab,
  Modal,
  Slider,
  Alert
} from '@mui/material'
import { Cancel, ControlPoint, Remove } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useNavigate, useLocation } from 'react-router-dom';
import { DisplayError } from '../../lib/utils';
import { ReactComponent as PeachIcon } from '../../lib/assets/peach-logo.svg';
import { Footer } from '../../lib/components';
import './createQuiz.scss';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { FeedbackModal } from '../Contact/FeedbackModal';
import { styled } from '@mui/material/styles';
import { VideoPlayer } from '../../lib/components';
import InfoIcon from '@mui/icons-material/Info';

interface props {
  viewer: Viewer
}

interface QuestionsProps {
  questions: [
    {
      question: string,
      answerType: AnswerFormat,
      answerOptions: {
        answerText: string,
        isCorrect: boolean
      }[],
    },
  ]
}

interface QuestionProps {
  question: string,
  answerType: AnswerFormat,
  answerOptions: {
    answerText: string,
    isCorrect: boolean
  }[],
}

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required'),
  creator: yup
    .string()
    .required('Creator ID is required'),
  public: yup
    .boolean(),
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

const LockSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 2,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M22 4v-.5C22 2.12 20.88 1 19.5 1S17 2.12 17 3.5V4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-.8 0h-3.4v-.5c0-.94.76-1.7 1.7-1.7s1.7.76 1.7 1.7V4zm-2.28 8c.04.33.08.66.08 1 0 2.08-.8 3.97-2.1 5.39-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H7v-2h2c.55 0 1-.45 1-1V8h2c1.1 0 2-.9 2-2V3.46c-.95-.3-1.95-.46-3-.46C5.48 3 1 7.48 1 13s4.48 10 10 10 10-4.48 10-10c0-.34-.02-.67-.05-1h-2.03zM10 20.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 16v1c0 1.1.9 2 2 2v1.93z" /></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 25 25"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Input = ({ field, form: { errors, touched } }: FieldProps) => {
  const errorMessage = getIn(errors, field.name);

  return (
    <>
      <TextField
        {...field}
        placeholder={`Question`}
        fullWidth
        sx={{ paddingTop: "0.5rem", gridColumn: 4 }}
        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
  const { pathname } = useLocation();
  const [locked, setLocked] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [generateQuizOpen, setGenerateQuizOpen] = useState(false);
  const [mcNums, setMcNums] = useState<number>(0);
  const [tfNums, setTfNums] = useState<number>(0);
  const [nums, setNums] = useState<number>(0);
  const [subject, setSubject] = useState<string>("");
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionsProps>();
  const [aiValues, setAiValues] = useState<QuestionProps[]>([]);
  const [aiDisclaimer, setAiDisclaimer] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  const [generateQuiz, { loading: generateQuizLoading, error: generateQuizError }] = useGenerateQuizMutation({
    variables: {
      numMcQuestions: 0,
      numTfQuestions: 0,
      subject: ""
    }
  })

  const handleClose = () => {
    setOpen(false);
  }

  const handlePlayVideo = () => {
    setOpen(true);
  }

  const handleGenerateQuiz = async () => {
    setGenerateQuizOpen(true);
  }

  const handleGenerateClose = () => {
    setGenerateQuizOpen(false);
  }

  const handleMcSlideChange = (event: Event, newValue: number | number[]) => {
    setMcNums(newValue as number);
  };

  const handleTfSlideChange = (event: Event, newValue: number | number[]) => {
    setTfNums(newValue as number);
  };

  const handleResetQuiz = () => {
    setGenerateQuizOpen(false);
    setSubject("");
    setMcNums(0);
    setTfNums(0);
    setNums(0);
    setReady(false);
  }

  const handleQuizGenerate = async () => {
    try {
      const res = await generateQuiz({
        variables: {
          numMcQuestions: mcNums,
          numTfQuestions: tfNums,
          subject: subject
        }
      })

      setNums(mcNums + tfNums);

      if (generateQuizError) {
        console.log("Error from within: ", generateQuizError);
      }

      if (generateQuizLoading) {
        console.log("Loading...");
      }

      res && setGeneratedQuestions(res?.data?.generateQuiz)
      setAiValues([...JSON.parse(`${generatedQuestions}`).questions]);
      setReady(true)
    } catch (e) {
      return (<Alert title="AI Quiz Generation Failed, Please Try Again" color='warning' />)
    }
  }

  const handleQuizGenerateUpdate = (values: any) => {
    if (aiValues.length > 0) {
      values.questions.splice(0, 1);
      for (let i = 0; i < nums; i++) {
        values.questions.push({
          question: aiValues[i].question,
          answerType: aiValues[i].answerType,
          answerOptions: [...aiValues[i].answerOptions]
        });
      }
      setAiDisclaimer(true);
      handleResetQuiz();
    }
  }

  const quizCreatePage: boolean = pathname === "/quiz/create";

  const [createQuiz, { loading, error }] = useCreateQuizMutation({
    variables: {
      input: {
        title: "",
        questions: [{}],
        creator: "",
        public: locked
      }
    }
  });

  // if (!viewer.id) {
  //   return (
  //     <>
  //       {navigate('/login', { replace: true })}
  //       <Footer />
  //     </>
  //   )
  // }

  if (loading) {
    <Box sx={{ marginTop: 15 }}>
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
      {quizCreatePage ? (<FeedbackModal />) : (<></>)}
      <Box className="breadcrumb">
        {/* {quizCreatePage ? (
          <Link to={`../user/${viewer.id}`}>
            <p>⟨ Back to dashboard</p>
          </Link>
        ) : (<></>)} */}
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <h1>Create Assessment</h1>
          <Tooltip title="Watch quick demo">
            <IconButton
              disableRipple
              onClick={handlePlayVideo}
            >
              <InfoIcon sx={{ color: "#000", marginLeft: "0.5rem" }} />
            </IconButton>
          </Tooltip>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="platos-peach-demo-videon"
            aria-describedby="platos-peach-demo-video-description"
          >
            <Box className="demo-video--modal">
              <Box>
                <Fab aria-label="cancel" onClick={handleClose} sx={{ justifySelf: "right", mb: "5px" }}>
                  X
                </Fab>
              </Box>
              <VideoPlayer url="https://res.cloudinary.com/drewpager/video/upload/v1703890959/platos-peach-video/create-assessment-overview_k3v7j4.mov" />
            </Box>
          </Modal>
          {!viewer.id ? (
            <Tooltip title="Must be a paying user to use AI Quiz Generator">
              <IconButton
                onClick={() => !viewer.id ? navigate('/signup', { replace: true }) : null}
                disableRipple
                disableFocusRipple
                className="quiz--ai-button"
              >
                <AutoFixHighIcon color="warning" /> <Typography variant="body1" className='quiz--ai-text'> AI Quiz Generator</Typography>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Generate Quiz with AI">
              <IconButton
                onClick={() => handleGenerateQuiz()}
                disableRipple
                disableFocusRipple
                className="quiz--ai-button"
              >
                <AutoFixHighIcon /> <Typography variant="body1" className='quiz--ai-text'> AI Quiz Generator</Typography>
              </IconButton>
            </Tooltip>
          )}
        </Box>
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
            public: locked
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await createQuiz({
              variables: {
                input: values
              }
            });
            if (pathname === "/quiz/create") {
              navigate(`../user/${viewer.id}`, { replace: true })
            } else {
              window.location.reload();
            }
          }}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              {aiDisclaimer && (<Typography variant="h5" sx={{ color: "#BC4710" }}>Please confirm AI generated quiz is correct before saving. Large language models are known to hallucinate.</Typography>)}
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
              // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              />
              {/* {generateQuizOpen && aiValues.length > 0 && handleQuizGenerateUpdate(values)} */}
              {ready && handleQuizGenerateUpdate(values)}
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
                                value={`${values.questions[index].question}`}
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
                              value={`${values.questions[index].answerType}`}
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
                                    {/* {!!aiValues && values.questions[index].answerOptions === aiValues[0].answerOptions} */}
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
                                                value={`${values.questions[index].answerOptions[indy].answerText}`}
                                                onChange={handleChange}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                              />
                                              <Button onClick={() => push({ answerText: "", isCorrect: false })} className="quiz--modicon-button" disableRipple disableFocusRipple>
                                                <Tooltip title="Add another answer option" className="quiz--modicons">
                                                  <ControlPoint />
                                                </Tooltip>
                                              </Button>
                                              <Button onClick={() => remove(indy)} className="quiz--modicon-button" disableRipple disableFocusRipple>
                                                <Tooltip title="Remove answer option" className="quiz--modicons">
                                                  <RemoveCircleOutlineIcon />
                                                </Tooltip>
                                              </Button>
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
              <Box sx={{ display: "flex", marginTop: "1rem" }}>
                <Tooltip title={viewer.paymentId !== null ? "Make Private/Public" : "Public Content Restricted to Paying Users"}>
                  <LockSwitch checked={!locked} onChange={() => { setLocked(!locked); values.public = !locked }} disabled={viewer.paymentId === null} />
                </Tooltip>
                <Tooltip title={viewer.paymentId !== null ? "Make Private/Public" : "Public Content Restricted to Paying Users"}>
                  <Typography variant="body1" color={!locked ? "error" : "success"}>{!locked ? "Private" : "Public"}</Typography>
                </Tooltip>
              </Box>
              <div className="quiz--button-area">
                <Button
                  variant="outlined"
                  type="submit"
                  className="quiz--button-submit"
                  disabled={values.title.length === 0 || values.questions[0].question.length === 0}
                >Save Assessment</Button>
                {!viewer.id && (
                  <Link to="/login" style={{ textDecoration: "none", color: "#BC4710" }}>
                    <Typography variant="body2">Login required</Typography>
                  </Link>)}
                {quizCreatePage ? (
                  <Link to={`../user/${viewer.id}`} style={{ textDecoration: "none" }}>
                    <Typography variant="h4" className="quiz--button-cancel">Cancel</Typography>
                  </Link>
                ) : (<Typography variant="h5">Click away to close</Typography>)}
              </div>
              <Modal
                open={generateQuizOpen}
                onClose={handleGenerateClose}
                aria-labelledby="platos-peach-demo-videon"
                aria-describedby="platos-peach-demo-video-description"
              >
                <Box className="demo-video--modal">
                  <Box>
                    <Fab aria-label="cancel" onClick={handleGenerateClose} sx={{ justifySelf: "right", mb: "5px" }}>
                      X
                    </Fab>
                  </Box>
                  <Box className="generate-quiz--modal">
                    {viewer.paymentId === null && setTfNums(2)}
                    {viewer.paymentId === null && setMcNums(2)}
                    {viewer.paymentId === null && (<Typography variant="body2" color="error" sx={{ m: "1rem" }}>Free Plan Limited to 4 AI Generated Quiz Questions</Typography>)}
                    <Typography variant="h3" sx={{ m: "1rem" }}>AI Quiz Generator</Typography>
                    <Typography variant="h4" sx={{ m: "1rem" }}>How many multiple choice questions?</Typography>
                    <Slider
                      aria-label="Multichoice Questions"
                      value={mcNums}
                      onChange={viewer.paymentId !== null ? handleMcSlideChange : () => { }}
                      valueLabelDisplay="on"
                      step={1}
                      marks
                      min={0}
                      max={10}
                      sx={{ m: "1rem", width: "90%", color: "#3A70CD" }}
                    />
                    <Typography variant="h4" sx={{ m: "1rem" }}>How many true/false questions?</Typography>
                    <Slider
                      aria-label="Multichoice Questions"
                      value={tfNums}
                      onChange={viewer.paymentId !== null ? handleTfSlideChange : () => { }}
                      valueLabelDisplay="on"
                      step={1}
                      marks
                      min={0}
                      max={10}
                      sx={{ m: "1rem", width: "90%", color: "#3A70CD" }}
                    />
                    <Typography variant="h4" sx={{ m: "1rem" }}>What subject?</Typography>
                    <TextField
                      label="Subject"
                      variant="outlined"
                      sx={{ m: "1rem", width: "90%" }}
                      placeholder='The Cuban Missile Crisis'
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ ml: "1rem" }}
                      disabled={(subject === "") || (mcNums === 0 && tfNums === 0)}
                      onClick={handleQuizGenerate}
                    >Generate Quiz {generateQuizLoading && <CircularProgress size={20} sx={{ ml: 1, color: "#FFF" }} />}</Button>
                  </Box>
                </Box>
              </Modal>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  )
}