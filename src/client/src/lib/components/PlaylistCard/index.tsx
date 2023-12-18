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
import { Playlist, LessonPlanUnion, Viewer, useUserQuery } from '../../../graphql/generated';
import { QuizPlayer, ArticlePlayer, GoogleClassroomShareButton } from '../index';
import { VideosPlayer } from '../VideosPlayer';
import './playlistcard.scss';
import { formatDate } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { DisplaySuccess } from '../../utils';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { PlaylistCardSkeleton } from './playlistCardSkeleton';
import { formatSlug } from '../../utils/formatSlug';
import PaidIcon from '@mui/icons-material/Paid';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
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
  const [userError, setUserError] = useState<string>("");
  const navigation = useNavigate();
  // const [itemName, setItemName] = useState<LessonPlanUnion>(playlist && playlist.plan ? { ...playlist.plan[0] } : {})
  const [active, setActive] = useState<string>(playlist && playlist.plan ? `${playlist?.plan[0]?.id}` : `1`)
  const [copyPlaylist, { loading: CopyPlaylistLoading, error: CopyPlaylistError }] = useMutation<CopyPlaylistData, CopyPlaylistVariables>(COPY_PLAYLIST);
  const params = useParams();
  const [estimatedTime, setEstimatedTime] = useState<number>(0);

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

  if (loading) return (<PlaylistCardSkeleton />);

  if (error) return (<Alert severity="error">{error.message}</Alert>)

  let userImage = data?.user.avatar;
  let userName = data?.user.name;


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

  const handleCopy = async (id: string, viewerId: string) => {
    if (viewerId === 'null' || viewerId === null || viewerId === undefined || viewerId === "undefined") {
      setUserError("Please Login or Signup to Copy!");
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

  return (
    <>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity="error" onClose={handleClose}>{userError}</Alert>
        </Snackbar>
      )}
      <Box className="title-button--section">
        <Typography className='playlist--title' variant="h2">
          {playlist.name}
        </Typography>
        <Tooltip title={`Created by ${userName}`}>
          <Avatar alt="User Image" src={userImage} sx={{ mr: 2 }} className="avatar--creator" />
        </Tooltip>
        {CopyPlaylistLoading ? copyPlaylistLoadingMessage : null}
        {(playlist.creator === viewer?.id) ? (<Chip variant='filled' label="Your Content" className="yourContent-chip" />) : (
          <IconButton
            onClick={() => handleCopy(`${playlist.id}`, `${viewer?.id}`)}
            disabled={viewer?.paymentId === null && playlist?.premium === true}
            disableRipple
            disableFocusRipple
            sx={{ color: "#000" }}
          >
            {/* {(params.id === undefined) ? <></> : <ContentCopyIcon />} */}
            <ContentCopyIcon />
          </IconButton>
        )}
        {CopyPlaylistError ? copyPlaylistErrorMessage : null}
        {playlist.premium ? <Link to={!viewer?.id ? "/signup" : "/plans"}><Chip icon={<PaidIcon color="success" />} label="Premium" sx={{ backgroundColor: "#e9efe7", mr: 0.5 }} /></Link> : null}
        <Tooltip title="Assign via Google Classroom">
          <GoogleClassroomShareButton url={`https://www.platospeach.com/plans/${formatSlug(playlist.name)}`} />
        </Tooltip>
        <Tooltip title="Estimtated Completion Time">
          <HistoryToggleOffIcon />
        </Tooltip>
        <Typography className='playlist--duration' variant="body1">{estimatedTime}-{Math.round(estimatedTime * 1.5)} Minutes</Typography>
      </Box>
      {(!viewer?.paymentId || viewer.paymentId === null) && playlist.premium && (<Box className="premium-content hide-premium" />)}
      <Grid container className='playlistcard--grid'>
        <Timeline position="left" className='playist--grid__timeline'>
          {playlist?.plan?.map((item, id) => (
            <TimelineItem key={id}>
              {/* <TimelineOppositeContent>{item?.__typename === "Lesson" ? handleDateFormat(item.endDate) : ""}</TimelineOppositeContent> */}
              <ListItem disableGutters key={id}>
                <ListItemButton
                  disableGutters
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
                <VideosPlayer url={`${iter.video}`} key={index} />
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
            <Button className="playlistcard--next_button" onClick={() => handleNextButton(active)} variant="contained">Next <SkipNextIcon /></Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}