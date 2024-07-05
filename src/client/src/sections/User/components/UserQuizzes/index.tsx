import React, { ChangeEvent } from 'react';
import { Box, Pagination, Grid, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Quizzes } from '../../../../graphql/generated';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { UserQuizzesCard } from '../../../../lib/components/';
import "./userQuizzes.scss";

interface Props {
  userQuizzes: Quizzes;
  quizzesPage: number;
  limit: number;
  setQuizzesPage: (page: number) => void;
}

export const UserQuizzes = ({ userQuizzes, quizzesPage, limit, setQuizzesPage }: Props) => {

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
      <Grid container sx={{ marginLeft: 0 }}>
        {totalCount === 0 && (
          <Box className="user-quiz--how-to">
            <Typography variant='h3' sx={{ color: '#000', fontWeight: "bold" }}>How to Get Started With Quizzes:</Typography>
            <Link to={`/quiz/create`} style={{ justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
              <AddCircleIcon sx={{ color: "black", marginRight: '0.25rem' }} />
              <Typography variant='h3' sx={{ textDecoration: 'underline', color: '#000', marginBottom: '0.5rem' }}>Create a Custom Quiz</Typography>
            </Link>
            <Link to={`/quiz/create`} style={{ justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
              <AutoFixHighIcon sx={{ color: "black", marginRight: '0.25rem' }} />
              <Typography variant='h3' sx={{ textDecoration: 'underline', color: '#000', marginBottom: '0.5rem' }}>Use AI Quiz Generator</Typography>
            </Link>
          </Box>
        )}
        {result.map((value: any, index) => (
          <UserQuizzesCard quiz={value} key={index} />
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalCount / limit)}
        page={quizzesPage}
        onChange={handleChange}
        variant="outlined"
        color="secondary"
      />
    </Box>
  );

  return (
    <>
      {userQuizzesList}
    </>
  )
}