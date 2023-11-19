import React, { useState } from 'react';
import { useArticleQuery, Viewer } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress, Grid, Card, Typography, Button } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { Search, Footer, PdfPlayer } from '../../lib/components/';
import { Helmet } from 'react-helmet';
import draftToHtml from 'draftjs-to-html';
import './article.scss';
import { Link } from 'react-router-dom';

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

  function reverseEntityMapArray(entityMapArray: Array<any>) {
    let rawEntity: any = {
      entityMap: {}
    };

    for (let i = 0; i < entityMapArray.length; i++) {
      rawEntity.entityMap[i] = entityMapArray[i];
    }

    return rawEntity;
  }

  function removeTypenameFields(obj: any): any {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item: any) => removeTypenameFields(item));
    }

    const newObj: any = {};

    for (const key in obj) {
      if (key !== "__typename") {
        newObj[key] = removeTypenameFields(obj[key]);
      }
    }

    return newObj;
  }

  if (article) {
    let newEntityMap = reverseEntityMapArray([article?.content?.entityMap])
    let rawContent = {
      blocks: article?.content?.blocks,
      entityMap: newEntityMap.entityMap[0]
    }

    let newRawContent = removeTypenameFields(rawContent);

    return (
      <Box>
        <Helmet>
          <title>{`${article.title} Article | Plato's Peach`}</title>
          <meta name="description" content={`Article explaining ${article.title}.`} />
          {!article.public && (<meta name="robots" content="noindex" />)}
        </Helmet>
        <Box className="article--section">
          <h2>{article.title}</h2>
          {newRawContent && (<div className="article--body" dangerouslySetInnerHTML={{ __html: draftToHtml(newRawContent) }} />)}
          {(article.pdf === "undefined" || article.pdf === null) ? (<></>) : (<PdfPlayer pdf={article.pdf} />)}
        </Box>
        <Card className="incallAction--home">
          <Grid container className="grid--container">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className="grid--text">
                <Typography variant='h3' className='incallAction--text'>Use This Article in a Custom Plan!</Typography>
                <Typography variant='h5' className='incallAction--subText'>Free Sign Up to browse and bookmark our catalog, create lesson plans for your curriculum, build custom assessments, and assign to students.</Typography>
                <div className='incallAction--buttonDiv'>
                  <Link to="/signup" style={{ textDecoration: 'none' }}><Button variant="contained" className="incallAction--buttonFirst">Get Started For Free</Button></Link>
                  <Link to="/plans" style={{ textDecoration: 'none' }}><Button variant="contained" className="incallAction--buttonSecond">Use Lesson Plan Templates</Button></Link>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
        <Footer />
      </Box>
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