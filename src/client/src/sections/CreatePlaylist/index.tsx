import {
  Grid,
  Box,
  Card,
  TextField,
  Button,
  IconButton,
  Fab,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Typography,
  CardMedia,
  InputAdornment,
  Tooltip,
  Alert,
  Snackbar,
  Checkbox,
  Modal
} from '@mui/material';
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
import { useNavigate } from 'react-router-dom';
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
import { GradeLevel } from './gradeLevel';

// Pragmatic Drag and Drop imports
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';

type props = {
  viewer: Viewer;
}

interface RenderProps {
  index: number;
  style: any;
}

interface DragState {
  isDragging: boolean;
  isOver: boolean;
  closestEdge?: Edge;
}

type InputLessonPlan = {
  name: string,
  creator: string,
  plan: Plan[],
  public: boolean,
  premium: boolean
  level: number[],
  category: string[]
}

const initialData: InputLessonPlan = {
  name: "",
  creator: "",
  plan: [],
  public: false,
  premium: false,
  level: [6, 8],
  category: [""]
}

export const useCreatePlaylistFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [])

  return ref;
}

// Draggable Item Component for Plans
const DraggableItem = ({
  item,
  index,
  style,
  sourceId,
  onDragStateChange
}: {
  item: Plan;
  index: number;
  style: any;
  sourceId: string;
  onDragStateChange?: (isDragging: boolean) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState>({ isDragging: false, isOver: false });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: () => ({
          type: 'plan-item',
          itemId: item._id,
          sourceId,
          index
        }),
        onDragStart: () => {
          setDragState(prev => ({ ...prev, isDragging: true }));
          onDragStateChange?.(true);
        },
        onDrop: () => {
          setDragState(prev => ({ ...prev, isDragging: false }));
          onDragStateChange?.(false);
        }
      })
    );
  }, [item._id, sourceId, index, onDragStateChange]);

  const itemStyle = {
    ...style,
    opacity: dragState.isDragging ? 0.5 : 1,
    transform: dragState.isDragging ? 'scale(0.5)' : 'none',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    cursor: 'grab',
    userSelect: 'none' as const
  };

  return (
    <div ref={ref} style={itemStyle}>
      <Grid item xs={12} md={12} lg={12} className="playlist--dropbox">
        {item.startDate ? (
          <CreatePlaylistCard {...item} />
        ) : item.questions && !item.content ? (
          <Card className="lesson--card">
            {item.title}
            <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
          </Card>
        ) : item.content && (!item.questions || !item.startDate) ? (
          <Card className="lesson--card">
            {item.title}
            <Chip label="Article" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
            <UsePreviewModal color={"#fff"} item={{
              __typename: "Article",
              content: item.content,
              creator: item.creator,
              id: item._id,
              pdf: item.pdf,
              public: item.public,
              title: item.title
            }} />
          </Card>
        ) : null}
      </Grid>
    </div>
  );
};

// Drop Zone Component
const DropZone = ({
  children,
  droppableId,
  onDrop,
  className = ""
}: {
  children: React.ReactNode;
  droppableId: string;
  onDrop: (data: any) => void;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      getData: () => ({ droppableId }),
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: (args) => {
        setIsOver(false);
        const { source, location } = args;

        const dragData = source.data;
        const destinationData = location.current.dropTargets[0]?.data;

        onDrop({
          source: {
            droppableId: dragData.sourceId,
            index: dragData.index,
            draggableId: dragData.itemId
          },
          destination: {
            droppableId: destinationData?.droppableId,
            index: 0 // We'll handle index calculation in the parent
          }
        });
      }
    });
  }, [droppableId, onDrop]);

  return (
    <div
      ref={ref}
      className={`${className} ${isOver ? 'drop-zone-hover' : ''}`}
      style={{
        backgroundColor: isOver ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
        transition: 'background-color 0.2s ease'
      }}
    >
      {children}
    </div>
  );
};

