import React from 'react';
import { Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { Playlist, Lesson } from '../../../graphql/generated';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { DisplaySuccess } from '../../utils';

interface Props {
  playlist: {
    id: string
    name: string
    plan: Lesson[]
    creator: string
    authorized: boolean
  }
}

export const UserPlaylistsCard = ({ playlist }: Props) => {
  const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($id: ID) {
    deletePlaylist(id: $id)
  }
`;

interface DeletePlaylistData {
  deletePlaylist: Playlist
}

interface DeletePlaylistVariables {
  id: string
}

const [deletePlaylist, { loading: DeletePlaylistLoading, error: DeletePlaylistError}] = useMutation<DeletePlaylistData, DeletePlaylistVariables>(DELETE_PLAYLIST);

const handleDelete = async (id: string) => {  
    const res = await deletePlaylist({ variables: { id }})
    if (res) {
      // window.location.reload();
      return <DisplaySuccess title="Deletion Successful!" />
    }
  }

  const deletePlaylistLoadingMessage = (
    <CircularProgress sx={{
              color: 'inherit',
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 1,
            }}/>
    );
    
    const deletePlaylistErrorMessage = (
      <Alert variant="outlined" severity="error">
        Oops, something went wrong in the deletion process!
      </Alert>
    );

  return (
    <Grid item lg={4} md={6} sm={12} xs={12} key={playlist.id}>
    <ListItem key={playlist.id}>
      <Card>
        <CardContent>
          <Link to={`/playlist/${playlist.id}`} style={{ textDecoration: "none" }}>
            <Typography variant='h3'>
              {playlist.name}
            </Typography>
          </Link>
          {DeletePlaylistLoading ? deletePlaylistLoadingMessage : <Button onClick={() => handleDelete(playlist.id)}>Delete</Button>}
          {DeletePlaylistError ? deletePlaylistErrorMessage : null}
        </CardContent>
      </Card>
    </ListItem>
  </Grid>
  )
}