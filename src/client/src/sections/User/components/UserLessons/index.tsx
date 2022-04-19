import React, { ChangeEvent } from 'react';
import { LessonCard } from '../../../../lib/components/';
import { Box, List, ListItem, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { Lessons } from '../../../../graphql/generated';

interface Props {
  userLessons: Lessons;
  lessonsPage: number;
  limit: number;
  setLessonsPage: (page: number) => void;
}

export const UserLessons = ({ userLessons, lessonsPage, limit, setLessonsPage }: Props) => {
  const { total, result } = userLessons;

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setLessonsPage(page)
  }

  const userLessonsList = (
    <Box sx={{ marginLeft: 5 }}>
      <h2>{total} Lessons</h2>
      <List sx={{ width: '100%' }}>
        {result.map((value: any, index) => (
          <Link to={`/lesson/${value.id}`}>
            <ListItem key={index}>
              <LessonCard lesson={value} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Pagination 
        count={total / limit} 
        page={lessonsPage}
        onChange={handleChange}
      />
    </Box>
  )

  return (
    <>
      {userLessonsList}
    </>
  )
}