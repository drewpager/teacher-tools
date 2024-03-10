import React, { useState } from 'react';
import { Box, Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert, Tooltip, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Playlist, LessonPlanUnion, useUserQuery } from '../../../graphql/generated';
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
  },
  paymentId: string
}

export const UserPlaylistsCard = ({ playlist, paymentId }: Props) => {
  const navigation = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [publicDialogOpen, setPublicDialogOpen] = useState<boolean>(false);

  const DELETE_PLAYLIST = gql`
    mutation DeletePlaylist($id: ID) {
      deletePlaylist(id: $id)
    }
  `;

  const UPDATE_PUBLIC = gql`
    mutation UpdatePlanPublic($id: ID, $publicStatus: Boolean) {
      updatePlanPublic(id: $id, publicStatus: $publicStatus)
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

  interface UpdatePublicData {
    updatePlanPublic: Boolean
  }

  interface UpdatePublicVariables {
    id: string
    publicStatus: boolean
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
  const [updatePlanPublic, { loading: UpdatePublicLoading, error: UpdatePublicError }] = useMutation<UpdatePublicData, UpdatePublicVariables>(UPDATE_PUBLIC);

  const handleDelete = async (id: string) => {
    const res = await deletePlaylist({ variables: { id } })
    if (res) {
      // window.location.reload();
      return (<DisplaySuccess title="Deletion Successful!" />);
    }
  }

  const handleUpdatePublic = async (id: string, publicStatus: boolean) => {
    const res = await updatePlanPublic({
      variables: {
        id: id,
        publicStatus: publicStatus
      }
    })
    if (res) {
      return (<Alert severity="success" title={`Lesson Plan Successfully Marked ${!publicStatus}`} />);
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

  const updatePublicLoadingMessage = (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
    }} />
  )

  const deletePlaylistErrorMessage = (
    <Alert variant="outlined" severity="error">
      Oops, something went wrong in the deletion process!
    </Alert>
  );

  const updatePublicErrorMessage = (
    <Alert variant="outlined" severity="error">
      Unable to update public status at this time!
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

  const handlePublicDialogClose = () => {
    setPublicDialogOpen(false);
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
                <IconButton onClick={() => setPublicDialogOpen(true)} disableRipple>
                  {playlist.public ? <LockOpenIcon sx={{ color: theme.palette.primary.main }} /> : <LockIcon sx={{ color: theme.palette.primary.main }} />}
                </IconButton>
              </Tooltip>
              <Dialog
                open={publicDialogOpen}
                onClose={handlePublicDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <Typography variant="h3">{`Are you sure you want to make this lesson plan ${playlist.public ? "private" : "public"}?`}</Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {`If you change your mind, you can easily switch back to ${playlist.public ? "public" : "private"}.`}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handlePublicDialogClose}>Cancel</Button>
                  <Button onClick={() => { handleUpdatePublic(playlist.id, playlist.public); handlePublicDialogClose() }} autoFocus>
                    Make Lesson Plan {playlist.public ? "Private" : "Public"}
                  </Button>
                </DialogActions>
              </Dialog>
              {UpdatePublicLoading ? updatePublicLoadingMessage : null}
              <Tooltip title="Edit contents of playlist!">
                <IconButton onClick={() => handleUpdate(playlist.id)} sx={{ color: "#000", ml: 0.5 }} disableRipple>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {DeletePlaylistLoading ? deletePlaylistLoadingMessage : (
                <>
                  <Tooltip title="Delete playlist!">
                    <IconButton
                      onClick={() => setOpen(true)}
                      sx={{ color: "#000" }}
                      disableRipple
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
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
                      <Button onClick={() => handleClose()}>Cancel</Button>
                      <Button onClick={() => { handleDelete(playlist.id); handleClose() }} autoFocus>
                        Delete Lesson Plan
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </Box>
            {DeletePlaylistError ? deletePlaylistErrorMessage : null}
            {UpdatePublicError ? updatePublicErrorMessage : null}
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}