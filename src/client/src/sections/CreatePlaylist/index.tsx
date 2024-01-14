import { Grid, Box, Card, TextField, Button, IconButton, Fab, FormControlLabel, Chip, Typography, CardMedia, InputAdornment, Tooltip, Alert, Snackbar, Checkbox, Modal } from '@mui/material';
import { Close } from '@mui/icons-material';
import React, { useState, ChangeEvent, useRef, useEffect, useMemo, SyntheticEvent } from 'react';
import {
  FullLessonInput,
  useLessonPlanMutation,
  useAllLessonsQuery,
  useAllQuizzesQuery,
  useAllArticlesQuery,
  Viewer,
  FullLessonQuiz,
  Plan,
  useUserQuery,
  useAllPlaylistsQuery,
} from '../../graphql/generated';
import { DisplayError, titleCase } from '../../lib/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
// import { UseModal } from '../Modal';
import { UsePreviewModal, VideoPlayer } from '../../lib/components';
import './createPlaylist.scss';
import { CreatePlaylistCard, Footer } from '../../lib/components';
import theme from '../../theme';
import HowItWorks from '../../lib/assets/how-it-works-3.png';
import { CreatePlaylistSkeleton } from '../CreatePlaylist/createPlaylistSkeleton';
import { Helmet } from 'react-helmet';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { VariableSizeList as List } from 'react-window';
import { BookmarkSwitch } from './bookmarkSwitch';
import { LockSwitch } from './lockSwitch';

type props = {
  viewer: Viewer;
}

interface RenderProps {
  index: number;
  style: any;
}

interface StyleProps {
  draggableStyle: any;
  virtualStyle: any;
  isDragging: boolean;
}

type InputLessonPlan = {
  name: string,
  creator: string,
  plan: Plan[],
  public: boolean,
  premium: boolean
}

const initialData: InputLessonPlan = {
  name: "",
  creator: "",
  plan: [],
  public: false,
  premium: false
}


export const useCreatePlaylistFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [])

  return ref;
}

