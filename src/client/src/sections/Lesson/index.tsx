import React from 'react';
import { Viewer, useLessonQuery, useRelatedPlansQuery } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { LinearProgress, Box, Chip, Card, Grid, Button, Typography } from '@mui/material';
import { DisplayError } from '../../lib/utils/alerts/displayError';
import { Footer, VideoPlayer } from '../../lib/components';
import { titleCase, formatDate } from '../../lib/utils';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PublicPlaylistCard } from '../../lib/components/PublicPlaylistCard';

import './lessonPage.scss';
interface Props {
  viewer: Viewer
}

export const Lesson = ({ viewer }: Props) => {
  const params = useParams()
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const { loading, data, error } = useLessonQuery({
    variables: {
      id: `${params.id}`
    }
  });

  const { data: relatedPlansData, loading: relatedPlansLoading, error: relatedPlansError } = useRelatedPlansQuery({
    variables: {
      id: `${params.id}`
    }
  })

  if (loading || relatedPlansLoading) {
    return (
      <LinearProgress />
    )
  }

  if (error) {
    return (
      <>
        <DisplayError title='Failed to load lesson' />
      </>
    )
  }

  const lesson = data ? data.lesson : null;

  const formatSlugSpaces = (slug: string) => {
    return slug.trim().replaceAll(" ", '%20');
  }

  return (
    <>
      <Box className="lesson--page">
        <Helmet>
          <title>{lesson?.title}</title>
          <meta name="description" content={lesson?.meta?.length ? `${lesson?.meta}` : `A short documentary of ${lesson?.title} from ${formatDate(lesson?.startDate)} to ${formatDate(lesson?.endDate)}.`} />
        </Helmet>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Box className="article--section">
              <h1>{lesson?.title}</h1>
              {lesson?.startDate === lesson?.endDate ? (
                <Chip variant="filled" label={`${formatDate(lesson?.startDate)}`} color="primary" className='lesson--category' />
              ) : (
                <Chip variant="filled" label={`${formatDate(lesson?.startDate)} - ${formatDate(lesson?.endDate)}`} color="primary" className='lesson--category' />
              )}
              {lesson?.category?.map((i, ind) => (
                <Link to={`/catalog#${formatSlugSpaces(`${i}`)}`}>
                  <Chip variant='outlined' label={titleCase(`${i}`)} key={ind} color="error" className='lesson--category' />
                </Link>
              ))}
              <Box className="lesson-video--section">
                <VideoPlayer
                  url={`${lesson?.video}`}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Box className="featuredPlans--section">
              <h2>Featured Lesson Plans</h2>
              {relatedPlansData?.relatedPlans.map((plan: any) => (
                <Box className="featuredPlan--card">
                  {plan.public && <PublicPlaylistCard key={plan.id} {...plan} viewer={viewer} />}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Card className="incallAction--home">
        <Grid container className="grid--container">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="grid--text">
              <Typography variant='h3' className='incallAction--text'>Use This Video in a Custom Plan!</Typography>
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
    </>
  )
}