import { Grid, Box, Card, TextField, Button, IconButton, Fab, Switch, FormControlLabel, Chip, Typography, CardMedia, InputAdornment, Tooltip, Alert, Snackbar, Checkbox, Modal } from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
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
} from '../../graphql/generated';
import { DisplayError, titleCase } from '../../lib/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { UseModal } from '../Modal';
import { UsePreviewModal, VideoPlayer } from '../../lib/components';
// import '../CreatePlaylist/createPlaylist.scss';
import './testElement.scss';
import { Link } from 'react-router-dom';
import { CreatePlaylistCard, Footer } from '../../lib/components';
import theme from '../../theme';
import HowItWorks from '../../lib/assets/how-it-works-3.png';
import { CreatePlaylistSkeleton } from '../CreatePlaylist/createPlaylistSkeleton';
import { Helmet } from 'react-helmet';
import InfoIcon from '@mui/icons-material/Info';
import { VariableSizeList as List } from 'react-window';

type props = {
  viewer: Viewer;
}

interface RenderProps {
  index: number;
  style: any;
}

interface BookmarkProps {
  bookmarkQuery: any;
  plans: Plan[];
  viewer: Viewer;
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
  public: boolean
}

const initialData: InputLessonPlan = {
  name: "",
  creator: "",
  plan: [],
  public: false
}


export const useTestFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [])

  return ref;
}

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

