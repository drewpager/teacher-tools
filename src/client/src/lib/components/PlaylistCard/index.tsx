import React, { useState } from 'react';
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
import { QuizPlayer, ArticlePlayer } from '../index';
import { VideosPlayer } from '../VideosPlayer';
import './playlistcard.scss';
import { formatDate } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { DisplaySuccess } from '../../utils';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

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

  if (loading) return (<CircularProgress />);

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
      navigation(`/user/${viewerId}`)
      return (<DisplaySuccess title="Copy Successful!" />);
    }
  }

  const copyPlaylistLoadingMessage = (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
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

    // Scroll to top of page when next button clicked if on playlist page
    if (params.id !== undefined) {
      window.scrollTo(0, 0);
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
        {CopyPlaylistLoading ? copyPlaylistLoadingMessage : (
          (playlist.creator === viewer?.id) ? (<Chip variant='filled' label="Your Content" />) : (
            <Tooltip title="Copy playlist!">
              <Button onClick={() => handleCopy(`${playlist.id}`, `${viewer?.id}`)}>
                {(params.id === undefined) ? <></> : <ContentCopyIcon />}
              </Button>
            </Tooltip>
          )
        )}
        {CopyPlaylistError ? copyPlaylistErrorMessage : null}
      </Box>
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
          <Box sx={{ margin: 2 }}>
            <Button className="playlistcard--next_button" onClick={() => handleNextButton(active)} variant="outlined">Next <SkipNextIcon /></Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}