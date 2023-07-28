import { CircularProgress, Grid, Box, Card, TextField, Button, Switch, FormControlLabel, Chip, Avatar, Typography, CardMedia, InputAdornment } from '@mui/material';
import { Close } from '@mui/icons-material';
import React, { useState, ChangeEvent, useRef, useEffect, useReducer, useMemo } from 'react';
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
import { DisplayError, titleCase } from '../../lib/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { UseModal } from '../Modal';
import './createPlaylist.scss';
import { Link } from 'react-router-dom';
import { CreatePlaylistCard, Footer } from '../../lib/components';
import theme from '../../theme';
import { FeedbackModal } from '../Contact/FeedbackModal';
import HowItWorks from '../../lib/assets/how-it-works-3.png';

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
  const [searchError, setSearchError] = useState<boolean>(false)
  const [variant, setVariant] = useState<boolean>(true)
  const [cater, setCater] = useState<Array<boolean>>([])
  const [variantAssessment, setVariantAssessment] = useState<boolean>(true)
  const [filled, setFilled] = useState<boolean>(true)
  const [lessons, setLessons] = useState<Array<Plan>>([])
  const [quizzes, setQuizzes] = useState<Array<Plan>>([])
  const [plans, setPlans] = useState<Array<Plan>>([])
  const [filter, setFilter] = useState<Array<Plan>>([])
  const [yourContent, setYourContent] = useState<boolean>(false);
  const inputRef = useFocus();
  const [playlist, setPlaylist] = useState<InputLessonPlan>(initialData)
  const [state, dispatch] = useReducer(reducer, { lessons: [...lessons], quizzes: [...quizzes] })

  const limit: number = 1000;
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
      input: playlist,
      viewerId: `${viewer.id}`
    }
  })

  const lessonQuery = useMemo(() => { return lessonData?.allLessons.result }, [lessonData])
  // let lessonQuery = lessonData ? lessonData.allLessons.result : null;
  let quizQuery = quizData ? quizData.allquizzes.result : null;
  let bookmarkQuery = userData ? userData.user.bookmarks : null;

  useEffect(() => {
    if (window.localStorage.getItem("playlist")?.length) {
      setPlaylist(JSON.parse(`${window?.localStorage?.getItem("playlist")}`))
    } else {
      setPlaylist(initialData);
    }
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem("playlist")?.length) {
      setPlaylist(JSON.parse(`${window?.localStorage?.getItem("playlist")}`))
    }

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
  }, [lessonQuery, quizQuery, quizData, lessonData])

  if (!viewer.id) {
    return (
      <>
        {navigate('/login', { replace: true })}
        <DisplayError title="Must be logged in to create a playlist!" />
        <Footer />
      </>
    )
  }

  // Filtering functions
  function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  function onlyDefined(value: { main: string, secondary: undefined | string }, index: number, self: any) {
    return value.secondary !== undefined
  }

  // Isolate the main and any secondary categories
  const categor = lessonData?.allLessons.result;
  const mainCategoryArray: any[] = [];
  const secondaryCategory: any = [{}];
  const allCategories: any[] = [];
  categor?.map((i) => mainCategoryArray.push(i?.category ? i.category[0]?.trim() : undefined))
  categor?.map((i) => allCategories.push(i?.category ? i.category.map(item => item?.trim()) : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[1]?.trim() } : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[2]?.trim() } : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[3]?.trim() } : undefined))
  const mainCategories = mainCategoryArray.filter(onlyUnique)
  let secCategories = secondaryCategory.filter(onlyDefined)
  const secondaryCategories = new Map(secCategories.map((item: any) =>
    [item["secondary"], item])).values();

  const combinedCategories = Array.from(secondaryCategories)
  // const selectedSecondary = allCategories.filter((b) => b.includes(selected[0]));
  // setCater(mainCategories.map((i) => false))
  const titleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    let name = e.target.value;
    setPlaylist({
      plan: [...playlist.plan],
      name: name,
      creator: viewer && viewer.id ? viewer.id : "0"
    })
    window.localStorage.setItem('playlist', JSON.stringify(playlist));
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
      window.localStorage.setItem('playlist', JSON.stringify(playlist));
    }

    if (destination.droppableId === "lessons") {
      const [reorderedPlay] = playlist.plan.splice(source.index, 1);
      const displacedPlay = items.slice(destination.index, (destination.index + 1));
      items[destination.index] = reorderedPlay;
      items.push(...displacedPlay)

      setPlans([...items])
      setFilter([...items])
      setPlaylist(playlist)
      window.localStorage.setItem('playlist', JSON.stringify(playlist));
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    let enteredSearch = e.target.value;
    setSearchInput(enteredSearch)

    if (enteredSearch) {
      const filteredLessons = plans.filter((plan) => plan?.category?.includes(`${searchInput.toLowerCase()}`) || plan?.title?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
      if (!filteredLessons.length) {
        setSearchError(true)
      }
      setPlans(filteredLessons)
    }

    if (enteredSearch === '') {
      // if value is already from plan, remove from lessons
      setSearchError(false)
      setPlans(filter.filter(val => !playlist.plan.includes(val)))
      // setSearchError(true)
      // setFilter(lessons)
    }
  }

  const handleReset = () => {
    window.localStorage.removeItem('playlist');
    setPlaylist(initialData);
  }

  const resetSearch = () => {
    setSearchInput("");
    setPlans(filter.filter(val => !playlist.plan.includes(val)))
    setSearchError(false);
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (playlist && playlist.plan) {
      await lessonPlan({
        variables: {
          input: playlist,
          viewerId: `${viewer.id}`
        }
      });
    }
    // Remove items from playlist plan field for next visit and Navigate to User Profile Page
    // playlist.plan.length = 0;
    setPlaylist(initialData);
    window.localStorage.removeItem('playlist');
    navigate(`../user/${viewer.id}`, { replace: true })
  }

  const handleCategoryClick = (i: string, index: number) => {
    if (i === "All") {
      setPlans([...filter])
      DisplayError({ title: "All" })
    }
    setFilled(!filled)
    setPlans([...filter.filter((e) => e.category?.includes(i))])
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
        {/* <FeedbackModal /> */}
        <h1 className='createPlaylist--h1'>Create Lesson Plan</h1>
        <form onSubmit={handleSubmit}>
          <Button className='createPlaylist--button' variant="contained" onClick={handleReset}>Reset</Button>
          <DragDropContext onDragEnd={onDragEndHandler}>
            <Grid container>
              <Droppable droppableId='playlist'>
                {(provided, snapshot) => (
                  <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Card variant="outlined" className="createPlaylist-drop--card" {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                      <TextField
                        label="Lesson Plan Title"
                        id="lesson-plan-title"
                        variant="standard"
                        ref={inputRef}
                        fullWidth
                        onChange={titleHandler}
                        value={playlist.name}
                      />
                      {playlist.plan.length === 0 && <CardMedia component="img" image={HowItWorks} sx={{ width: "95%", opacity: "50%" }} />}
                      {playlist.plan.map((i, indices) => (
                        <Draggable draggableId={`${i._id}`} index={indices} key={`${i._id}`}>
                          {(provided, snapshot) => (
                            <Grid item xs={12} md={12} lg={12} className="playlist--dropbox">
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
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <FormControlLabel
                      control={<Switch
                        sx={{ m: 1 }}
                        checked={!yourContent}
                        onChange={() => setYourContent(!yourContent)}
                      />}
                      label={yourContent ? "Viewing Your Content Only" : "Viewing All Public Content"}
                    />
                    <br />
                    <Chip
                      key={1000}
                      label={"All"}
                      variant={"outlined"}
                      onClick={() => handleCategoryClick("All", 1000)}
                    />
                    {mainCategories.map((i: any, index) => (
                      <>
                        <Chip
                          key={index}
                          label={titleCase(i)}
                          variant={variant ? "filled" : "outlined"}
                          onClick={() => handleCategoryClick(i.toString(), index)}
                          sx={{ m: "1px" }}
                        />
                      </>
                    ))}
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
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Close onClick={resetSearch} />
                            </InputAdornment>
                          )
                        }}
                        helperText={searchError ? "No results found" : null}
                        error={searchError}
                      />
                      <Grid container>
                        {plans.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).map((i, index) => (
                          yourContent && (bookmarkQuery?.find((val) => (val?.id === `${i._id}`)) || (i.creator === viewer.id)) ? (
                            <Draggable draggableId={`${i._id}`} index={index} key={`${i._id}`}>
                              {(provided) => (
                                <Grid item xs={12} md={12} lg={12}>
                                  {!i && <Link to="/catalog"><Typography variant="h5">You haven't added or bookmarked any content here yet, click here to add your first lesson.</Typography></Link>}
                                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                    {i.questions ? (
                                      <Card className="lesson--card">
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
                                      <Card className="lesson--card">
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
