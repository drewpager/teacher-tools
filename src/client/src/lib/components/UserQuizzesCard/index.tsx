import React from 'react';
import { Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Playlist, Lesson, Quiz, Questions, Quizzes } from '../../../graphql/generated';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { DisplaySuccess } from '../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../theme';

interface Props {
  quiz: {
    creator: string;
    id: string;
    questions: [Questions];
    title: string;
  }
}

export const UserQuizzesCard = ({ quiz }: Props) => {
  // const navigation = useNavigate();

//   const DELETE_PLAYLIST = gql`
//   mutation DeletePlaylist($id: ID) {
//     deletePlaylist(id: $id)
//   }
// `;

//   const UPDATE_PLAN = gql`
//     mutation UpdatePlan($input: playlist) {
//       updatePlan(input: $input)
//     }
//   `;

// interface DeletePlaylistData {
//   deletePlaylist: Playlist
// }

// interface DeletePlaylistVariables {
//   id: string
// }
// interface UpdatePlaylistData {
//   updatePlaylist: Playlist
// }

// interface UpdatePlaylistVariables {
//   id: string
// }
// const [deletePlaylist, { loading: DeletePlaylistLoading, error: DeletePlaylistError}] = useMutation<DeletePlaylistData, DeletePlaylistVariables>(DELETE_PLAYLIST);
// const [updatePlan, { loading: UpdatePlanLoading, error: UpdatePlanError}] = useMutation<UpdatePlaylistData, UpdatePlaylistVariables>(UPDATE_PLAN);

// const handleDelete = async (id: string) => {  
//     const res = await deletePlaylist({ variables: { id }})
//     if (res) {
//       // window.location.reload();
//       return ( <DisplaySuccess title="Deletion Successful!" /> );
//     }
//   }

//   const handleUpdate = async (id: string) => { 
//     navigation(`/edit/${id}`) 
//     await updatePlan({ variables: { id }})
//   }

  // const deletePlaylistLoadingMessage = (
  //   <CircularProgress sx={{
  //             color: 'inherit',
  //             position: 'absolute',
  //             top: '50%',
  //             left: '50%',
  //             zIndex: 1,
  //           }}/>
  //   );

  // const updatePlanLoadingMessage = deletePlaylistLoadingMessage;
    
  // const deletePlaylistErrorMessage = (
  //   <Alert variant="outlined" severity="error">
  //     Oops, something went wrong in the deletion process!
  //   </Alert>
  // );

  // const updatePlanErrorMessage = (
  //   <Alert variant="outlined" severity="error">
  //     Oops, unable to edit playlist right now!
  //   </Alert>
  // );

  return (
    <Grid item lg={4} md={6} sm={12} xs={12} key={quiz.id}>
    <ListItem key={quiz.id}>
      <Card sx={{ minWidth: 350}}>
        <CardContent>
          <Link to={`/quiz/${quiz.id}`} style={{ textDecoration: "none" }}>
            <Typography variant='h4' style={{ color: "#000"}}>
              {quiz.title}
            </Typography>
            <Typography variant='h6' style={{ color: "#000"}}>
              {quiz.questions.length} {quiz.questions.length === 1 ? " Question" : " Questions"}
            </Typography>
          </Link>
          {/* {UpdatePlanLoading ? updatePlanLoadingMessage : <Button onClick={() => handleUpdate(playlist.id)}><EditIcon /></Button>}
          {UpdatePlanError ? updatePlanErrorMessage : null}
          {DeletePlaylistLoading ? deletePlaylistLoadingMessage : <Button onClick={() => handleDelete(playlist.id)}><DeleteIcon /></Button>}
          {DeletePlaylistError ? deletePlaylistErrorMessage : null} */}
        </CardContent>
      </Card>
    </ListItem>
  </Grid>
  )
}