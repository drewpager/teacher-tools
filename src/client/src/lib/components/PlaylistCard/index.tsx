import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Box,
  Snackbar,
  Avatar,
  Icon,
  IconButton,
  Card,
  TextField,
  Divider
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import QuizIcon from '@mui/icons-material/Quiz';
import ArticleIcon from '@mui/icons-material/Article';
import { Playlist, LessonPlanUnion, Viewer, useUserQuery, useAllUsersQuery, User } from '../../../graphql/generated';
import { QuizPlayer, ArticlePlayer, GoogleClassroomShareButton } from '../index';
import { VideosPlayer } from '../VideosPlayer';
import './playlistcard.scss';
import { formatDate, titleCase } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { DisplaySuccess } from '../../utils';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { PlaylistCardSkeleton } from './playlistCardSkeleton';
import { formatSlug } from '../../utils/formatSlug';
import PaidIcon from '@mui/icons-material/Paid';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import GradingIcon from '@mui/icons-material/Grading';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

interface Props {
  playlist: Playlist
  viewer?: Viewer;
}

const COPY_PLAYLIST = gql`
  mutation CopyPlaylist($id: ID!, $viewerId: String!) {
    copyPlaylist(id: $id, viewerId: $viewerId) {
      id
    }
  }
`;

interface CopyPlaylistData {
  id: string;
  name: string;
  plan: LessonPlanUnion[];
}

interface CopyPlaylistVariables {
  id: string;
  viewerId: string;
}

