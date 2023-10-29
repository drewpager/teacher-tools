import React, { useState } from 'react';
import { Box, Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert, Tooltip, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Playlist, Lesson, Quiz, Questions, Quizzes } from '../../../graphql/generated';
import { UsePreviewModal } from '../PreviewModal';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { DisplaySuccess } from '../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../theme';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './userQuizzesCard.scss';

interface Props {
  quiz: {
    creator: string;
    id: string;
    questions: [Questions];
    title: string;
    public: boolean;
  }
}

export const UserQuizzesCard = ({ quiz }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

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

  const handleClose = () => {
    setOpen(false);
  }

  // const navigation = useNavigate();
  const [deleteQuiz, { loading: deleteQuizLoading, error: deleteQuizError }] = useMutation<DeleteQuizData, DeleteQuizVariables>(DELETE_QUIZ);
  return (
    <Grid item lg={4} md={6} sm={12} xs={12} key={quiz.id}>
      <ListItem key={quiz.id}>
        <Card className='user-quiz--card'>
          <CardContent>
            <Link to={`/quiz/${quiz.id}`} style={{ textDecoration: "none" }}>
              <Typography variant='h4' style={{ color: "#000" }}>
                {quiz.title}
              </Typography>
              <Typography variant='h6' style={{ color: "#000" }}>
                {quiz.questions.length} {quiz.questions.length === 1 ? " Question" : " Questions"}
              </Typography>
            </Link>
            <Box className="user-quiz--buttons">
              <Tooltip title={`${quiz.public ? "Public" : "Private"}`}>
                {quiz.public ? <LockOpenIcon sx={{ color: theme.palette.primary.main }} /> : <LockIcon sx={{ color: theme.palette.primary.main }} />}
              </Tooltip>
              {deleteQuizLoading ? deleteQuizLoadingMessage : (
                <Tooltip title="Delete Quiz!">
                  <IconButton sx={{ color: "#000" }} disableRipple>
                    <DeleteIcon onClick={() => setOpen(true)} />
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        <Typography variant="h3">Are you sure you want to delete this quiz?</Typography>
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          This action cannot be undone.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => { handleDelete(quiz.id); handleClose() }} autoFocus>
                          Delete Quiz
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </IconButton>
                </Tooltip>
              )}
              <UsePreviewModal item={quiz} color={"#000"} />
            </Box>
            {deleteQuizError ? deleteQuizErrorMessage : null}
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}