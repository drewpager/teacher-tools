import React from 'react';
import { Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LessonPlanUnion, Viewer } from '../../../graphql/generated';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { DisplayError, DisplaySuccess } from '../../utils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import theme from '../../../theme';

type Props = {
  id?: string | null | undefined;
  name: string;
  plan: any[];
  creator: string;
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


export const PublicPlaylistCard = ({ id, name, plan, creator, viewer }: Props) => {
  const navigation = useNavigate();
  const [copyPlaylist, { loading: CopyPlaylistLoading, error: CopyPlaylistError }] = useMutation<CopyPlaylistData, CopyPlaylistVariables>(COPY_PLAYLIST);

  const handleCopy = async (id: string, viewerId: string) => {
    if (viewerId === 'null' || viewerId === null) {
      console.log("Please sign up or log in to copy a playlist!");
      return (
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          Please sign up or log in to copy a playlist!
        </Alert>
      )
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
            <Link to={`/playlist/${id}`} style={{ textDecoration: "none" }}>
              <Typography variant='h4' style={{ color: "#000" }}>
                {name}
              </Typography>
              <Typography variant='h6' style={{ color: "#000" }}>
                {plan.length} {plan.length === 1 ? " Item" : " Items"}
              </Typography>
            </Link>
            {CopyPlaylistLoading ? copyPlaylistLoadingMessage : (
              <Tooltip title="Copy playlist!">
                {creator === viewer?.id ? (<></>) : (
                  <Button onClick={() => handleCopy(`${id}`, `${viewer?.id}`)}><ContentCopyIcon /></Button>
                )}
              </Tooltip>
            )}
            {CopyPlaylistError ? copyPlaylistErrorMessage : null}
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}