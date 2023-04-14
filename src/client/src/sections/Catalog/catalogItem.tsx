import React, { useState, useEffect } from 'react';
import { Grid, Card, Box, CardMedia, CardContent, IconButton, Typography, Chip, CircularProgress, Alert, Snackbar, Button } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { Lesson } from '../../graphql/generated';
import { titleCase } from '../../lib/utils';
import { useKeenSlider } from 'keen-slider/react';
import { UseVideoModal } from '../../lib/components/VideoModal';
import 'keen-slider/keen-slider.min.css';
import "./catalog.scss";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

type props = {
  name: string;
  category: Lesson[];
  viewer: string;
}

type BookmarkLessonData = {
  bookmarkLesson: Lesson;
}

type BookmarkLessonVariables = {
  id: string;
  viewer: string;
}

export const CatalogItem = ({ name, category, viewer }: props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: {
        origin: "auto",
        perView: 3,
        spacing: 10,
      },
      initial: 0,
      mode: "snap",
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
  )

  const handleClose = () => {
    setOpen(false)
  }

  const BOOKMARK_LESSON = gql`
    mutation BookmarkLesson($id: ID!, $viewer: String!) {
      bookmarkLesson(id: $id, viewer: $viewer)
    }
  `;

  const [bookmarkLesson, { loading: BookmarkLessonLoading, error: BookmarkLessonError }] = useMutation<BookmarkLessonData, BookmarkLessonVariables>(BOOKMARK_LESSON);

  const onBookmark = async (id: string, viewer: string) => {
    let res = await bookmarkLesson({
      variables: {
        id,
        viewer
      }
    })
    res && setOpen(true)
  }

  BookmarkLessonLoading && (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
    }} />
  )

  BookmarkLessonError && (
    <Alert variant="outlined" severity="error">
      Oops, something went wrong in the bookmarking process!
    </Alert>
  );
  return (
    <Box className="category--box">
      {
        category.length > 0 &&
        <h2 className='category--h2'>{titleCase(name)} <Chip label={category.length} color="primary" size="medium" /></h2>
      }
      <Grid
        container
        gap={1}
        spacing={2}
        direction="row"
        ml={5}
      >
        <div ref={sliderRef} className="keen-slider">
          {category.map((l, index) => (
            <div className="keen-slider__slide">
              <Card className="keenSlider--item" key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent className="keenSlider--content">
                    <Link to={`/lesson/${l.id}`} style={{ textDecoration: "none" }}>
                      <Typography component="div" variant="h3" style={{ color: "#FAF9F6" }}>
                        {l.title}
                      </Typography>
                    </Link>
                    <Typography variant="subtitle1" color="#e0e0e0" component="div">
                      {(l.startDate === l.endDate) ? (l.startDate) : (`${l.startDate} to ${l.endDate}`)}
                    </Typography>
                    {l.category?.map((c, idx) => (
                      idx !== 0 && <Chip label={titleCase(`${c}`)} color="primary" key={idx} />
                    ))}
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="play/pause" sx={{ color: "#FAF9F6" }}>
                      <UseVideoModal video={`${l.video}`} />
                    </IconButton>
                    <IconButton
                      className="bookmark--button"
                      aria-label="bookmark"
                      sx={{ color: "#FAF9F6" }}
                    >
                      <BookmarkAddIcon onClick={() => onBookmark(`${l.id}`, viewer)} />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
              {loaded && instanceRef.current && (
                <>
                  <IconButton
                    onClick={() =>
                      instanceRef.current?.prev()
                    }
                    disabled={currentSlide === 0}
                  >
                    <ChevronLeftIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => instanceRef.current?.next()}
                    disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </>
              )}
            </div>
          ))}
        </div>
      </Grid>
      <>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Bookmarked!
          </Alert>
        </Snackbar>
      </>
    </Box>
  )
}