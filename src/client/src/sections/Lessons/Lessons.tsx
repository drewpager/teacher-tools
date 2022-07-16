import React from 'react';
import { gql } from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Lessons as LessonsData } from './__generated__/Lessons';
import { DeleteLesson as DeleteLessonData, DeleteLessonVariables } from './__generated__/DeleteLesson';
import { Button, List, ListItem, Avatar, CircularProgress, Alert, Skeleton }  from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const LESSONS = gql`
  query Lessons {
    lessons {
      id
      category
      title
      meta
      video
      image
      startDate
      endDate
    } 
  }
`;

const DELETE_LESSON = gql`
  mutation DeleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Lessons = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<LessonsData>(LESSONS);

  const [deleteLesson, { loading: deleteLessonLoading, error: deleteLessonError }] = useMutation<DeleteLessonData, DeleteLessonVariables>(DELETE_LESSON);

  const handleDeleteLesson = async (id: string) => {
    await deleteLesson({ variables: { id } });
    refetch();
  };

  // Rendering React Elements based on object status

  const deleteLessonLoadingMessage = deleteLessonLoading ? (
    <CircularProgress sx={{
              color: 'inherit',
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 1,
            }}/>
  ) : null;

  if (loading) {
    for (let i = 0; i < 10; i++) {
      return ( 
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem key={i} divider={true} alignItems="center">
            <Skeleton variant="rectangular" width={250} height={150} />{" "}
            <Skeleton variant="text" />{" "}
            <Skeleton variant="rectangular" width={50} height={30} />
          </ListItem>
        </List>
      );
    };
  };

  if (error) {
    return (
      <Alert variant="outlined" severity="error" sx={{ padding: "5px" }}>
        Oops, something went horribly wrong :(
      </Alert>
    )
  }

  const deleteLessonErrorMessage = deleteLessonError ? (
    <Alert variant="outlined" severity="error">
      Oops, something went wrong in the deletion process!
    </Alert>
  ) : null;

  const lessons = data ? data.lessons : null;

  const lessonList = (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {lessons?.map(lesson => {
        return (
          <ListItem key={lesson.id} divider={true} alignItems="center">
            <Avatar alt={lesson.title + " image with text overlay"} src={lesson.image} sx={{ width: 250, height: 150, padding: 2, borderRadius: 5 }} />
            {lesson.title}{" | "}{lesson.category.join(", ")}{" "}            
              <Button sx={{ margin: 5 }} variant="contained" onClick={() => handleDeleteLesson(lesson.id)}>Delete</Button>
          </ListItem> 
        )
      })}
    </List>
  )
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>{title}</Typography>
      {deleteLessonErrorMessage}
      {lessonList}
      {deleteLessonLoadingMessage}
    </Container>
  )
}