export const TestElement = ({ viewer }: props) => {
  let navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchError, setSearchError] = useState<boolean>(false)
  const [autoSaved, setAutoSaved] = useState<boolean>(false)
  const [variant, setVariant] = useState<boolean>(true)
  const [plans, setPlans] = useState<Plan[]>([])
  const [filter, setFilter] = useState<Plan[]>([])
  const [yourContent, setYourContent] = useState<boolean>(false);
  const inputRef = useTestFocus();
  const searchRef = useTestFocus();
  const listRef = useRef<List>(null);
  const playlistRef = useRef<List>(null);
  const bookmarkRef = useRef<List>(null);
  const [playlist, setPlaylist] = useState<InputLessonPlan>(initialData)
  const [locked, setLocked] = useState<boolean>(false);
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
    }, pollInterval: 5000
  })

  const { data: articleData, loading: articleLoading, error: articleError } = useAllArticlesQuery({
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

  let lessonQuery = useMemo(() => lessonData?.allLessons.result, [lessonData])
  // let lessonQuery = lessonData ? lessonData.allLessons.result : null;
  let quizQuery = useMemo(() => quizData?.allquizzes.result, [quizData]);
  // const quizQuery = quizData?.allquizzes.result;
  let articleQuery = useMemo(() => articleData?.allarticles.result, [articleData])
  // const bookmarkQuery = userData ? userData.user.bookmarks : null;
  let bookmarkQuery = useMemo(() => userData ? userData.user.bookmarks : null, [userData]);

  useEffect(() => {
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
      // Map lessonQuery to lessonInput
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
      // Map quizQuery to quizInput
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
      // Map articleQuery to articleInput
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
  }, [lessonQuery, quizQuery, articleQuery]);


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

  // function onlyDefined(value: { main: string, secondary: undefined | string }, index: number, self: any) {
  //   return value.secondary !== undefined
  // }

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

  const updateListSize = () => {
    // resets the itemSize rendering for quizzes and articles
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

  let bookmarkPlans: any[] = [];
  const bookmarkedPlans = ({ bookmarkQuery, plans, viewer }: BookmarkProps) => {
    bookmarkPlans.push(...bookmarkQuery);
    plans.map((i) => {
      // bookmarkQuery?.find((val: any) => (val?.id === `${i._id}`)) || (i.creator === viewer.id)
      (i.creator === viewer.id) && bookmarkPlans.push(i)
    })
    return bookmarkPlans;
  }

  const RenderRow = ({ index, style }: RenderProps) => (
    <Draggable draggableId={`${plans[index]._id}`} index={index} key={plans[index]._id}>
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

  const RenderBookmarkRow = ({ index, style }: RenderProps) => (
    <Draggable draggableId={`${bookmarkPlans[index]._id}`} index={index} key={bookmarkPlans[index]._id}>
      {(provided, snapshot) => (
        <Grid item xs={12} md={12} lg={12} className="playlist--dropbox">
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getStyle({
            draggableStyle: provided.draggableProps.style,
            virtualStyle: style,
            isDragging: snapshot.isDragging
          })}
          >
            {(bookmarkPlans[index].startDate) ? (
              <CreatePlaylistCard {...bookmarkPlans[index]} />
            ) : (bookmarkPlans[index].questions && !bookmarkPlans[index].content) ? (
              <Card className="lesson--card">
                {`${bookmarkPlans[index].title}`}
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
            ) : (bookmarkPlans[index].content && (!bookmarkPlans[index].questions || !bookmarkPlans[index].startDate)) && (
              <Card className="lesson--card">
                {bookmarkPlans[index].title}
                <Chip label="Article" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
                <UsePreviewModal color={"#fff"} item={{
                  __typename: "Article",
                  content: bookmarkPlans[index].content,
                  creator: bookmarkPlans[index].creator,
                  id: bookmarkPlans[index]._id,
                  pdf: bookmarkPlans[index].pdf,
                  public: bookmarkPlans[index].public,
                  title: bookmarkPlans[index].title
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
  // let secCategories = secondaryCategory.filter(onlyDefined)
  // const secondaryCategories = new Map(secCategories.map((item: any) =>
  //   [item["secondary"], item])).values();

  // const combinedCategories = Array.from(secondaryCategories)
  // const selectedSecondary = allCategories.filter((b) => b.includes(selected[0]));
  // setCater(mainCategories.map((i) => false))
  const titleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    // let name = e.target.value;
    setPlaylist({
      plan: [...playlist.plan],
      name: e.target.value,
      creator: viewer && viewer.id ? viewer.id : "0",
      public: locked
    })
    window.localStorage.setItem('playlist', JSON.stringify(playlist));
    // e.target.onmouseleave = () => { setAutoSaved(true) }
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

    // Otherwise, cut the item from lessons array and push to new playlist
    let items = plans

    // Allow the user to reorder playlist if failed to drag and drop in correct order
    if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const [reorderedPlaylistItem] = playlist.plan.splice(source.index, 1);
      const displacedPlaylistItem = playlist.plan.slice(destination.index, (destination.index + 1));
      playlist.plan[destination.index] = reorderedPlaylistItem;
      playlist.plan.splice((destination.index + 1), 0, ...displacedPlaylistItem);
      setAutoSaved(true);
      // return playlist;
      return { ...playlist }
    }

    // if dragging and dropping within lessons simply return items unchanged
    if (source.droppableId === "lessons" && destination.droppableId === "lessons") {
      const [reorderedLesson] = items.splice(source.index, 1);
      const displacedLesson = items.slice(destination.index, (destination.index + 1));
      items[destination.index] = reorderedLesson;
      items.splice((destination.index + 1), 0, ...displacedLesson)
      // items.push(...displacedLesson);
      // return items;
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
      setAutoSaved(true);
      // TODO: Test this fires
      updatePlaylistSize();
    }

    if (destination.droppableId === "lessons") {
      const [reorderedPlay] = playlist.plan.splice(source.index, 1);
      const displacedPlay = items.slice(destination.index, (destination.index + 1));
      items[destination.index] = reorderedPlay;
      items.push(...displacedPlay)

      setPlans(items)
      setFilter(items)
      setPlaylist(playlist)
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
      // setSearchError(true)
      // setFilter(lessons)
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
    handleLock()
  }

  const handleSwitch = () => {
    setYourContent(!yourContent)
    updateBookmarkSize();
    handleCategoryClick("All", 0)
  }

  const handleLock = () => {
    setLocked(!locked);
    setPlaylist({ ...playlist, public: !locked });
  }

  const resetSearch = () => {
    setSearchInput("");
    setPlans(filter.filter(val => !playlist.plan.includes(val)))
    setSearchError(false);
    document.getElementById("lesson-search")?.focus();
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
    updateListSize();
    if (i === "All") {
      setPlans([...filter])
      return { ...filter }
      // DisplayError({ title: "All" })
    }

    if (i === "Quizzes") {
      setPlans([...filter.filter((e) => e.questions && e.questions?.length > 0)])
      return { ...filter }
    }

    if (i === "Articles") {
      setPlans([...filter.filter((c) => c.pdf || (c.content && c.content.blocks))])
      return { ...filter }
    }
    // setFilled(!filled)
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
                      {/* {provided.placeholder} */}
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
                  {/* Item id: {plans[rubric.source.index]._id} */}
                  {(plans[rubric.source.index].startDate) ? (
                    <CreatePlaylistCard {...plans[rubric.source.index]} />
                  ) : (plans[rubric.source.index].questions && !plans[rubric.source.index].content) ? (
                    <Card className="lesson--card">
                      {`${plans[rubric.source.index].title}`}
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
                      {yourContent && bookmarkedPlans({ bookmarkQuery: bookmarkQuery, plans: plans, viewer: viewer }) ? (
                        <List
                          ref={bookmarkRef}
                          height={800}
                          width="100%"
                          itemCount={bookmarkPlans.length}
                          itemSize={getItemSize}
                        >
                          {RenderBookmarkRow}
                        </List>
                      ) : (
                        <List
                          ref={listRef}
                          height={800}
                          width="100%"
                          itemCount={plans.length}
                          itemSize={getItemSize}
                        >
                          {RenderRow}
                        </List>
                      )}

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
          </Box>
          <Button
            className="createPlaylist--button"
            variant='contained'
            type='submit'
            disableRipple
            disableTouchRipple
          >Create</Button>
        </form >
      </Box>
      <Footer viewer={viewer} />
    </div>
  )
}
