import React, { ChangeEvent } from 'react';
import { LessonCard } from '../../../../lib/components/';
import { List, ListItem, Pagination } from '@mui/material';
import { User_user_lessons as User } from '../../../../lib/graphql/queries/User/__generated__/User';

interface Props {
  userLessons: User;
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
    <>
      <h2>{total} Lessons</h2>
      <List sx={{ width: '100%' }}>
        {result.map((value: any) => (
          <ListItem key={value}>
            <LessonCard lesson={value} />
          </ListItem>
        ))}
      </List>
      <Pagination 
        count={total / limit} 
        page={lessonsPage}
        onChange={handleChange}
      />
    </>
  )

  return (
    <>
      {userLessonsList}
    </>
  )
}