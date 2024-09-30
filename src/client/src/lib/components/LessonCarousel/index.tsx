import React from 'react';
import { Box, CardMedia, CardContent, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseVideoModal } from '../VideoModal';
import { useAllLessonsQuery, Viewer, Lesson } from '../../../graphql/generated';
import './lessonCarousel.scss';

export const LessonCarousel = () => {
  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 30,
      page: 2,
    }
  });

  if (loading) {
    console.log("Loading");
  }

  if (error) {
    console.log(error);
  }


  return (
    <div className="lesson-carousel">
      {data?.allLessons.result.map((lesson, index) => (
        <div key={lesson.id} className="lesson-container">
          <div className="moving-lesson">
            <Link to={`/lesson/${lesson.title?.toLowerCase().replaceAll(/-/g, "_").replaceAll(/ /g, "-")}`} style={{ textDecoration: "none" }}>
              <Box className="card--grid">
                <CardContent className="card--content">
                  <Typography component="h4" style={{ color: "#FAF9F6" }}>
                    {lesson.title}
                  </Typography>
                  <Typography color="#e0e0e0" component="h5">
                    {(lesson.startDate === lesson.endDate) ? (lesson.startDate) : (`${lesson.startDate} to ${lesson.endDate}`)}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="auto"
                  image={lesson.video?.substring(0, lesson.video.lastIndexOf('.')) + '.png'}
                  alt={`${lesson.title}`}
                  loading='lazy'
                />
                <Box
                  className="card--buttons"
                  sx={{ display: 'flex', alignItems: 'center', pl: 1, justifyContent: 'center' }}>
                  <IconButton
                    className="play--button"
                    aria-label="play/pause"
                    sx={{ color: "#FAF9F6" }}
                    disableRipple
                    disableFocusRipple
                  >
                    <UseVideoModal video={`${lesson.video}`} />
                  </IconButton>
                </Box>
              </Box>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}