export const CreatePlaylist = ({ viewer }: props) => {
  let navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchError, setSearchError] = useState<boolean>(false)
  const [titleError, setTitleError] = useState<boolean>(false)
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("")
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
  const [level, setLevel] = useState<number[]>([6, 8]);
  const [ascending, setAscending] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string[]>([""])

  const handleClose = () => {
    setOpen(false);
  }

  const handlePlayVideo = () => {
    setOpen(true);
  }

  const limit: number = 1500;
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
      navigate('/signup', { replace: true });
      return;
    }

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

  const RenderRow = ({ index, style }: RenderProps) => (
    <DraggableItem
      item={plans[index]}
      index={index}
      style={style}
      sourceId="lessons"
    />
  );

  const RenderBookmarkRow = ({ index, style }: RenderProps) => (
    <DraggableItem
      item={plans[index]}
      index={index}
      style={style}
      sourceId="bookmarks"
    />
  );

  const RenderPlaylistRow = ({ index, style }: RenderProps) => (
    <DraggableItem
      item={playlist.plan[index]}
      index={index}
      style={style}
      sourceId="playlist"
    />
  );

  useEffect(() => {
    window.localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist.plan]);

  const handleChron = (plans: Plan[]) => {
    setAscending(!ascending);
    if (ascending) {
      const sortedPlan = [...playlist.plan].sort(ascend);
      setPlaylist({ ...playlist, plan: sortedPlan });
    } else {
      const savedPlaylist = window.localStorage.getItem("playlist");
      if (savedPlaylist) {
        try {
          const parsedPlaylist = JSON.parse(savedPlaylist);
          setPlaylist(parsedPlaylist);
        } catch (error) {
          console.error("Error parsing saved playlist:", error);
        }
      }
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
    const titleRegex = /[;/?:@&=+$,%#{}|^~[\]`"<>]/g
    const matches = e.target.value.match(titleRegex)

    // Check if Lesson Plan Name Already Exists and throw error if yes to avoid URL duplication
    lessonPlanQuery?.map((i) => {
      existingPlanNames.push(i.name.toLowerCase());
    });

    if (e.target.value.match(titleRegex)) {
      setTitleError(true)
      setTitleErrorMessage(`Title cannot include: ${matches?.join(", ")}.`)
      setPlaylist({ ...playlist, name: `${e.target.value}` })
    } else if (existingPlanNames.includes(e.target.value.toLowerCase())) {
      setTitleError(true);
      setTitleErrorMessage("Title already exists, please choose unique title.")
      setPlaylist({ ...playlist, name: `${e.target.value}` })
    } else if (e.target.value.length === 0) {
      setTitleError(true)
      setTitleErrorMessage("Please Add Valid Title")
      setPlaylist({ ...playlist, name: `${e.target.value}` })
    } else {
      setPlaylist({
        plan: [...playlist.plan],
        name: e.target.value,
        creator: viewer && viewer.id ? viewer.id : "0",
        public: locked,
        premium: premium,
        level: level,
        category: category
      })
      setTitleError(false);

      window.localStorage.setItem("playlist", JSON.stringify(playlist));
      setAutoSaved(true);
    }
  }

  if (lessonLoading || quizLoading || articleLoading) {
    return <CreatePlaylistSkeleton />
  }

  if (lessonError || quizError || articleError) {
    return <DisplayError title="Failed to query lesson plan items" />
  }

  // Updated drag and drop handler using Pragmatic Drag and Drop
  const onDragEndHandler = (result: any) => {
    const { destination, source } = result;

    // if there is no droppable destination, simply return.
    if (!destination) {
      return;
    }

    if (playlist.plan.length > 0) {
      setPlans(plans.filter(val => !playlist.plan.includes(val)))
    }

    // Allow the user to reorder playlist if failed to drag and drop in correct order
    if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const newPlan = reorder({
        list: playlist.plan,
        startIndex: source.index,
        finishIndex: destination.index
      });

      setPlaylist({ ...playlist, plan: newPlan });
      updatePlaylistSize();
      window.localStorage.setItem("playlist", JSON.stringify(playlist));
      setAutoSaved(true);
      return;
    }

    // if dragging and dropping within lessons simply return items unchanged
    if (source.droppableId === "lessons" && destination.droppableId === "lessons") {
      const newPlans = reorder({
        list: plans,
        startIndex: source.index,
        finishIndex: destination.index
      });

      setPlans(newPlans);
      updateListSize();
      return;
    }

    // Moving from lessons to playlist
    if (destination.droppableId === "playlist") {
      const item = plans[source.index];
      const newPlans = plans.filter((_, i) => i !== source.index);

      // Insert item at the correct destination index
      const newPlaylist = [...playlist.plan];
      newPlaylist.splice(destination.index, 0, item);

      setPlans(newPlans);
      setPlaylist({ ...playlist, plan: newPlaylist });
      window.localStorage.setItem("playlist", JSON.stringify({ ...playlist, plan: newPlaylist }));
      updatePlaylistSize();
      setAutoSaved(true);
    }

    // Moving from playlist to lessons
    if (destination.droppableId === "lessons") {
      const item = playlist.plan[source.index];
      const newPlaylist = playlist.plan.filter((_, i) => i !== source.index);

      // Insert item at the correct destination index
      const newPlans = [...plans];
      newPlans.splice(destination.index, 0, item);

      setPlans(newPlans);
      setFilter(newPlans);
      setPlaylist({ ...playlist, plan: newPlaylist });
      window.localStorage.setItem("playlist", JSON.stringify({ ...playlist, plan: newPlaylist }));
      updateListSize();
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
    setPlans([]);
    setAutoSaved(false);
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

  const handleGradeLevel = (newLevel: number[]) => {
    setLevel(newLevel);
    setPlaylist({ ...playlist, level: newLevel });
  }

  const handleCategory = (newCategory: string[]) => {
    setCategory(newCategory);
    setPlaylist({ ...playlist, category: newCategory });
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
    setAutoSaved(false);
    handleReset();
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
        < meta name="description" content={`Leverage our catalog of short documentaries and custom assessments to create interactive lesson plans.`} />
      </Helmet >
      <Box className="createPlaylist--box">
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

          <Grid container>
            {/* Playlist Drop Zone */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <DropZone droppableId="playlist" onDrop={onDragEndHandler}>
                <Card variant="outlined" className="createPlaylist-drop--card">
                  <TextField
                    label="Lesson Plan Title"
                    id="lesson-plan-title"
                    variant="standard"
                    ref={inputRef}
                    fullWidth
                    onChange={(e) => titleHandler(e)}
                    value={playlist.name}
                    error={titleError}
                    helperText={titleError ? titleErrorMessage : null}
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
              </DropZone>
            </Grid>

            {/* Lessons Drop Zone */}
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
                <Chip
                  key={index}
                  label={titleCase(i)}
                  variant={variant ? "filled" : "outlined"}
                  onClick={() => handleCategoryClick(i.toString(), index)}
                  sx={{ m: "1px" }}
                />
              ))}

              <DropZone droppableId="lessons" onDrop={onDragEndHandler}>
                <Card variant="outlined" className="createPlaylist--card">
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
              </DropZone>
            </Grid>
          </Grid>

          <Box className="button--slider-playlist">
            <Tooltip title={viewer.id !== null ? "Make Private/Public" : "Public Content Restricted to Registered Users"}>
              <LockSwitch checked={!locked} onChange={handleLock} disabled={viewer.id === null} />
            </Tooltip>
            <Tooltip title={viewer.id !== null ? "Make Private/Public" : "Public Content Restricted to Registered Users"}>
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
            <Tooltip title="Check to make premium (for Plato's Peach community only)">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handlePremium()}
                    disableRipple
                    disabled={viewer.id === null}
                  />}
                label="Premium Content"
                sx={{ ml: 0.5 }}
              />
            </Tooltip>
            <Box className="button--slider-playlist">
              <GradeLevel level={level} setLevel={setLevel} onChange={(event: any, newLevel: number[]) => handleGradeLevel(newLevel)} />
            </Box>
            <FormControl className="category--menu">
              <InputLabel id="mobile-select-category">Category</InputLabel>
              <Select
                labelId="mobile-select-category"
                id="category-simple-select"
                value={category}
                label="Category"
                onChange={(e) => handleCategory([`${e.target.value}`])}
              >
                <MenuItem value="american history">American History</MenuItem>
                <MenuItem value="military history">Military History</MenuItem>
                <MenuItem value="world history">World History</MenuItem>
                <MenuItem value="european history">European History</MenuItem>
                <MenuItem value="holiday history">Holiday History</MenuItem>
                <MenuItem value="biography">Biography</MenuItem>
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="art">Art</MenuItem>
                <MenuItem value="world religions">World Religions</MenuItem>
                <MenuItem value="ancient history">Ancient History</MenuItem>
                <MenuItem value="african american history">African American History</MenuItem>
                <MenuItem value="uncategorized">Uncategorized</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            className="createPlaylist--button"
            variant='contained'
            type='submit'
            disableRipple
            disableTouchRipple
            disabled={playlist.plan.length === 0 || titleError}
          >Create</Button>
        </form>
      </Box>
      <Footer viewer={viewer} />
    </div >
  )
}