export const CreatePlaylist = ({ viewer }: props) => {
  let navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchError, setSearchError] = useState<boolean>(false)
  const [titleError, setTitleError] = useState<boolean>(false)
  const [autoSaved, setAutoSaved] = useState<boolean>(false)
  const [variant, setVariant] = useState<boolean>(true)
  const [plans, setPlans] = useState<Plan[]>([])
  const [filter, setFilter] = useState<Plan[]>([])
  const [bookmarks, setBookmarks] = useState<Plan[]>([])
  const [yourContent, setYourContent] = useState<boolean>(false);
  const inputRef = useCreatePlaylistFocus();
  const searchRef = useCreatePlaylistFocus();
  const listRef = useRef<List>(null);
  const playlistRef = useRef<List>(null);
  const bookmarkRef = useRef<List>(null);
  const [playlist, setPlaylist] = useState<InputLessonPlan>(initialData)
  const [locked, setLocked] = useState<boolean>(false);
  const [premium, setPremium] = useState<boolean>(false);
  const [ascending, setAscending] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handlePlayVideo = () => {
    setOpen(true);
  }

  const limit: number = 1000;
  const page: number = 1;

  const { data: userData, loading: userLoading, error: userError } = useUserQuery({
    variables: {
      id: `${viewer.id}`,
      playlistsPage: 0,
      lessonsPage: 0,
      quizzesPage: 0,
      articlesPage: 0,
      limit: 0
    }, pollInterval: 5000
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
    }, pollInterval: 5000
  })

  const { data: articleData, loading: articleLoading, error: articleError } = useAllArticlesQuery({
    variables: {
      limit: limit,
      page: page
    }
  })

  const { data: lessonPlanData, loading: lessonPlanLoading, error: lessonPlanError } = useAllPlaylistsQuery({
    variables: {
      limit: limit,
      page: page
    },
  })

  const [lessonPlan, { loading, error }] = useLessonPlanMutation({
    variables: {
      input: playlist,
      viewerId: `${viewer.id}`
    }
  })

  let lessonQuery = useMemo(() => lessonData?.allLessons.result, [lessonData])
  let quizQuery = useMemo(() => quizData?.allquizzes.result, [quizData]);
  let articleQuery = useMemo(() => articleData?.allarticles.result, [articleData])
  let bookmarkQuery: any = useMemo(() => userData ? userData.user.bookmarks : [], [userData]);
  let lessonPlanQuery = useMemo(() => lessonPlanData?.allplaylists.result, [lessonPlanData])

  const updateListSize = () => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  };

  const updatePlaylistSize = () => {
    if (playlistRef.current) {
      playlistRef.current.resetAfterIndex(0);
    }
  }

  const updateBookmarkSize = () => {
    if (bookmarkRef.current) {
      bookmarkRef.current.resetAfterIndex(0);
    }
  }

  useEffect(() => {
    if (!viewer.id) {
      navigate('/signup', { replace: true })
    }

    const playlistStorage = window.localStorage.getItem("playlist");
    if (playlistStorage) {
      setPlaylist(JSON.parse(playlistStorage));
    }

    setPlaylist(initialData);
    // Reset states to initial value or empty arrays
    setFilter([]);
    setPlans([]);

    const updateStates = (newData: any, setStateFunction: any) => {
      setStateFunction((currentData: any) => {
        // Check if the new data is different from current data to prevent duplication
        const newDataIds = new Set(newData.map((item: any) => item._id));
        const filteredCurrentData = currentData.filter((item: any) => !newDataIds.has(item._id));

        return [...filteredCurrentData, ...newData];
      });
    };

    if (lessonQuery) {
      const lessonInput = lessonQuery.map(i => ({
        title: i.title,
        category: i.category,
        creator: i.creator,
        endDate: i.endDate,
        meta: i.meta,
        startDate: i.startDate,
        video: i.video,
        _id: i.id,
        public: i.public,
      }));

      updateStates(lessonInput, setFilter);
      updateStates(lessonInput, setPlans);
    }

    if (quizQuery) {
      const quizInput = quizQuery.map(q => ({
        creator: q.creator,
        _id: q.id,
        title: q.title,
        questions: q.questions,
        public: q.public
      }));

      updateStates(quizInput, setFilter);
      updateStates(quizInput, setPlans);
    }

    if (articleQuery) {
      const articleInput = articleQuery.map(a => ({
        creator: a.creator,
        _id: a.id,
        title: a.title,
        content: a.content,
        public: a.public,
        pdf: a.pdf
      }));

      updateStates(articleInput, setFilter);
      updateStates(articleInput, setPlans);
    }

    if (bookmarkQuery) {
      const bookmarkInput = bookmarkQuery.map((b: any) => ({
        title: b.title,
        category: b.category,
        creator: b.creator,
        endDate: b.endDate,
        meta: b.meta,
        startDate: b.startDate,
        video: b.video,
        _id: b.id,
        public: b.public,
      }));

      setBookmarks(bookmarkInput);
    }

    updateListSize()
    updateBookmarkSize()
  }, [lessonQuery, quizQuery, articleQuery, bookmarkQuery, navigate, viewer]);

  // Filtering functions
  function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  function ascend(a: any, b: any) {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  }

  const rowHeights = plans.map(p =>
    p.startDate && p.title && p.title.length > 50 ? 190
      : p.content?.blocks?.length && p.title && p.title.length > 50 ? 115
        : p.questions && p.title && p.title.length > 50 ? 105
          : p.startDate ? 174
            : p.content?.blocks?.length ? 85
              : p.pdf ? 85
                : p.questions ? 75
                  : 150)

  const playHeights = playlist.plan.map(p =>
    p.startDate && p.title && p.title.length > 50 ? 190
      : p.content?.blocks?.length && p.title && p.title.length > 50 ? 95
        : p.startDate ? 174
          : p.content?.blocks?.length ? 85
            : p.pdf ? 85
              : p.questions ? 75
                : 150)

  const getItemSize = (index: number) => rowHeights[index];
  const getPlaylistItemSize = (index: number) => playHeights[index];
  const getBookmarkItemSize = (index: number) => rowHeights[index];

  const getStyle = ({ draggableStyle, virtualStyle, isDragging }: StyleProps) => {
    // replaces the need for a placeholder
    const combined = {
      ...virtualStyle,
      ...draggableStyle
    };

    const grid = 8;

    const result = {
      ...combined,
      height: isDragging ? combined.height : combined.height - grid,
      left: isDragging ? combined.left : combined.left + grid,
      width: isDragging
        ? draggableStyle.width
        : `calc(${combined.width} - ${grid * 2}px)`,
      marginBottom: grid
    };

    return result;
  }

  const RenderRow = ({ index, style }: RenderProps) => (
    <Draggable draggableId={plans[index] && `${plans[index]._id}`} index={index} key={plans[index]._id}>
      {(provided, snapshot) => (
        <Grid item xs={12} md={12} lg={12} className="playlist--dropbox">
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getStyle({
            draggableStyle: provided.draggableProps.style,
            virtualStyle: style,
            isDragging: snapshot.isDragging
          })}
          >
            {(plans[index].startDate) ? (
              <CreatePlaylistCard {...plans[index]} />
            ) : (plans[index].questions && !plans[index].content) ? (
              <Card className="lesson--card">
                {`${plans[index].title}`}
                <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                {/* <UsePreviewModal color={"#fff"} item={{
                  __typename: "Quiz",
                  creator: plans[index].creator,
                  id: plans[index]._id,
                  public: plans[index].public,
                  title: plans[index].title,
                  questions: plans[index]?.questions?.map((q) => ([{ question: q?.question, answerOptions: q?.answerOptions, answerType: q?.answerType }]))
                }} /> */}
              </Card>
            ) : (plans[index].content && (!plans[index].questions || !plans[index].startDate)) && (
              <Card className="lesson--card">
                {plans[index].title}
                <Chip label="Article" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                <UsePreviewModal color={"#fff"} item={{
                  __typename: "Article",
                  content: plans[index].content,
                  creator: plans[index].creator,
                  id: plans[index]._id,
                  pdf: plans[index].pdf,
                  public: plans[index].public,
                  title: plans[index].title
                }} />
              </Card>)}
          </div>
        </Grid>
      )}
    </Draggable>
  );

  const RenderBookmarkRow = ({ index, style }: RenderProps) => (
    <Draggable draggableId={`${plans[index]._id}${index}`} index={index} key={plans[index]._id}>
      {(provided, snapshot) => (
        <Grid item xs={12} md={12} lg={12} className="playlist--dropbox">
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} style={getStyle({
            draggableStyle: provided.draggableProps.style,
            virtualStyle: style,
            isDragging: snapshot.isDragging
          })}
          >
            {(plans[index].startDate) ? (
              <CreatePlaylistCard {...plans[index]} />
            ) : (plans[index].questions && !plans[index].content) ? (
              <Card className="lesson--card">
                {`${plans[index].title}`}
                <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                {/* <UsePreviewModal color={"#fff"} item={{
                  __typename: "Quiz",
                  creator: plans[index].creator,
                  id: plans[index]._id,
                  public: plans[index].public,
                  title: plans[index].title,
                  questions: (!typeof([plans[index].questions]) === undefined || null) ? plans[index]?.questions?.map((q) => ({ question: q?.question, answerOptions: q?.answerOptions, answerType: q?.answerType })) : [{ question: "", answerOptions: [{ answer: "", correct: false }], answerType: "TRUEFALSE" }],
                }} /> */}
              </Card>
            ) : (plans[index].content && (!plans[index].questions || !plans[index].startDate)) && (
              <Card className="lesson--card">
                {plans[index].title}
                <Chip label="Article" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                <UsePreviewModal color={"#fff"} item={{
                  __typename: "Article",
                  content: plans[index].content,
                  creator: plans[index].creator,
                  id: plans[index]._id,
                  pdf: plans[index].pdf,
                  public: plans[index].public,
                  title: plans[index].title
                }} />
              </Card>)}
          </div>
        </Grid>
      )}
    </Draggable>
  );

  const RenderPlaylistRow = ({ index, style }: RenderProps) => (
    <Draggable draggableId={`${playlist.plan[index]._id}`} index={index} key={playlist.plan[index]._id}>
      {(provided, snapshot) => (
        <Grid item xs={12} md={12} lg={12} className="playlist--dropbox">
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} style={getStyle({
            draggableStyle: provided.draggableProps.style,
            virtualStyle: style,
            isDragging: snapshot.isDragging
          })}>
            {(playlist.plan[index].startDate) ? (
              <CreatePlaylistCard {...playlist.plan[index]} />
            ) : (playlist.plan[index].questions && !playlist.plan[index].content) ? (
              <Card className="lesson--card">
                {playlist.plan[index].title}
                <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                {/* <UsePreviewModal color={"#fff"} item={{
                    __typename: "Quiz",
                    creator: playlist.plan[index].creator,
                    id: playlist.plan[index]._id,
                    public: playlist.plan[index].public,
                    title: playlist.plan[index].title,
                    questions: playlist.plan[index]?.questions?.map((q) => ({ question: q?.question, answerOptions: q?.answerOptions, answerType: q?.answerType }))
                  }} /> */}
              </Card>
            ) : (playlist.plan[index].content && (!playlist.plan[index].questions || !playlist.plan[index].startDate)) && (
              <Card className="lesson--card">
                {playlist.plan[index].title}
                <Chip label="Article" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                <UsePreviewModal color={"#fff"} item={{
                  __typename: "Article",
                  content: playlist.plan[index].content,
                  creator: playlist.plan[index].creator,
                  id: playlist.plan[index]._id,
                  pdf: playlist.plan[index].pdf,
                  public: playlist.plan[index].public,
                  title: playlist.plan[index].title
                }} />
              </Card>)}
          </div>
        </Grid>
      )}
    </Draggable>
  );

  const handleChron = (plans: Plan[]) => {
    setAscending(!ascending);
    if (ascending) {
      playlist.plan.sort(ascend)
    } else {
      setPlaylist(JSON.parse(`${window?.localStorage?.getItem("playlist")}`))
    }
  }

  // Isolate the main and any secondary categories
  const categor = lessonQuery;
  const mainCategoryArray: any[] = [];
  const secondaryCategory: any = [{}];
  const allCategories: any[] = [];
  categor?.map((i) => mainCategoryArray.push(i?.category ? i.category[0]?.trim() : undefined))
  categor?.map((i) => allCategories.push(i?.category ? i.category.map(item => item?.trim()) : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[1]?.trim() } : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[2]?.trim() } : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[3]?.trim() } : undefined))
  const mainCategories = mainCategoryArray.filter(onlyUnique)
  let existingPlanNames: string[] = [];

  const titleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();

    // Check if Lesson Plan Name Already Exists and throw error if yes to avoid URL duplication
    lessonPlanQuery?.map((i) => {
      existingPlanNames.push(i.name.toLowerCase());
    });

    if (existingPlanNames.includes(e.target.value.toLowerCase())) {
      setTitleError(true);
      setPlaylist({ ...playlist, name: `${e.target.value}` })
    } else {
      setPlaylist({
        plan: [...playlist.plan],
        name: e.target.value,
        creator: viewer && viewer.id ? viewer.id : "0",
        public: locked,
        premium: premium
      })
      setTitleError(false);

      window.localStorage.setItem('playlist', JSON.stringify(playlist));
    }
  }

  if (lessonLoading || quizLoading || articleLoading) {
    return <CreatePlaylistSkeleton />
  }

  if (lessonError || quizError || articleError) {
    return <DisplayError title="Failed to query lesson plan items" />
  }

  const onDragEndHandler = (result: any) => {
    const { destination, source } = result;

    // if there is no droppable destination, simply return.
    if (!destination) {
      return;
    }

    if (playlist.plan.length > 0) {
      setPlans(plans.filter(val => !playlist.plan.includes(val)))
    }
    // Otherwise, cut the item from lessons array and push to new playlist
    let items = plans

    // Allow the user to reorder playlist if failed to drag and drop in correct order
    if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const [reorderedPlaylistItem] = playlist.plan.splice(source.index, 1);
      const displacedPlaylistItem = playlist.plan.slice(destination.index, (destination.index + 1));
      playlist.plan[destination.index] = reorderedPlaylistItem;
      playlist.plan.splice((destination.index + 1), 0, ...displacedPlaylistItem);
      updatePlaylistSize();
      setAutoSaved(true);

      return { ...playlist }
    }

    // if dragging and dropping within lessons simply return items unchanged
    if (source.droppableId === "lessons" && destination.droppableId === "lessons") {
      const [reorderedLesson] = items.splice(source.index, 1);
      const displacedLesson = items.slice(destination.index, (destination.index + 1));
      items[destination.index] = reorderedLesson;
      items.splice((destination.index + 1), 0, ...displacedLesson)
      updateListSize();
      return { ...items }
    }

    if (destination.droppableId === "playlist") {
      const [reorderedItem] = items.splice(source.index, 1);
      setPlans([...items]);
      const displacedItem = playlist.plan.slice(destination.index, (destination.index + 1));
      playlist.plan[destination.index] = reorderedItem;
      playlist.plan.push(...displacedItem)

      updatePlaylistSize();
      setPlaylist(playlist)
      window.localStorage.setItem('playlist', JSON.stringify(playlist));
      setAutoSaved(true);
    }

    if (destination.droppableId === "lessons") {
      const [reorderedPlay] = playlist.plan.splice(source.index, 1);
      const displacedPlay = items.slice(destination.index, (destination.index + 1));
      items[destination.index] = reorderedPlay;
      items.push(...displacedPlay)

      setPlans(items)
      setFilter(items)
      setPlaylist(playlist)
      updateListSize();
      window.localStorage.setItem('playlist', JSON.stringify(playlist));
      setAutoSaved(true);
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
    }
  }

  const handleReset = () => {
    setPlaylist(initialData);
    playlist.plan.length = 0;
    setPlans(playlist.plan);
    if (!!window.localStorage.getItem('playlist')) {
      window.localStorage.removeItem('playlist');
      setAutoSaved(false);
    }
    handleCategoryClick("All", 0)
    setAscending(true);
    setYourContent(false);
    updateListSize();
    updateBookmarkSize();
  }

  const handleSwitch = () => {
    setYourContent(!yourContent)
    setPlans([])
    updateListSize();

    if (!yourContent) {
      setPlans(filter.filter((i) => i.creator === viewer.id))
      if (bookmarks) {
        setPlans((p) => [...bookmarks, ...p])
      }
      updatePlaylistSize();
      updateBookmarkSize();
      return { ...plans }
    }

    if (yourContent) {
      updateListSize();
      updatePlaylistSize();
      updateBookmarkSize();
    }

    handleCategoryClick("All", 0)
  }

  const handleLock = () => {
    setLocked(!locked);
    setPlaylist({ ...playlist, public: !locked });
  }

  const handlePremium = () => {
    setPremium(!premium);
    setPlaylist({ ...playlist, premium: !premium });
  }

  const resetSearch = () => {
    setSearchInput("");
    setPlans(filter.filter(val => !playlist.plan.includes(val)))
    setSearchError(false);
    document.getElementById("lesson-search")?.focus();
    updateListSize();
    updateBookmarkSize();
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
    setPlaylist(initialData);
    playlist.plan.length = 0;
    window.localStorage.removeItem('playlist');
    setAutoSaved(false);
    navigate(`../user/${viewer.id}`, { replace: true })
  }

  const handleCategoryClick = (i: string, index: number) => {
    setPlans([])
    if (i === "All") {
      setPlans(filter.filter(i => !playlist.plan.includes(i)))
      updateListSize();
      updateBookmarkSize();
      return { ...filter }
    }

    if (i === "Quizzes") {
      setPlans([...filter.filter((e) => e.questions && e.questions?.length > 0)])
      updateListSize();
      updateBookmarkSize();
      return { ...filter }
    }

    if (i === "Articles") {
      setPlans([...filter.filter((c) => c.pdf || (c.content && c.content.blocks))])
      updateListSize();
      updateBookmarkSize();
      return { ...filter }
    }
    setPlans([...filter.filter((e) => e.category?.includes(i))])
  }

  if (error || userError) {
    return <DisplayError title="Lesson Plan Creation Failed!" />
  }

  if (loading || userLoading) {
    return <CreatePlaylistSkeleton />
  }

  const handleAutoSavedClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAutoSaved(false);
  };

  return (
    <div>
      <Helmet>
        <title>{`Lesson Plan Tool | Plato's Peach`}</title>
        <meta name="description" content={`Leverage our catalog of short documentaries and custom assessments to create interactive lesson plans.`} />
      </Helmet>
      <Box className="createPlaylist--box">
        {/* <FeedbackModal /> */}
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <h1 className='createPlaylist--h1'>Create Lesson Plan</h1>
          <Tooltip title="Watch quick demo">
            <IconButton
              disableRipple
              onClick={handlePlayVideo}
            >
              <PlayCircleOutlineIcon sx={{ color: "#000", marginLeft: "0.5rem" }} /> <Typography variant="body2" color="#000"> How To Use</Typography>
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
              <VideoPlayer url="https://res.cloudinary.com/drewpager/video/upload/v1699323489/platos-peach-video/create-lesson-plan-tutorial_qpaaog.mov" />
            </Box>
          </Modal>
        </Box>
        <Snackbar
          open={autoSaved}
          autoHideDuration={3000}
          onClose={handleAutoSavedClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity="success"
            sx={{ maxWidth: 'max-content' }}
          >Auto saved!
          </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit}>
          <Box sx={{ justifyContent: 'baseline' }}>
            <Button disableRipple disableTouchRipple className='createPlaylist--button' variant="contained" onClick={handleReset}>Reset</Button>
          </Box>
          <DragDropContext onDragEnd={onDragEndHandler}>
            <Grid container>
              <Droppable droppableId='playlist' mode="virtual" renderClone={(provided, snapshot, rubric) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  {(playlist.plan[rubric.source.index].startDate) ? (
                    <CreatePlaylistCard {...playlist.plan[rubric.source.index]} />
                  ) : (playlist.plan[rubric.source.index].questions && !playlist.plan[rubric.source.index].content) ? (
                    <Card className="lesson--card">
                      {`${playlist.plan[rubric.source.index].title}`}
                      <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                      {/* <UsePreviewModal color={"#fff"} item={{
                        __typename: "Quiz",
                        creator: plans[index].creator,
                        id: plans[index]._id,
                        public: plans[index].public,
                        title: plans[index].title,
                        questions: (!typeof([plans[index].questions]) === undefined || null) ? plans[index]?.questions?.map((q) => ({ question: q?.question, answerOptions: q?.answerOptions, answerType: q?.answerType })) : [{ question: "", answerOptions: [{ answer: "", correct: false }], answerType: "TRUEFALSE" }],
                      }} /> */}
                    </Card>
                  ) : (playlist.plan[rubric.source.index].content && (!playlist.plan[rubric.source.index].questions || !playlist.plan[rubric.source.index].startDate)) && (
                    <Card className="lesson--card">
                      {playlist.plan[rubric.source.index].title}
                      <Chip label="Article" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                      <UsePreviewModal color={"#fff"} item={{
                        __typename: "Article",
                        content: playlist.plan[rubric.source.index].content,
                        creator: playlist.plan[rubric.source.index].creator,
                        id: playlist.plan[rubric.source.index]._id,
                        pdf: playlist.plan[rubric.source.index].pdf,
                        public: playlist.plan[rubric.source.index].public,
                        title: playlist.plan[rubric.source.index].title
                      }} />
                    </Card>)}
                </div>
              )}>
                {/* Item id: {playlist.plan[rubric.source.index]._id} */}
                {(provided, snapshot) => (
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card variant="outlined" className="createPlaylist-drop--card" {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                      <TextField
                        label="Lesson Plan Title"
                        id="lesson-plan-title"
                        variant="standard"
                        ref={inputRef}
                        fullWidth
                        onChange={(e) => titleHandler(e)}
                        value={playlist.name}
                        error={titleError}
                        helperText={titleError ? "Title already exists, please choose unique title." : null}
                      // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                      {playlist.plan.length === 0 && <CardMedia component="img" image={HowItWorks} sx={{ width: "95%", opacity: "50%" }} />}

                      <List
                        ref={playlistRef}
                        height={800}
                        width="100%"
                        itemCount={playlist.plan.length}
                        itemSize={getPlaylistItemSize}
                      >
                        {RenderPlaylistRow}
                      </List>
                    </Card>
                  </Grid>
                )}
              </Droppable>
              <Droppable droppableId='lessons' mode="virtual" renderClone={(provided, snapshot, rubric) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  {(plans[rubric.source.index].startDate) ? (
                    <CreatePlaylistCard {...plans[rubric.source.index]} />
                  ) : (plans[rubric.source.index].questions && !plans[rubric.source.index].content) ? (
                    <Card className="lesson--card">
                      {`${plans[rubric.source.index].title}`}
                      <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                      {/* <UsePreviewModal color={"#fff"} item={{
                          __typename: "Quiz",
                          creator: plans[rubric.source.index].creator,
                          id: plans[rubric.source.index]._id,
                          public: plans[rubric.source.index].public,
                          title: plans[rubric.source.index].title,
                          // questions: plans[rubric.source.index].questions?.map((q) => ({ question: q?.question, answerOptions: [q?.answerOptions], answerType: q?.answerType }))
                        }} /> */}
                    </Card>
                  ) : (plans[rubric.source.index].content && (!plans[rubric.source.index].questions || !plans[rubric.source.index].startDate)) && (
                    <Card className="lesson--card">
                      {plans[rubric.source.index].title}
                      <Chip label="Article" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                      <UsePreviewModal color={"#fff"} item={{
                        __typename: "Article",
                        content: plans[rubric.source.index].content,
                        creator: plans[rubric.source.index].creator,
                        id: plans[rubric.source.index]._id,
                        pdf: plans[rubric.source.index].pdf,
                        public: plans[rubric.source.index].public,
                        title: plans[rubric.source.index].title
                      }} />
                    </Card>)}
                </div>
              )}>
                {(provided) => (
                  <Grid item xs={12} sm={12} md={6} lg={6}>
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
                    <Chip
                      key={1002}
                      label={"Articles"}
                      variant={"outlined"}
                      onClick={() => handleCategoryClick("Articles", 2)}
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
                      <List
                        ref={yourContent ? bookmarkRef : listRef}
                        height={800}
                        width="100%"
                        itemCount={plans.length}
                        itemSize={yourContent ? getBookmarkItemSize : getItemSize}
                      >
                        {yourContent ? RenderBookmarkRow : RenderRow}
                      </List>
                    </Card>
                  </Grid>
                )}
              </Droppable>
            </Grid>
          </DragDropContext>
          <Box className="button--slider-playlist">
            <Tooltip title={viewer.paymentId !== null ? "Make Private/Public" : "Public Content Restricted to Paying Users"}>
              <LockSwitch checked={!locked} onChange={handleLock} disabled={viewer.paymentId === null} />
            </Tooltip>
            <Tooltip title={viewer.paymentId !== null ? "Make Private/Public" : "Public Content Restricted to Paying Users"}>
              <Typography variant="body1" color={!locked ? "error" : "success"}>{!locked ? "Private" : "Public"}</Typography>
            </Tooltip>
            <Tooltip title="If two or more items contain dates, sort chronologically">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handleChron(playlist.plan)}
                    disableRipple
                    disabled={playlist.plan.length <= 1 || playlist.plan.map((e) => !e.startDate).includes(true)}
                  />}
                label="Sort by Date"
                sx={{ ml: 1 }}
              />
            </Tooltip>
            <Tooltip title="Check to make premium (for paying users only)">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handlePremium()}
                    disableRipple
                    disabled={viewer.paymentId === null}
                  />}
                label="Premium Content"
                sx={{ ml: 0.5 }}
              />
            </Tooltip>
          </Box>
          <Button
            className="createPlaylist--button"
            variant='contained'
            type='submit'
            disableRipple
            disableTouchRipple
            disabled={titleError || playlist.plan.length === 0}
          >Create</Button>
        </form>
      </Box>
      <Footer viewer={viewer} />
    </div>
  )
}