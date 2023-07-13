import React, { MouseEvent } from 'react';
import { Grid, Card, Typography, Button, CircularProgress, Alert, Tooltip } from '@mui/material';
import { DisplaySuccess } from '../../utils';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { DeleteLessonData, DeleteLessonVariables } from '../../../sections/Lessons/types';
import { Viewer } from '../../../graphql/generated';
import DeleteIcon from '@mui/icons-material/Delete';


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

  return (
    <Grid item lg={4} md={6} sm={12} xs={12}>
      <Card sx={{ minWidth: "90vw", boxShadow: 1, padding: 3 }}>
        <Link to={`/lesson/${id}`} style={{ textDecoration: "none", color: "black" }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="h6">{category}</Typography>
          <Typography variant="body2">{startDate}</Typography>
          <Typography variant="body2">{endDate}</Typography>
        </Link>
        {deleteLessonLoading ? deleteLessonLoadingMessage : (
          <Tooltip title="Delete Lesson!">
            <Button onClick={() => handleDelete(id)}><DeleteIcon /></Button>
          </Tooltip>
        )}
        {deleteLessonError ? deleteLessonErrorMessage : null}
      </Card>
    </Grid>
  )
}