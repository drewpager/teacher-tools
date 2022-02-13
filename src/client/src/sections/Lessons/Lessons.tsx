import React from 'react';
// import { useQuery, useMutation } from '../../lib/api';
import { gql } from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Lessons as LessonsData } from './__generated__/Lessons';
import { DeleteLesson as DeleteLessonData, DeleteLessonVariables } from './__generated__/DeleteLesson';

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
    <h3>Deletion in flight!</h3>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Oops, something went horribly wrong :(</h2>;
  }

  const deleteLessonErrorMessage = deleteLessonError ? (
    <h3>Oops, something went wrong in the deletion process!!</h3>
  ) : null;

  const lessons = data ? data.lessons : null;

  const lessonList = (
    <ul>
      {lessons?.map(lesson => {
        return (
          <li key={lesson.id}>
            {lesson.title}{" | "}{lesson.category.join(", ")}{" "}
            <button onClick={() => handleDeleteLesson(lesson.id)}>Delete</button>
          </li> 
        )
      })}
    </ul>
  )
  return (
    <div>
      <h1>{title}</h1>
      {lessonList}
      {deleteLessonLoadingMessage}
      {deleteLessonErrorMessage}
    </div>
  )
}