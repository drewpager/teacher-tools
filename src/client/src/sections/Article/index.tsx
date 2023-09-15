import React from 'react';
import { useArticleQuery, Viewer } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { Search, Footer } from '../../lib/components/';
import { Helmet } from 'react-helmet';
import draftToHtml from 'draftjs-to-html';

export const Article = () => {
  const params = useParams();
  const { data, loading, error } = useArticleQuery({
    variables: {
      id: `${params.id}`
    }
  });

  if (loading) {
    return (
      <LinearProgress />
    )
  }

  if (error) {
    return (
      <Box sx={{ marginLeft: 5 }}>
        <h2>Article Not Found</h2>
        <h4>Here are a few available articles or you can try searching again.</h4>
        <Search />
        <DisplayError title='Failed to load playlist' />
        <Footer />
      </Box>
    )
  }

  const article = data ? data.article : null;

  if (article) {
    return (
      <>
        <Helmet>
          <title>{`${article.title} Article | Plato's Peach`}</title>
          <meta name="description" content={`Article explaining ${article.title}.`} />
        </Helmet>
        <h2>{article.title}</h2>
        <h2>{article.id}</h2>
        <h2>{article.creator}</h2>
        <h2>{article.public}</h2>
        {/* <PlaylistCard playlist={playlist} /> */}
        <Footer />
      </>
    )
  }

  return (
    <Box sx={{ marginLeft: 5 }}>
      <h2>No Article By This ID</h2>
      <DisplayError title='No Article By This ID' />
      <Footer />
    </Box>
  )
}