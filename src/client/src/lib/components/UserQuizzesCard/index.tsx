import React from 'react';
import { Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert, Tooltip } from '@mui/material';
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

  const DELETE_QUIZ = gql`
    mutation DeleteQuiz($id: ID) {
      deleteQuiz(id: $id)
    }
  `;

  interface DeleteQuizData {
    deletePlaylist: Quiz
  }

  interface DeleteQuizVariables {
    id: string
  }

  const deleteQuizLoadingMessage = (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
    }} />
  );

  const deleteQuizErrorMessage = (
    <Alert variant="outlined" severity="error">
      Oops, something went wrong in the quiz deletion process!
    </Alert>
  );

  const handleDelete = async (id: string) => {
    const res = await deleteQuiz({ variables: { id } })
    if (res) {
      // window.location.reload();
      return (<DisplaySuccess title="Deletion Successful!" />);
    }
  }
  // const navigation = useNavigate();
  const [deleteQuiz, { loading: deleteQuizLoading, error: deleteQuizError }] = useMutation<DeleteQuizData, DeleteQuizVariables>(DELETE_QUIZ);
  return (
    <Grid item lg={4} md={6} sm={12} xs={12} key={quiz.id}>
      <ListItem key={quiz.id}>
        <Card sx={{ width: "90vw" }}>
          <CardContent>
            <Link to={`/quiz/${quiz.id}`} style={{ textDecoration: "none" }}>
              <Typography variant='h4' style={{ color: "#000" }}>
                {quiz.title}
              </Typography>
              <Typography variant='h6' style={{ color: "#000" }}>
                {quiz.questions.length} {quiz.questions.length === 1 ? " Question" : " Questions"}
              </Typography>
            </Link>
            {deleteQuizLoading ? deleteQuizLoadingMessage : (
              <Tooltip title="Delete Lesson!">
                <Button onClick={() => handleDelete(quiz.id)}><DeleteIcon /></Button>
              </Tooltip>
            )}
            {deleteQuizError ? deleteQuizErrorMessage : null}
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}