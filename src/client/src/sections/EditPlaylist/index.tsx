import { CircularProgress, Grid, Box, Card, TextField, Button, Chip, FormControlLabel, Switch, Snackbar, Alert } from '@mui/material';
import React, { useState, ChangeEvent, useRef, useEffect, useMemo } from 'react';
import {
  useAllLessonsQuery,
  usePlaylistQuery,
  useUserQuery,
  useAllQuizzesQuery,
  useUpdatePlanMutation,
  Viewer,
  Plan,
  FullLessonInput,
  LessonPlanInput,
  FullLessonQuiz
} from '../../graphql/generated';
import { DisplayError, titleCase } from '../../lib/utils';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { UseModal } from '../Modal';
import { CardMedia, Tooltip, InputAdornment, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import HowItWorks4 from '../../lib/assets/how-it-works-4.png';
import { styled } from '@mui/material/styles';
import '../CreatePlaylist/createPlaylist.scss';
import { CreatePlaylistCard, Footer } from '../../lib/components';
import { CreatePlaylistSkeleton } from '../CreatePlaylist/createPlaylistSkeleton';
import theme from '../../theme';
import { Helmet } from 'react-helmet';

import "../CreatePlaylist/createPlaylist.scss";

type props = {
  viewer: Viewer;
}

type InputLessonPlan = {
  name: string,
  creator: string,
  plan: Plan[]
}

const InitialPlaylist: InputLessonPlan = {
  name: "",
  creator: "",
  plan: []
}

export const useEditFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [])

  return ref;
}

