import React, { useState } from 'react';
import { Box, Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert, Tooltip, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Playlist, LessonPlanUnion, LessonPlanInput } from '../../../graphql/generated';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { DisplaySuccess } from '../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import theme from '../../../theme';
import './userPlaylistsCard.scss';

interface Props {
  playlist: {
    id: string
    name: string
    plan: [LessonPlanUnion]
    creator: string
    authorized: boolean
    public: boolean
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

  // const UPDATE_PLAN = gql`
  //   mutation UpdatePlan($input: LessonPlanInput, $id: ID) {
  //     updatePlan(input: $input, id: $id)
  //   }
  // `;

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
  //   input: LessonPlanInput
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

  // const handleUpdatePublic = async (id: string) => {
  //   console.log({
  //     name: playlist.name,
  //     plan: playlist.plan,
  //     creator: playlist.creator,
  //     public: !playlist.public
  //   })
  //   await updatePlan({
  //     variables: {
  //       input: {
  //         name: playlist.name,
  //         plan: playlist.plan,
  //         creator: playlist.creator,
  //         public: !playlist.public
  //       },
  //       id
  //     }
  //   })

  //   if (UpdatePlanError) {
  //     console.log("Update Plan Error: ", UpdatePlanError)
  //   }

  //   if (UpdatePlanLoading) {
  //     console.log("Update Plan Loading: ", UpdatePlanLoading)
  //   }

  //   console.log("Update Plan Apparently Succeeded")
  // }

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

  const formatSlug = (title: any) => {
    return title.toLowerCase().replace(/ /g, "-");
  }

  return (
    <Grid item lg={4} md={6} sm={12} xs={12} key={playlist.id}>
      <ListItem key={playlist.id}>
        <Card className="user-playlists--card">
          <CardContent>
            <Link to={`/plans/${formatSlug(playlist.name)}`} style={{ textDecoration: "none" }}>
              <Typography variant='h4' style={{ color: "#000" }}>
                {playlist.name}
              </Typography>
              <Typography variant='h6' style={{ color: "#000" }}>
                {playlist.plan.length} {playlist.plan.length === 1 ? " Item" : " Items"}
              </Typography>
            </Link>
            <Box className="user-playlists--buttons">
              <Tooltip title={`${playlist.public ? "Public" : "Private"}`}>
                {/* <IconButton onClick={() => handleUpdatePublic(playlist.id)} disableRipple> */}
                {playlist.public ? <LockOpenIcon sx={{ color: theme.palette.primary.main }} /> : <LockIcon sx={{ color: theme.palette.primary.main }} />}
                {/* </IconButton> */}
              </Tooltip>
              <Tooltip title="Edit contents of playlist!">
                <IconButton onClick={() => handleUpdate(playlist.id)} sx={{ color: "#000", ml: 0.5 }} disableRipple>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {DeletePlaylistLoading ? deletePlaylistLoadingMessage : (
                <Tooltip title="Delete playlist!">
                  <IconButton
                    onClick={() => setOpen(true)}
                    sx={{ color: "#000" }}
                    disableRipple
                  >
                    <DeleteIcon />
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
                        <Button onClick={() => { handleDelete(playlist.id); handleClose() }} autoFocus>
                          Delete Lesson Plan
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            {DeletePlaylistError ? deletePlaylistErrorMessage : null}
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}