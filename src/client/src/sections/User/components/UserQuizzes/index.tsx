import React, { ChangeEvent } from 'react';
import { Box, Pagination, Grid, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Quizzes } from '../../../../graphql/generated';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UserQuizzesCard } from '../../../../lib/components/';
import "./userQuizzes.scss";

interface Props {
  userQuizzes: Quizzes;
  quizzesPage: number;
  limit: number;
  setQuizzesPage: (page: number) => void;
}

export const UserQuizzes = ({ userQuizzes, quizzesPage, limit, setQuizzesPage}: Props) => {
  
  const { result, totalCount } = userQuizzes;

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setQuizzesPage(page)
  }

  const userQuizzesList = (
    <Box className="user--quizzes">
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item>
          <h2>{totalCount} Quizzes</h2>
        </Grid>
        <Grid item>
          <Link to={`/quiz/create`}>
            <Tooltip title="Add New Quiz">
              <AddCircleIcon sx={{ color: "black" }} />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        {result.map((value: any, index) => (
          <UserQuizzesCard quiz={value} key={index} />
        ))}
      </Grid>
      <Pagination 
        count={Math.ceil(totalCount/limit)} 
        page={quizzesPage}
        onChange={handleChange}
      />
    </Box>
  );

  return (
    <>
      {userQuizzesList}
    </>
  )
}