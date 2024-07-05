import React, { ChangeEvent } from 'react';
import { Box, Grid, Tooltip, Pagination, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Articles } from '../../../../graphql/generated';
import { Link } from 'react-router-dom';
import { UserArticlesCard } from '../../../../lib/components/UserArticlesCard';
import "./userArticles.scss";

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
    <Box className="user--articles">
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
      <Grid container sx={{ marginLeft: 0 }}>
        {totalCount === 0 && (
          <Box className="user-article--how-to">
            <Typography variant='h3' sx={{ color: '#000', fontWeight: "bold" }}>How to Get Started With Articles:</Typography>
            <Link to={`/article/create`} style={{ justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
              <AddCircleIcon sx={{ color: "black", marginRight: '0.25rem' }} />
              <Typography variant='h3' sx={{ textDecoration: 'underline', color: '#000', marginBottom: '0.5rem' }}>Create an Article in Text Editor</Typography>
            </Link>
            <Link to={`/article/create`} style={{ justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
              <PictureAsPdfIcon sx={{ color: "black", marginRight: '0.25rem' }} />
              <Typography variant='h3' sx={{ textDecoration: 'underline', color: '#000', marginBottom: '0.5rem' }}>Upload PDF Document</Typography>
            </Link>
          </Box>
        )}
        {result.map((value: any, index) => (
          <UserArticlesCard article={value} key={index} />
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalCount / limit)}
        page={articlesPage}
        onChange={handleChange}
        variant="outlined"
        color="secondary"
      />
    </Box>
  );

  return (
    <>
      {userArticlesList}
    </>
  )
}