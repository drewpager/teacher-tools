import React, { useState } from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Box,
  Snackbar
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QuizIcon from '@mui/icons-material/Quiz';
import ArticleIcon from '@mui/icons-material/Article';
import { Playlist, Lesson, LessonPlanUnion, Viewer } from '../../../graphql/generated';
import { VideoPlayer, QuizPlayer, ArticlePlayer } from '../index';
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
  // const [video, setVideo] = useState<string>()
  const [open, setOpen] = useState<boolean>(false);
  const [userError, setUserError] = useState<string>("");
  const navigation = useNavigate();
  const [itemName, setItemName] = useState<LessonPlanUnion>(playlist && playlist.plan ? { ...playlist.plan[0] } : {})
  const [active, setActive] = useState<string>(playlist && playlist.plan ? `${playlist?.plan[0]?.id}` : `1`)
  const [copyPlaylist, { loading: CopyPlaylistLoading, error: CopyPlaylistError }] = useMutation<CopyPlaylistData, CopyPlaylistVariables>(COPY_PLAYLIST);
  const params = useParams();

  const handleChange = ({ ...item }: LessonPlanUnion) => {
    setItemName(item)
    setActive(`${item.id}`)
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
        <Typography className='playlist--title' variant="h2" sx={{ py: 1 }}>
          {playlist.name}
        </Typography>
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
                <VideoPlayer url={`${iter?.video}`} key={index} />
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
        </Grid>
      </Grid>
    </>
  )
}