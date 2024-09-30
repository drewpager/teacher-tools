import React, { useMemo, useEffect, useRef, useState } from 'react';
import { Viewer, useLessonQuery, useRelatedPlansQuery, useLessonTitleQuery, useUserQuery } from '../../graphql/generated';
import { Lesson as LessonProp } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { LinearProgress, Box, Chip, Card, Grid, Button, Typography, Tooltip, Alert, CircularProgress, Snackbar, IconButton } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { Footer, VideoPlayer } from '../../lib/components';
import { titleCase, formatDate, formatSlug } from '../../lib/utils';
import { Helmet } from 'react-helmet';
import { Link, redirect } from 'react-router-dom';
import { PublicPlaylistCard } from '../../lib/components/PublicPlaylistCard';
import { GoogleClassroomShareButton } from '../../lib/components';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import './lessonPage.scss';
interface Props {
  viewer: Viewer
}

type BookmarkLessonData = {
  bookmarkLesson: LessonProp;
}

type BookmarkLessonVariables = {
  id: string;
  viewer: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export const Lesson = ({ viewer }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [bookmarkError, setBookmarkError] = useState<boolean>(false);
  const [bookmarkStatus, setBookmarkStatus] = useState<string>('');
  const [bookmarked, setBookmarked] = useState<any[]>([]);

  const params = useParams()
  const title = titleCase(`${params.id}`.replaceAll(/-/g, " ").replaceAll(/_/g, "-"));

  // Trying to redirect to the correct lesson page

  // const loader = async (title: string) => {
  //   return redirect(`/lesson/${formatSlug(title)}`, 301);
  // };

  // const { data: lessonIdData, loading: lessonIdLoading, error: lessonIdError } = useLessonQuery({
  //   variables: {
  //     id: `${params.id}`
  //   }
  // });

  // if (lessonIdData) {
  //   let title = lessonIdData?.lesson?.title;
  //   title && loader(title)
  // }

  // if (lessonIdLoading) {
  //   console.log("Loading lesson id...")
  // }

  // if (lessonIdError) {
  //   console.log("Error loading lesson id");
  // }

  const { data: userData, loading: userLoading, error: userError } = useUserQuery({
    variables: {
      id: `${viewer?.id}`,
      playlistsPage: 1,
      lessonsPage: 1,
      quizzesPage: 1,
      articlesPage: 1,
      limit: 1
    }
  })

  useEffect(() => {
    if (userData?.user?.bookmarks) {
      const bookmarkIds = userData.user.bookmarks.map(i => i?.id);
      setBookmarked(prevBookmarks => [...prevBookmarks, ...bookmarkIds]);
    }
  }, [userData]);

  const { data, loading, error } = useLessonTitleQuery({
    variables: {
      title: title
    },
    fetchPolicy: 'cache-first',
  });

  const { data: relatedPlansData, loading: relatedPlansLoading, error: relatedPlansError } = useRelatedPlansQuery({
    variables: {
      id: `${data?.lessonTitle.id}`
    },
    fetchPolicy: 'no-cache',
  })

  const handleClose = () => {
    setOpen(false)
    setBookmarkError(false)
  }

  const BOOKMARK_LESSON = gql`
    mutation BookmarkLesson($id: ID!, $viewer: String!) {
      bookmarkLesson(id: $id, viewer: $viewer)
    }
  `;

  const [bookmarkLesson, { loading: BookmarkLessonLoading, error: BookmarkLessonError }] = useMutation<BookmarkLessonData, BookmarkLessonVariables>(BOOKMARK_LESSON);

  const onBookmark = async (id: string, viewer: string) => {
    if (viewer === "null") {
      setBookmarkError(true)
      setOpen(true)
    } else {
      let res = await bookmarkLesson({
        variables: {
          id,
          viewer
        }
      })
      setBookmarkStatus(`${res.data?.bookmarkLesson}`)
      setBookmarked(prevBookmarks => prevBookmarks.includes(`${id}`) ? prevBookmarks.splice(prevBookmarks.indexOf(`${id}`), 1) && [...prevBookmarks] : [...prevBookmarks, `${id}`]);
      res && setOpen(true)
    }
  }

  const lesson = data ? data.lessonTitle : null;

  const script = lesson?.script;

  BookmarkLessonLoading && (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
    }} />
  )

  BookmarkLessonError && (
    <Alert variant="outlined" severity="error">
      Oops, something went wrong in the bookmarking process!
    </Alert>
  );

  if (loading || relatedPlansLoading) {
    return (
      <LinearProgress />
    )
  }

  if (error) {
    return (
      <>
        <DisplayError title='Failed to load lesson' />
      </>
    )
  }

  if (relatedPlansError) {
    return (
      <>
        <DisplayError title='Failed to load related lesson plans' />
      </>
    )
  }

  const formatSlugSpaces = (slug: string) => {
    return slug.trim().replaceAll(" ", '%20');
  }

  const GetVideoDuration = (duration: number) => {
    let seconds = duration;
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));

    // console.log("Seconds: ", seconds)
    // Build the ISO 8601 duration string
    let isoDuration = 'P';
    if (days > 0) {
      isoDuration += `${days}D`;
    }
    if (hours > 0 || minutes > 0 || seconds > 0) {
      isoDuration += 'T';
      if (hours > 0) {
        isoDuration += `${hours}H`;
      }
      if (minutes > 0) {
        isoDuration += `${minutes}M`;
      }
      if (seconds > 0) {
        isoDuration += `${seconds}S`;
      }
    }

    return isoDuration;
  }

  let dur = GetVideoDuration(lesson?.duration ? lesson.duration : 0);

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "VideoObject",
    "name": lesson?.title,
    "description": lesson?.meta,
    "thumbnailUrl": lesson?.image,
    "uploadDate": new Date().toISOString(),
    "duration": dur,
    "contentUrl": lesson?.video
  };

  return (
    <>
      <Box className="lesson--page">
        <Helmet>
          <title>{lesson?.title} | Plato's Peach</title>
          <meta name="description" content={lesson?.meta?.length ? `${lesson?.meta}` : `A short documentary of ${lesson?.title} from ${formatDate(lesson?.startDate)} to ${formatDate(lesson?.endDate)}.`} />
          <link rel="canonical" href={`https://www.platospeach.com/lesson/${formatSlug(lesson?.title)}`} />
          {lesson?.duration && <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>}
        </Helmet>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Box className="article--section">
              <h1>{lesson?.title}</h1>
              {lesson?.startDate === lesson?.endDate ? (
                <Chip variant="filled" label={`${formatDate(lesson?.startDate)}`} color="primary" className='lesson--category' />
              ) : (
                <Chip variant="filled" label={`${formatDate(lesson?.startDate)} - ${formatDate(lesson?.endDate)}`} color="primary" className='lesson--category' />
              )}
              {lesson?.category?.map((i, ind) => (
                <Link to={`/catalog#${formatSlugSpaces(`${i}`)}`}>
                  <Chip variant='outlined' label={titleCase(`${i}`)} key={ind} color="error" className='lesson--category' />
                </Link>
              ))}
              <Tooltip title={bookmarked?.includes(`${lesson?.id}`) ? "Bookmarked, Click to Unbookmark" : "Bookmark for Lesson Plan"} placement="top">
                <IconButton
                  className="bookmark--button"
                  aria-label="bookmark"
                  disableRipple
                  disableFocusRipple
                  onClick={() => onBookmark(`${lesson?.id}`, `${viewer.id}`)}
                >
                  <BookmarkAddIcon fontSize={"large"} color={bookmarked?.includes(`${lesson?.id}`) ? "success" : "primary"} sx={{ paddingTop: '0.5rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Assign via Google Classroom">
                <GoogleClassroomShareButton url={`https://www.platospeach.com/lesson/${lesson?.id}`} />
              </Tooltip>
              <>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: 'center' }}
                >
                  {/* If not logged in, throw error/prompt when bookmark button clicked, otherwise bookmark successfully */}
                  {bookmarkError || (!viewer) ?
                    (
                      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} variant="filled">
                        Please <Link to="/signup" style={{ color: "#FFF" }}>sign up</Link> or <Link to="/login" style={{ color: "#FFF" }}>login</Link> to bookmark!
                      </Alert>
                    ) :
                    (
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} variant="filled">
                        {titleCase(`${bookmarkStatus}!`)}
                      </Alert>
                    )}
                </Snackbar>
              </>
              <Box className="lesson-video--section">
                <VideoPlayer
                  url={`${lesson?.video}`}
                />
              </Box>
              {lesson?.script && (
                <>
                  <h4>Transcript</h4>
                  <div dangerouslySetInnerHTML={{ __html: lesson?.script }}></div>
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Box className="featuredPlans--section">
              <h2>Featured Lesson Plans</h2>
              {relatedPlansData?.relatedPlans.map((plan: any) => (
                <Box className="featuredPlan--card">
                  {plan.public && <PublicPlaylistCard key={plan.id} {...plan} viewer={viewer} />}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Card className="incallAction--home">
        <Grid container className="grid--container">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="grid--text">
              <Typography variant='h3' className='incallAction--text'>Use This Video in a Custom Plan!</Typography>
              <Typography variant='h5' className='incallAction--subText'>Free Sign Up to browse and bookmark our catalog, create lesson plans for your curriculum, build custom assessments, and assign to students.</Typography>
              <div className='incallAction--buttonDiv'>
                <Link to="/signup" style={{ textDecoration: 'none' }}><Button variant="contained" className="incallAction--buttonFirst">Get Started For Free</Button></Link>
                <Link to="/plans" style={{ textDecoration: 'none' }}><Button variant="contained" className="incallAction--buttonSecond">Use Lesson Plan Templates</Button></Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
      <Footer />
    </>
  )
}