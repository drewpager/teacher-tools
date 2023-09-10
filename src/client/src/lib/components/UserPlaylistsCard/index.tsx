import React, { useState } from 'react';
import { Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert, Tooltip, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Playlist, Lesson, LessonPlanUnion } from '../../../graphql/generated';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { DisplaySuccess } from '../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../theme';

interface Props {
  playlist: {
    id: string
    name: string
    plan: [LessonPlanUnion]
    creator: string
    authorized: boolean
  }
}

export const UserPlaylistsCard = ({ playlist }: Props) => {
  const navigation = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

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
  // interface UpdatePlaylistData {
  //   updatePlaylist: Playlist
  // }

  // interface UpdatePlaylistVariables {
  //   id: string
  // }
  const [deletePlaylist, { loading: DeletePlaylistLoading, error: DeletePlaylistError }] = useMutation<DeletePlaylistData, DeletePlaylistVariables>(DELETE_PLAYLIST);
  // const [updatePlan, { loading: UpdatePlanLoading, error: UpdatePlanError }] = useMutation<UpdatePlaylistData, UpdatePlaylistVariables>(UPDATE_PLAN);

  const handleDelete = async (id: string) => {
    const res = await deletePlaylist({ variables: { id } })
    if (res) {
      // window.location.reload();
      return (<DisplaySuccess title="Deletion Successful!" />);
    }
  }

  const handleUpdate = async (id: string) => {
    navigation(`/edit/${id}`)
    // await updatePlan({ variables: { id} })
  }

  const deletePlaylistLoadingMessage = (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
    }} />
  );

  // const updatePlanLoadingMessage = deletePlaylistLoadingMessage;

  const deletePlaylistErrorMessage = (
    <Alert variant="outlined" severity="error">
      Oops, something went wrong in the deletion process!
    </Alert>
  );

  // const updatePlanErrorMessage = (
  //   <Alert variant="outlined" severity="error">
  //     Oops, unable to edit playlist right now!
  //   </Alert>
  // );

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Grid item lg={4} md={6} sm={12} xs={12} key={playlist.id}>
      <ListItem key={playlist.id}>
        <Card sx={{ width: "90vw" }}>
          <CardContent>
            <Link to={`/playlist/${playlist.id}`} style={{ textDecoration: "none" }}>
              <Typography variant='h4' style={{ color: "#000" }}>
                {playlist.name}
              </Typography>
              <Typography variant='h6' style={{ color: "#000" }}>
                {playlist.plan.length} {playlist.plan.length === 1 ? " Item" : " Items"}
              </Typography>
            </Link>
            <Tooltip title="Edit contents of playlist!">
              <Button onClick={() => handleUpdate(playlist.id)}><EditIcon /></Button>
            </Tooltip>
            {DeletePlaylistLoading ? deletePlaylistLoadingMessage : (
              <Tooltip title="Delete playlist!">
                <IconButton sx={{ color: "#000" }}>
                  <DeleteIcon onClick={() => setOpen(true)} />
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      <Typography variant="h3">Are you sure you want to delete this lesson plan?</Typography>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => handleDelete(playlist.id)} autoFocus>
                        Delete Lesson Plan
                      </Button>
                    </DialogActions>
                  </Dialog>
                </IconButton>
              </Tooltip>
            )}
            {DeletePlaylistError ? deletePlaylistErrorMessage : null}
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}