export const EditPlaylist = ({ viewer }: props) => {
  let navigate = useNavigate();
  const params = useParams();
  const [playlist, setPlaylist] = useState<LessonPlanInput>(InitialPlaylist)
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchError, setSearchError] = useState<boolean>(false)
  const [variant, setVariant] = useState<boolean>(true)
  const [lessons, setLessons] = useState<Array<Plan>>([])
  const [quizzes, setQuizzes] = useState<Array<Plan>>([])
  const [plans, setPlans] = useState<Array<Plan>>([])
  const [filter, setFilter] = useState<Array<Plan>>([])
  const inputRef = useEditFocus();
  const searchRef = useEditFocus();
  const [yourContent, setYourContent] = useState<boolean>(false);

  const limit: number = 1000;
  const page: number = 1;

  // Fetch current playlist using id from playlist card, now in URL.
  const { data: PlaylistData, loading: PlaylistLoading, error: PlaylistError } = usePlaylistQuery({
    variables: {
      id: `${params.id}`
    }
  });

  useEffect(() => {
    if (!!PlaylistData?.playlist.plan) {
      setPlaylist({
        name: `${PlaylistData?.playlist.name}`,
        creator: `${PlaylistData?.playlist.creator}`,
        plan: PlaylistData?.playlist ? [...PlaylistData.playlist.plan] : [],
      })
    }
  }, [PlaylistData])

  const { data: userData, loading: userLoading, error: userError } = useUserQuery({
    variables: {
      id: `${viewer.id}`,
      playlistsPage: 0,
      lessonsPage: 0,
      quizzesPage: 0,
      limit: 0
    }
  });

  const { data, loading, error } = useAllLessonsQuery({
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

  const [updatePlanMutation, { loading: updatePlanLoading, error: updatePlanError }] = useUpdatePlanMutation({
    variables: {
      input: playlist,
      id: `${params.id}`
    }
  });

  const BookmarkSwitch = styled(Switch)(({ theme }) => ({
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
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 25 25"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>')`,
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
        )}" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/> </svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  const lessonQuery = useMemo(() => { return data?.allLessons.result }, [data])
  const quizQuery = useMemo(() => { return quizData?.allquizzes?.result }, [quizData])
  const bookmarkQuery = userData ? userData.user.bookmarks : null;

  useEffect(() => {
    if (lessonQuery) {
      const lessonInput: FullLessonInput[] = []
      lessonQuery.forEach(i => {
        let lessonObj = {
          __typename: "Lesson",
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

        lessonInput.push(lessonObj)
      })

      setLessons(lessonInput)
      setPlans(lessonInput)
      setFilter(lessonInput)
    }
    if (quizQuery) {
      const quizInput: FullLessonQuiz[] = []
      quizQuery.forEach(q => {
        let quizObj = {
          __typename: "Quiz",
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

  if (PlaylistLoading) {
    return <CreatePlaylistSkeleton />
  }

  if (PlaylistError) {
    return <DisplayError title="Failed to query current Playlist" />
  }

  if (!viewer) {
    return (
      <>
        <DisplayError title="Must be logged in to create a playlist!" />
        <Box sx={{ margin: 5 }}>
          <Button href='/login' variant='contained'>Go To Log In Page</Button>
        </Box>
      </>
    )
  }

  if (loading) {
    return <CreatePlaylistSkeleton />
  }

  if (error) {
    return <DisplayError title="Failed to query lessons" />
  }

  // Filtering functions
  function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  function onlyDefined(value: { main: string, secondary: undefined | string }, index: number, self: any) {
    return value.secondary !== undefined
  }

  // Isolate the main and any secondary categories
  const categor = data?.allLessons.result;
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

  const titleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setPlaylist({
      name: `${e.target.value}`,
      creator: `${playlist.creator}`,
      plan: playlist.plan
    })
  }

  const onDragEndHandler = (result: any) => {
    const { destination, source } = result;

    // Otherwise, cut the item from lessons array and push to new playlist
    let items = plans;

    // Allow the user to reorder playlist if failed to drag and drop in correct order
    if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const [reorderedPlaylistItem] = playlist.plan.splice(source.index, 1);
      const displacedPlaylistItem = playlist.plan.slice(destination.index, (destination.index + 1));
      playlist.plan[destination.index] = reorderedPlaylistItem;
      playlist.plan.splice((destination.index + 1), 0, ...displacedPlaylistItem);

      setPlaylist(playlist);
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
      playlist.plan.push(...displacedItem);

      setPlaylist(playlist)
    }

    if (destination.droppableId === "lessons") {
      const [reorderedPlay] = playlist.plan.splice(source.index, 1);
      const displacedPlay = items.slice(destination.index, (destination.index + 1));
      playlist.plan[destination.index] = reorderedPlay;
      // items[destination.index] = reorderedPlay;
      items.push(...displacedPlay)

      setPlans([...items])
      setPlaylist(playlist)
    }

    // if there is no droppable destination, simply return.
    if (!destination) {
      return;
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    let enteredSearch = e.target.value;
    setSearchInput(enteredSearch)

    if (enteredSearch) {
      const filteredLessons = plans.filter((plan) => plan.category?.find((p) => p?.includes(searchInput.toLowerCase())) || plan?.title?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
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

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    function renameKeys(obj: any, newKeys: any) {
      const keyValues = Object.keys(obj).map((key: any) => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
      });
      return Object.assign({}, ...keyValues);
    }

    const newKey = { id: "_id" }
    const newPlan: any = []
    playlist.plan.map((i) => newPlan.push(renameKeys(i, newKey)))
    playlist.plan = newPlan;

    await updatePlanMutation({
      variables: {
        input: playlist,
        id: `${params.id}`
      }
    });

    // // Navigate to User Profile Page
    navigate(`../user/${viewer.id}`, { replace: true })
  }

  const handleReset = () => {
    setPlaylist({
      name: `${PlaylistData?.playlist.name}`,
      creator: `${PlaylistData?.playlist.creator}`,
      plan: PlaylistData?.playlist ? [...PlaylistData.playlist.plan] : []
    });
    setPlans([]);
    handleCategoryClick("All", 0)
  }

  const handleSwitch = () => {
    setYourContent(!yourContent)
    handleCategoryClick("All", 0)
  }

  const resetSearch = () => {
    setSearchInput("");
    setPlans(filter.filter(val => !playlist.plan.includes(val)))
    setSearchError(false);
    document.getElementById("lesson-search")?.focus();
  }

  const handleCategoryClick = (i: string, index: number) => {
    if (i === "All") {
      setPlans([...filter])
      return { ...filter }
      // DisplayError({ title: "All" })
    }

    if (i === "Quizzes") {
      setPlans([...filter.filter((e) => e.questions && e.questions?.length > 0)])
      return { ...filter }
    }
    // setFilled(!filled)
    setPlans([...filter.filter((e) => e.category?.includes(i))])
  }

  if (updatePlanLoading) {
    return <CreatePlaylistSkeleton />
  }

  if (updatePlanError) {
    console.log(updatePlanError.clientErrors)
    return <DisplayError title="Failed to update lesson plan" />
  }

  return (
    <div>
      <Helmet>
        <title>{`Edit Lesson Plan Tool | Plato's Peach`}</title>
        <meta name="description" content={`Leverage our catalog of short documentaries and custom assessments to create interactive lesson plans.`} />
      </Helmet>
      <Box className="createPlaylist--box">
        {/* <FeedbackModal /> */}
        <h1 className='createPlaylist--h1'>Create Lesson Plan</h1>
        <form onSubmit={handleSubmit}>
          <Box sx={{ justifyContent: 'baseline' }}>
            <Button disableRipple disableTouchRipple className='createPlaylist--button' variant="contained" onClick={handleReset}>Reset</Button>
          </Box>
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
                        onChange={(e) => titleHandler(e)}
                        value={playlist.name}
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                      {playlist.plan.length === 0 && <CardMedia component="img" image={HowItWorks4} sx={{ width: "95%", opacity: "50%" }} />}
                      {playlist.plan.map((i, indices) => (
                        <Draggable draggableId={`${i?._id}`} index={indices} key={i?._id}>
                          {(provided, snapshot) => (
                            <Grid item xs={12} md={12} lg={12} className="playlist--dropbox">
                              <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                {i?.questions ? (
                                  <Card className="lesson--card" key={i?._id}>
                                    {i?.title} <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                                  </Card>
                                ) : (
                                  <CreatePlaylistCard {...i} key={i?._id} />
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
                    <Tooltip title="Filter for content you've created or bookmarked" placement="top">
                      <FormControlLabel
                        control={<BookmarkSwitch
                          sx={{ m: 1 }}
                          checked={!yourContent}
                          onChange={handleSwitch}
                        />}
                        label={yourContent ? "Viewing Your Content Only" : "Viewing All Public Content"}
                      />
                    </Tooltip>
                    <br />
                    <Chip
                      key={1000}
                      label={"All"}
                      variant={"outlined"}
                      onClick={() => handleCategoryClick("All", 0)}
                      sx={{ m: "1px" }}
                    />
                    <Chip
                      key={1001}
                      label={"Quizzes"}
                      variant={"outlined"}
                      onClick={() => handleCategoryClick("Quizzes", 1)}
                      sx={{ m: "1px" }}
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
                    <Card variant="outlined" className="createPlaylist--card" {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                      <TextField
                        variant='outlined'
                        id="lesson-search"
                        label="Search Lessons"
                        value={searchInput}
                        onChange={inputHandler}
                        ref={searchRef}
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
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                      <Grid container>
                        {/* {plans.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).map((i, index) => ( */}
                        {plans.map((i, index) => (
                          yourContent && (bookmarkQuery?.find((val) => (val?.id === `${i._id}`)) || (i.creator === viewer.id)) ? (
                            <Draggable draggableId={`${i._id}`} index={index} key={i._id}>
                              {(provided) => (
                                <Grid item xs={12} md={12} lg={12}>
                                  {!i && <Link to="/catalog"><Typography variant="h5">You haven't added or bookmarked any content here yet, click here to add your first lesson.</Typography></Link>}
                                  <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                    {i.questions ? (
                                      <Card className="lesson--card" key={i._id}>
                                        {JSON.parse(JSON.stringify(i)).title} <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                                      </Card>
                                    ) : (
                                      <CreatePlaylistCard {...i} key={i._id} />
                                    )}
                                  </Box>
                                </Grid>
                              )}
                            </Draggable>
                          ) : !yourContent && (
                            <Draggable draggableId={`${i._id}`} index={index} key={i._id}>
                              {(provided) => (
                                <Grid item xs={12} md={12} lg={12}>
                                  <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={i._id}>
                                    {i.questions ? (
                                      <Card className="lesson--card" key={i._id}>
                                        {JSON.parse(JSON.stringify(i)).title} <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                                      </Card>
                                    ) : (
                                      <CreatePlaylistCard {...i} key={i._id} />
                                    )}
                                  </Box>
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
          <Button
            className="createPlaylist--button"
            variant='contained'
            type='submit'
            disableRipple
            disableTouchRipple
          >Update</Button>
        </form >
      </Box>
      <Footer viewer={viewer} />
    </div>
  )
}