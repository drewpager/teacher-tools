import { CircularProgress, Grid, Box, Card, TextField, Button, Switch, FormControlLabel, Chip, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DoneIcon from '@mui/icons-material/Done';
import React, { useState, ChangeEvent, useRef, useEffect, useReducer } from 'react';
import {
  FullLessonInput,
  useLessonPlanMutation,
  useAllLessonsQuery,
  useAllQuizzesQuery,
  Viewer,
  FullLessonQuiz,
  Plan,
  useUserQuery
} from '../../graphql/generated';
import { DisplayError } from '../../lib/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { UseModal } from '../Modal';
import './createPlaylist.scss';
import { Link } from 'react-router-dom';
import { CreatePlaylistCard, Footer } from '../../lib/components';
import theme from '../../theme';

type props = {
  viewer: Viewer;
}

type InputLessonPlan = {
  name: string,
  creator: string,
  plan: Plan[]
}

const initialData: InputLessonPlan = {
  name: "",
  creator: "",
  plan: []
}


export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [])

  return ref;
}


function reducer(state: any, action: any) {
  switch (action.type) {
    case "lessonOnly":
      return { lessons: state.lessons, quizzes: state.quizzes, };
    case "quizOnly":
      return { lessons: state.lessons, quizzes: state.quizzes };
    default:
      return { lessons: state.lessons, quizzes: state.quizzes };
  }
}

