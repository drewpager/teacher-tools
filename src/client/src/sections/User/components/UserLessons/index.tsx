import React, { ChangeEvent } from 'react';
import { LessonCard } from '../../../../lib/components/';
import { Box, ListItem, Pagination, Grid, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Lessons } from '../../../../graphql/generated';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
      <Grid container spacing={3} sx={{ alignItems: "center" }}>
        <Grid item spacing={3}>
          <h2>{total} Lessons</h2>
        </Grid>
        <Grid item spacing={3}>
          <Link to={`/lesson/create`}>
            <Tooltip title="Add New Lesson">
              <AddCircleIcon sx={{ color: "black" }} />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        {result.map((value: any, index) => (
          <Grid item spacing={2} lg={4} md={6} sm={6} xs={12}>
            <Link to={`/lesson/${value.id}`}>
              <ListItem key={index}>
                <LessonCard lesson={value} />
              </ListItem>
            </Link>
          </Grid>
        ))}
      </Grid>
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