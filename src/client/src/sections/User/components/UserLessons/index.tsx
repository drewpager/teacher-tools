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
  console.log("Total: ", total)
  console.log("result length: ", result.length)
  console.log("limit: ", limit)

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setLessonsPage(page)
  }

  const userLessonsList = (
    <Box sx={{ marginLeft: 5 }}>
      <Grid container spacing={3} sx={{ alignItems: "center" }}>
        <Grid item>
          <h2>{total} Lessons</h2>
        </Grid>
        <Grid item>
          <Link to={`/lesson/create`}>
            <Tooltip title="Add New Lesson">
              <AddCircleIcon sx={{ color: "black" }} />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        {result.map((value: any, index) => (
          <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
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