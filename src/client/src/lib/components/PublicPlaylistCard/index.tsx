import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert, Tooltip, Snackbar, Chip, Avatar, Skeleton, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LessonPlanUnion, Viewer, useUserQuery } from '../../../graphql/generated';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { DisplayError, DisplaySuccess } from '../../utils';
import { formatSlug } from '../../utils/formatSlug';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PaidIcon from '@mui/icons-material/Paid';
import "./publicPlaylistCardStyles.scss";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import GradingIcon from '@mui/icons-material/Grading';

type Props = {
  id?: string | null | undefined;
  name: string;
  plan: any[];
  creator: string;
  premium: boolean;
  viewer: Viewer
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


export const PublicPlaylistCard = ({ id, name, plan, creator, premium, viewer }: Props) => {
  const navigation = useNavigate();
  const [copyPlaylist, { loading: CopyPlaylistLoading, error: CopyPlaylistError }] = useMutation<CopyPlaylistData, CopyPlaylistVariables>(COPY_PLAYLIST);
  const [open, setOpen] = useState<boolean>(false);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);

  // Calculate Estimated Completion Time for Lesson Plan
  useEffect(() => {
    let time: number = 0;
    plan.map((p) => {
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
          p.content?.blocks?.map((item: any) => length += item?.text?.length)
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
  }, [plan])

  const { data: userData, loading: userLoading, error: userError } = useUserQuery({
    variables: {
      id: `${creator}`,
      playlistsPage: 1,
      lessonsPage: 1,
      quizzesPage: 1,
      articlesPage: 1,
      limit: 1
    }
  })

  if (userLoading) return (
    <Grid item lg={4} md={6} sm={12} xs={12} key={id}>
      <Skeleton variant="rectangular" height="100px" sx={{ m: "1rem" }} />
      <br />
    </Grid>
  );
  if (userError) return (<DisplayError title={userError.message} />)

  const image = userData?.user?.avatar;
  const userName = userData?.user?.name;

  const handleClose = () => {
    setOpen(false);
  }

  const handleCopy = async (id: string, viewerId: string) => {
    if (viewerId === 'null' || viewerId === null || viewerId === undefined || viewerId === "undefined") {
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
    <Grid item lg={4} md={6} sm={12} xs={12} key={id}>
      <ListItem key={id}>
        <Card sx={{ width: "90vw" }}>
          <CardContent>
            <Link to={`/plans/${formatSlug(name)}`} style={{ textDecoration: "none" }}>
              <Typography variant='h4' style={{ color: "#000", marginBottom: "0.5rem" }} className="public-playlist--title">
                {name}
              </Typography>
            </Link>
            <Box className="playlist-card--time">
              <Tooltip title="Estimated Completion Time">
                <HistoryToggleOffIcon />
              </Tooltip>
              <Typography className='playlist--duration' variant="body1">{estimatedTime}-{Math.round(estimatedTime * 1.25)} Minutes</Typography>
            </Box>
            {/* <Box className="playlist-card--time">
              <Tooltip title="Suggested Grade Level">
                <GradingIcon />
              </Tooltip>
              <Typography className='playlist--duration' variant="body1">Grades {level}</Typography>
            </Box> */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title={userName}>
                <Avatar alt="creator headshot" src={image} sx={{ marginRight: "0.5rem" }} />
              </Tooltip>
              {CopyPlaylistLoading ? copyPlaylistLoadingMessage : (
                creator === viewer?.id ? (<Chip variant='filled' label="Your Content" />) : premium ? (<></>) : (
                  <Tooltip title={viewer?.paymentId === null && premium ? "Become a subscriber to copy!" : "Copy Lesson Plan!"}>
                    <IconButton
                      disableRipple
                      className="copy-icon"
                      onClick={() => handleCopy(`${id}`, `${viewer?.id}`)}
                      disabled={viewer?.paymentId === null && premium}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                )
              )}
              {CopyPlaylistError ? copyPlaylistErrorMessage : null}
              {premium ?
                <Chip icon={<PaidIcon color="success" />} label="Premium" sx={{ backgroundColor: "#e9efe7", marginLeft: "0.25rem" }} /> :
                <Chip icon={<PaidIcon color="warning" />} label="Free" sx={{ backgroundColor: "#ebebeb", marginLeft: "0.25rem" }} />}
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                open={open}
                onClose={handleClose}
                key={id}
              >
                <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                  Please sign up or log in to copy a lesson plan!
                </Alert>
              </Snackbar>
            </Box>
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}