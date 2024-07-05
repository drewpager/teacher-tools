import React, { useState, MouseEvent } from 'react';
import {
  Grid,
  Card,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Tooltip,
  ListItem,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { DisplaySuccess } from '../../utils';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { DeleteLessonData, DeleteLessonVariables } from '../../../sections/Lessons/types';
import { Viewer } from '../../../graphql/generated';
import DeleteIcon from '@mui/icons-material/Delete';
import './userLessonCard.scss';
import { formatDate, formatSlug } from '../../utils';

interface Props {
  lesson: {
    id: string;
    category: string[];
    title: string;
    meta: string;
    video: string;
    image: string;
    startDate: string;
    endDate: string;
    creator: string;
  }
}

export const LessonCard = ({ lesson }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const DELETE_LESSON = gql`
    mutation DeleteLesson($id: ID) {
      deleteLesson(id: $id)
    }
  `;

  const handleDelete = async (id: string) => {
    let res = await deleteLesson({ variables: { id } })
    res && (<DisplaySuccess title='Successfully Deleted!' />)
  }

  const [deleteLesson, { loading: deleteLessonLoading, error: deleteLessonError }] = useMutation<DeleteLessonData, DeleteLessonVariables>(DELETE_LESSON)
  const { id, title, category, video, image, startDate, endDate } = lesson;

  const deleteLessonLoadingMessage = (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
    }} />
  );

  const deleteLessonErrorMessage = (
    <Alert variant="outlined" severity="error">
      Oops, something went wrong in the deletion process!
    </Alert>
  );

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Grid item lg={4} md={6} sm={12} xs={12} key={id}>
      <ListItem key={id}>
        <Card className="user-lessons--card">
          <CardContent>
            <Link to={`/lesson/${formatSlug(lesson.title)}`} style={{ textDecoration: "none" }}>
              <Typography variant='h4' style={{ color: "#000" }}>
                {title}
              </Typography>
            </Link>
            <Typography variant="h6">{category}</Typography>
            <Typography variant="body2">{formatDate(startDate)} to {formatDate(endDate)}</Typography>
            {deleteLessonLoading ? deleteLessonLoadingMessage : (
              <Tooltip title="Delete lesson!">
                <IconButton sx={{ color: "#000" }}>
                  <DeleteIcon onClick={() => setOpen(true)} />
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      <Typography variant="h3">Are you sure you want to delete this lesson?</Typography>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => { handleDelete(id); handleClose() }} autoFocus>
                        Delete Lesson
                      </Button>
                    </DialogActions>
                  </Dialog>
                </IconButton>
              </Tooltip>
            )}
            {deleteLessonError ? deleteLessonErrorMessage : null}
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}