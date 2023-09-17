import React, { useState, ChangeEvent } from 'react';
import { Box, Grid, ListItem, Tooltip, Typography, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Pagination } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { User, Lesson, useDeleteAllBookmarksMutation, Article, Articles } from '../../../../graphql/generated';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Cancel } from '@mui/icons-material';
import { UserArticlesCard } from '../../../../lib/components/UserArticlesCard';

interface Props {
  userArticles: Articles;
  articlesPage: number;
  limit: number;
  setArticlesPage: (page: number) => void;
}

export const UserArticles = ({ userArticles, articlesPage, limit, setArticlesPage }: Props) => {

  const { result, totalCount } = userArticles;

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setArticlesPage(page)
  }

  const userArticlesList = (
    <Box sx={{ marginLeft: "2rem" }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item>
          <h2>{totalCount} Articles</h2>
        </Grid>
        <Grid item>
          <Link to={`/article/create`}>
            <Tooltip title="Create another article">
              <AddCircleIcon sx={{ color: "black" }} />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        {result.map((value: any, index) => (
          <UserArticlesCard article={value} key={index} />
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalCount / limit)}
        page={articlesPage}
        onChange={handleChange}
      />
    </Box>
  );

  return (
    <>
      {userArticlesList}
    </>
  )
}