// NOTE: Pass lessons object instead of single lesson for Accordion to work correctly
export const PlaylistCard = ({ playlist, viewer }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [userError, setUserError] = useState<string>("");
  const [userSuccess, setUserSuccess] = useState<string>("");
  const navigation = useNavigate();
  // const [itemName, setItemName] = useState<LessonPlanUnion>(playlist && playlist.plan ? { ...playlist.plan[0] } : {})
  const [active, setActive] = useState<string>(playlist && playlist.plan ? `${playlist?.plan[0]?.id}` : `1`)
  const [copyPlaylist, { loading: CopyPlaylistLoading, error: CopyPlaylistError }] = useMutation<CopyPlaylistData, CopyPlaylistVariables>(COPY_PLAYLIST);
  const params = useParams();
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [teacherEmail, setTeacherEmail] = useState<string>("");

  const { data: allUsersData, loading: allUsersLoading, error: allUsersError } = useAllUsersQuery({
    variables: {
      limit: 1000,
      page: 1
    }
  })


  const { data, loading, error } = useUserQuery({
    variables: {
      id: `${playlist?.creator}`,
      playlistsPage: 1,
      lessonsPage: 1,
      articlesPage: 1,
      quizzesPage: 1,
      limit: 1
    }
  });

  // Calculate Estimated Completion Time for Lesson Plan
  useEffect(() => {
    let time: number = 0;
    playlist.plan.map((p) => {
      if (p?.__typename === "Quiz") {
        // Assumes 45 seconds to read and complete each question
        time = time + Math.round((p.questions.length * 45) / 60);
      }

      if (p?.__typename === "Lesson") {
        // Assumes 4 minutes to watch each lesson, on average
        time = time + 4;
      }

      if (p?.__typename === "Article") {
        let length: any = 0;
        if (p.content) {
          p.content?.blocks?.map((item) => length += item?.text?.length)
        }

        if (p.pdf) {
          // Assumes 5 minutes to review each PDF, on average
          length += 5000;
        }

        // Assumes read time of 17 Characters per second
        time = time + Math.round((length / 17) / 60);
      }
      setEstimatedTime(time);
    })
  }, [playlist.plan])

  useEffect(() => {
    let userEmails: string[] = [];
    allUsersData?.allUsers?.result.map((user) => {
      userEmails.push(user.contact);

      if (user?.contact === teacherEmail) {
        document.querySelector('.hide-premium')?.classList.remove('hide-premium');
        document.querySelector('.premium-content--card')?.classList.add('display-none');
        setOpen(false);
        setUserSuccess("Email Accepted!");
        setSuccessOpen(true);
      }
    })

    if (teacherEmail.length && userEmails.indexOf(teacherEmail) === -1) {
      setUserError("Teacher's Email Not Recognized!");
      setOpen(true);
    }
  }, [teacherEmail, allUsersData])

  if (loading) return (<PlaylistCardSkeleton />);

  if (error) return (<Alert severity="error">{error.message}</Alert>)

  let userImage = data?.user.avatar;
  let userName = data?.user.name;

  if (allUsersLoading) return (<></>);
  if (allUsersError) return (<Alert severity="error">{allUsersError.message}</Alert>);

  const handleChange = ({ ...item }: LessonPlanUnion) => {
    if (document.contains(document.getElementById("video-player"))) {
      document.getElementById("video-player")?.remove()
    }
    setActive(`${item.id}`)
    if (params.id !== undefined) {
      window.scrollTo(0, 0);
    }
  };

  function handleClose() {
    setOpen(false);
  }

  function handleSuccessClose() {
    setSuccessOpen(false);
  }

  const handleCopy = async (id: string, viewerId: string) => {
    if (viewerId === 'null' || viewerId === null || viewerId === undefined || viewerId === "undefined") {
      // setUserError("Please Login or Signup to Copy!");
      setOpen(true);
      return;
    }

    const res = await copyPlaylist({
      variables: {
        id: id,
        viewerId: viewerId
      }
    })
    if (res) {
      console.log("Copy Successful!")
      navigation(`/user/${viewerId}`)
      // return (<DisplaySuccess title="Copy Successful!" />);
    }
  }

  const copyPlaylistLoadingMessage = (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      // zIndex: 10,
    }} />
  );

  const copyPlaylistErrorMessage = (
    <Alert variant="outlined" severity="error">
      Unable to copy playlist!
    </Alert>
  );

  const handleNextButton = (active: string) => {
    // Create a map of ids to index and iterate through
    let ids: string[] = [];
    playlist.plan?.map((item) => ids.push(`${item?.id}`));
    let index = ids.indexOf(active);

    // when next button clicked setActive to the indexed id
    if (index === ids.length - 2) {
      setActive(ids[-1]);
    }
    setActive(ids[index + 1]);

    if (index === ids.lastIndexOf(ids[ids.length - 1])) {
      setActive(ids[0]);
    }

    // Scroll to top of next item when next button clicked

    const h2Title = document.querySelector('h2.playlist--title');

    if (h2Title) {
      h2Title.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const validateEmail = (email: string) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleTeacherEmail = (e: any) => {
    if (validateEmail(e) === true) {
      setTeacherEmail(e);
    }
  }

  return (
    <>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity="error" onClose={handleClose}>
            Please <Link to="/signup" style={{ color: "#FFF" }}>sign up</Link> or <Link to="/login" style={{ color: "#FFF" }}>login</Link> to copy lesson plan!
          </Alert>
        </Snackbar>
      )}
      {successOpen && (
        <Snackbar
          open={successOpen}
          autoHideDuration={5000}
          onClose={handleSuccessClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity="success" onClose={handleSuccessClose}>{userSuccess}</Alert>
        </Snackbar>
      )}
      <Box className="plan--breadcrumb">
        <p><Link to="/plans" style={{ color: "#000" }}>Plans</Link>
          {" "}
          <ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />
          {" "}
          {playlist?.category?.length && (
            <>
              <Link to={`/plan/${formatSlug(playlist?.category[0])}`} style={{ color: "#000" }}>
                {titleCase(`${playlist.category[0]}`)}
              </Link>
              {" "}
              <ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />
              {" "}
            </>)}
          {playlist.name}
        </p>
      </Box>
      <Box className="title-button--section">
        <Typography className='playlist--title' variant="h1">
          {playlist.name}
        </Typography>
        <Tooltip title={`Created by ${userName}`}>
          <Avatar alt="User Image" src={userImage} sx={{ mr: 2 }} className="avatar--creator" />
        </Tooltip>
        {CopyPlaylistLoading ? copyPlaylistLoadingMessage : null}
        {(playlist.creator === viewer?.id) ? (<Chip variant='filled' label="Your Content" className="yourContent-chip" />) : (
          <IconButton
            onClick={() => handleCopy(`${playlist.id}`, `${viewer?.id}`)}
            disabled={viewer?.id === null && playlist?.premium === true}
            disableRipple
            disableFocusRipple
            sx={{ color: "#000" }}
          >
            {/* {(params.id === undefined) ? <></> : <ContentCopyIcon />} */}
            <ContentCopyIcon />
          </IconButton>
        )}
        {CopyPlaylistError ? copyPlaylistErrorMessage : null}
        <Tooltip title="Assign via Google Classroom">
          <GoogleClassroomShareButton url={`https://www.platospeach.com/plans/${formatSlug(playlist.name)}`} />
        </Tooltip>
        {playlist.level && (
          <Box className="playlist--grade">
            <Tooltip title="Suggested Grade Level">
              <GradingIcon />
            </Tooltip>
            <Typography className='playlist--duration' variant="body1">{`Grades ${playlist.level && playlist.level[0]}-${playlist.level && playlist.level[1]}`}</Typography>
          </Box>
        )}
        <Box className="playlist--time">
          <Tooltip title="Estimated Completion Time">
            <HistoryToggleOffIcon />
          </Tooltip>
          <Typography className='playlist--duration' variant="body1">{estimatedTime}-{Math.round(estimatedTime * 1.25)} Minutes</Typography>
        </Box>
      </Box>
      {(!viewer?.id) && playlist.premium && (<Box className="premium-content hide-premium">
        <Card className="premium-content--card">
          <Typography variant="h3">Sign Up For A Free Account to View</Typography>
          <Typography variant="body1">This content is only available to members.</Typography>
          <Button variant="contained" href={'/signup'} className="premium-signup--prompt">Signup</Button>
          <Button variant="outlined" href={'/donate'} className="premium-subscribe--prompt">Donate</Button>
          <Divider />
          <Typography variant="h3" sx={{ mt: 1, mb: 1 }}>Students</Typography>
          <Typography variant="body1">Please enter your teacher's email address to unlock content:</Typography>
          <TextField placeholder="Teacher's Email" sx={{ width: "75%" }} onChange={(e) => handleTeacherEmail(e.target.value.toLowerCase())} />
        </Card>
      </Box>)}
      <Grid container className='playlistcard--grid'>
        <Timeline position="left" className='playist--grid__timeline'>
          {playlist?.plan?.map((item, id) => (
            <TimelineItem key={id}>
              {/* <TimelineOppositeContent>{item?.__typename === "Lesson" ? handleDateFormat(item.endDate) : ""}</TimelineOppositeContent> */}
              <ListItem disableGutters key={id}>
                <ListItemButton
                  disableGutters
                  id={`${item?.title}`}
                  className={active === `${item?.id}` ? 'playlistCard--button active' : 'playlistCard--button'}
                  onClick={() => handleChange({ ...item })}
                >
                  <ListItemText primary={item?.title} />
                </ListItemButton>
              </ListItem>
              <TimelineSeparator>
                <TimelineDot sx={{ mx: 1 }} color={active === `${item?.id}` ? "secondary" : "primary"} onClick={() => handleChange({ ...item })}>
                  {item?.__typename === "Lesson" ? <PlayCircleIcon sx={{ fontSize: 20 }} /> : item?.__typename === "Quiz" ? <QuizIcon sx={{ fontSize: 20 }} /> : item?.__typename === "Article" ? (<ArticleIcon sx={{ fontSize: 20 }} />) : <></>}
                </TimelineDot>
                {playlist.plan.length !== (id + 1) ? <TimelineConnector /> : <></>}
              </TimelineSeparator>
              <TimelineContent>{item?.__typename === "Lesson" ? `${formatDate(item.startDate)} - ${formatDate(item.endDate)}` : item?.__typename === "Quiz" ? "Quiz" : item?.__typename === "Article" ? "Article" : ""}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        {/* <Grid className='playlistcard--grid__list'>
          <List>
            {playlist?.plan?.map((item, id) => (
              <ListItem disableGutters key={id}>
                <ListItemButton
                  disableGutters
                  className={active === `${item?.id}` ? 'playlistCard--button active' : 'playlistCard--button'}
                  onClick={() => handleChange({ ...item })}
                >
                  <ListItemText primary={item?.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid> */}
        <Grid className='playlistcard--grid__video'>
          {playlist.plan?.filter((item) => item?.id === active).map((iter, index) => {
            if (iter?.__typename === "Quiz") {
              return (
                <QuizPlayer quiz={iter} key={index} />
              )
            }

            if (iter?.__typename === "Lesson") {
              return (
                // <VideosPlayer url={`${iter.video}`} key={index} />
                <VideosPlayer url={`${iter.video}`} key={iter.id} />
              )
            }

            if (iter?.__typename === "Article") {
              return (
                <ArticlePlayer article={iter} key={index} />
              )
            }
            return (
              <h2>Failed to load resource</h2>
            )
          })}
          <Box>
            <Button id="playlistcard--next_button" className="playlistcard--next_button" onClick={() => handleNextButton(active)} variant="contained">Next <SkipNextIcon /></Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}