export const CreatePlaylist = ({ viewer }: props) => {
  let navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("")
  const [variant, setVariant] = useState<boolean>(true)
  const [variantAssessment, setVariantAssessment] = useState<boolean>(true)
  const [variants, setVariants] = useState<boolean[]>([variant, variantAssessment])
  const [lessons, setLessons] = useState<Array<Plan>>([])
  const [quizzes, setQuizzes] = useState<Array<Plan>>([])
  const [plans, setPlans] = useState<Array<Plan>>([])
  const [filter, setFilter] = useState<Array<Plan>>([])
  const [yourContent, setYourContent] = useState<boolean>(false);
  const inputRef = useFocus();
  const [playlist, setPlaylist] = useState<InputLessonPlan>(initialData)
  const [state, dispatch] = useReducer(reducer, { lessons: [...lessons], quizzes: [...quizzes] })

  const limit: number = 700;
  const page: number = 1;

  const { data: userData, loading: userLoading, error: userError } = useUserQuery({
    variables: {
      id: `${viewer.id}`,
      playlistsPage: 0,
      lessonsPage: 0,
      quizzesPage: 0,
      limit: 0
    }
  });

  const { data: lessonData, loading: lessonLoading, error: lessonError } = useAllLessonsQuery({
    variables: {
      limit: limit,
      page: page
    }
  })

  const { data: quizData, loading: quizLoading, error: quizError } = useAllQuizzesQuery({
    variables: {
      limit: limit,
      page: page
    }
  })

  const [lessonPlan, { loading, error }] = useLessonPlanMutation({
    variables: {
      input: playlist
    }
  })


  const lessonQuery = lessonData ? lessonData.allLessons.result : null;
  const quizQuery = quizData ? quizData.allquizzes.result : null;
  const bookmarkQuery = userData ? userData.user.bookmarks : null;

  useEffect(() => {
    if (lessonQuery) {
      const lessonInput: FullLessonInput[] = []
      lessonQuery.forEach(i => {
        let lessonObj = {
          title: i.title,
          category: i.category,
          creator: i.creator,
          endDate: i.endDate,
          image: i.image,
          meta: i.meta,
          startDate: i.startDate,
          video: i.video,
          _id: i.id
        }
        lessonInput.push(lessonObj);
      })

      setFilter(lessonInput)
      setPlans(lessonInput)
      setLessons(lessonInput)
    }
    if (quizQuery) {
      const quizInput: FullLessonQuiz[] = []
      quizQuery.forEach(q => {
        let quizObj = {
          creator: q.creator,
          _id: q.id,
          title: q.title,
          questions: [...q.questions]
        }
        quizInput.push(quizObj)
      })

      setFilter(f => [...f, ...quizInput])
      setPlans(p => [...p, ...quizInput])
      setQuizzes(quizInput)
    }
  }, [lessonQuery, quizQuery])

  if (!viewer.id) {
    return (
      <>
        {navigate('/login', { replace: true })}
        <DisplayError title="Must be logged in to create a playlist!" />
        <Footer />
      </>
    )
  }

  const titleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const name = e.target.value;
    setPlaylist({
      ...playlist,
      name: name,
      creator: viewer && viewer.id ? viewer.id : "0"
    })
  }

  if (lessonLoading || quizLoading) {
    return <CircularProgress />
  }

  if (lessonError || quizError) {
    return <DisplayError title="Failed to query lesson plan items" />
  }


  const onDragEndHandler = (result: any) => {
    const { destination, source } = result;

    // if there is no droppable destination, simply return.
    if (!destination) {
      return;
    }

    // Otherwise, cut the item from lessons array and push to new playlist
    let items = plans;

    // Allow the user to reorder playlist if failed to drag and drop in correct order
    if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const [reorderedPlaylistItem] = playlist.plan.splice(source.index, 1);
      const displacedPlaylistItem = playlist.plan.slice(destination.index, (destination.index + 1));
      playlist.plan[destination.index] = reorderedPlaylistItem;
      playlist.plan.splice((destination.index + 1), 0, ...displacedPlaylistItem);

      return { ...playlist }
    }

    // if dragging and dropping within lessons simply return items unchanged
    if (source.droppableId === "lessons" && destination.droppableId === "lessons") {
      const [reorderedLesson] = items.splice(source.index, 1);
      const displacedLesson = items.slice(destination.index, (destination.index + 1));
      items[destination.index] = reorderedLesson;
      items.splice((destination.index + 1), 0, ...displacedLesson)
      // items.push(...displacedLesson);

      return { ...items }
    }

    if (destination.droppableId === "playlist") {

      const [reorderedItem] = items.splice(source.index, 1);
      setPlans([...items]);
      const displacedItem = playlist.plan.slice(destination.index, (destination.index + 1));
      playlist.plan[destination.index] = reorderedItem;
      playlist.plan.push(...displacedItem)

      setPlaylist(playlist)
    }

    if (destination.droppableId === "lessons") {
      const [reorderedPlay] = playlist.plan.splice(source.index, 1);
      const displacedPlay = items.slice(destination.index, (destination.index + 1));
      items[destination.index] = reorderedPlay;
      items.push(...displacedPlay)

      setPlans([...items])
      setPlaylist(playlist)
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    let enteredSearch = e.target.value;
    setSearchInput(enteredSearch)

    if (enteredSearch) {
      const filteredLessons = plans.filter((plan) => plan?.title?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
      setPlans(filteredLessons)
    }

    if (enteredSearch === '') {
      setPlans(filter.filter(val => !playlist.plan.includes(val)))
      // setFilter(lessons)
    }
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (playlist && playlist.plan) {
      await lessonPlan({
        variables: {
          input: playlist
        }
      });
    }
    // Navigate to User Profile Page
    playlist.plan.length = 0;
    navigate(`../user/${viewer.id}`, { replace: true })
  }

  const handleLessonClick = () => {
    setVariant(!variant)
    dispatch({ type: "lessonOnly" })
  }

  const handleAssessmentClick = () => {
    setVariantAssessment(!variantAssessment)
    dispatch({ type: "quizOnly" })
  }

  if (error) {
    return <DisplayError title="Lesson Plan Creation Failed!" />
  }

  if (loading) {
    return <CircularProgress color='primary' />
  }

  return (
    <div>
      <Box className="createPlaylist--box">
        <h1 className='createPlaylist--h1'>Create Lesson Plan</h1>
        <form onSubmit={handleSubmit}>
          <DragDropContext onDragEnd={onDragEndHandler}>
            <Grid container>
              <Droppable droppableId='playlist'>
                {(provided, snapshot) => (
                  <Grid item xs={12} sm={6} md={8} lg={8}>
                    <Card variant="outlined" sx={{ minHeight: "750px", padding: 5, margin: 2 }} {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                      <TextField
                        label="Lesson Plan Title"
                        id="lesson-plan-title"
                        variant="standard"
                        ref={inputRef}
                        fullWidth
                        onChange={titleHandler}
                      />
                      {playlist.plan.map((i, indices) => (
                        <Draggable draggableId={`${i._id}`} index={indices} key={`${i._id}`}>
                          {(provided, snapshot) => (
                            <Grid item xs={12} md={12} lg={12}>
                              <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                {i.questions ? (
                                  <Card className="lesson--card">
                                    {i.title} <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                                  </Card>
                                ) : (
                                  <CreatePlaylistCard {...i} />
                                )}
                              </div>
                            </Grid>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Card>
                  </Grid>
                )}
              </Droppable>
              <Droppable droppableId='lessons'>
                {(provided, snapshot) => (
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControlLabel
                      control={<Switch
                        sx={{ m: 1 }}
                        checked={!yourContent}
                        onChange={() => setYourContent(!yourContent)}
                      />}
                      label={yourContent ? "Viewing Your Content Only" : "Viewing All Public Content"}
                    />
                    {/* <Chip
                    label="Lessons"
                    variant={variant ? "filled" : "outlined"}
                    onClick={() => handleLessonClick()}
                    onDelete={() => handleLessonClick()}
                    deleteIcon={variant ? undefined : <DoneIcon />}
                  />
                  <Chip
                    label="Assessments"
                    variant={variantAssessment ? "filled" : "outlined"}
                    onClick={() => handleAssessmentClick()}
                    onDelete={() => handleAssessmentClick()}
                    deleteIcon={variantAssessment ? undefined : <DoneIcon />}
                  /> */}
                    <Card variant="outlined" className="createPlaylist--card" {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                      <TextField
                        variant='outlined'
                        id="lesson-search"
                        label="Search Lessons"
                        value={searchInput}
                        onChange={inputHandler}
                        ref={inputRef}
                        className="createPlaylist--search"
                      />
                      <Grid container>
                        {plans.map((i, index) => (
                          yourContent && (bookmarkQuery?.find((val) => val?.id === i._id) || (i.creator === viewer.id)) ? (
                            <Draggable draggableId={`${i._id}`} index={index} key={`${i._id}`}>
                              {(provided) => (
                                <Grid item xs={12} md={12} lg={12}>
                                  {/* {!i && <Link to="/create/lesson"><Typography variant="h5">You haven't added any content yet, click here to add your first lesson.</Typography></Link>} */}
                                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                    {i.questions ? (
                                      <Card className="lesson--card" sx={{ padding: 2, margin: 1 }}>
                                        {JSON.parse(JSON.stringify(i)).title} <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                                      </Card>
                                    ) : (
                                      <CreatePlaylistCard {...i} />
                                    )}
                                  </div>
                                </Grid>
                              )}
                            </Draggable>
                          ) : !yourContent && i.creator !== viewer.id && (
                            <Draggable draggableId={`${i._id}`} index={index} key={`${i._id}`}>
                              {(provided) => (
                                <Grid item xs={12} md={12} lg={12}>
                                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                    {i.questions ? (
                                      <Card className="lesson--card" sx={{ padding: 2, margin: 1 }}>
                                        {JSON.parse(JSON.stringify(i)).title} <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                                      </Card>
                                    ) : (
                                      <CreatePlaylistCard {...i} />
                                    )}
                                  </div>
                                </Grid>
                              )}
                            </Draggable>
                          )
                        ))}
                        {provided.placeholder}
                      </Grid>
                    </Card>
                    <Grid container>
                      <UseModal viewer={viewer} />
                    </Grid>
                  </Grid>
                )}
              </Droppable>
            </Grid>
          </DragDropContext>
          <Button className="createPlaylist--button" variant='contained' type='submit'>Create</Button>
        </form >
      </Box>
      <Footer viewer={viewer} />
    </div>
  )
}
