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
  const [bookmarkError, setBookmarkError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 2 },
        },
        "(min-width: 1350px)": {
          slides: { perView: 3 },
        },
        "(min-width: 1777px)": {
          slides: { perView: 4 },
        },
        "(min-width: 2200px)": {
          slides: { perView: 5 },
        }
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
    setBookmarkError(false)
  }

  const BOOKMARK_LESSON = gql`
    mutation BookmarkLesson($id: ID!, $viewer: String!) {
      bookmarkLesson(id: $id, viewer: $viewer)
    }
  `;

  const [bookmarkLesson, { loading: BookmarkLessonLoading, error: BookmarkLessonError }] = useMutation<BookmarkLessonData, BookmarkLessonVariables>(BOOKMARK_LESSON);

  const onBookmark = async (id: string, viewer: string) => {
    if (viewer === "null") {
      setBookmarkError(true)
      setOpen(true)
    } else {
      let res = await bookmarkLesson({
        variables: {
          id,
          viewer
        }
      })
      res && setOpen(true)
    }
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
        direction="row"
        ml={2}
      >
        <div ref={sliderRef} className="keen-slider">
          {category.map((l, index) => (
            <div className="keen-slider__slide">
              <Card className="keenSlider--item" key={index}>
                {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
                <Box className="card--grid">
                  <CardMedia
                    component="img"
                    height="auto"
                    image={l.video?.substring(0, l.video.lastIndexOf('.')) + '.png'}
                    alt={`${l.title}`}
                    loading='lazy'
                  />
                  <CardContent className="keenSlider--content">
                    {/* {l.category?.map((c, idx) => (
                      idx !== 0 && <Chip label={titleCase(`${c}`)} color="primary" key={idx} />
                    ))} */}
                    <Link to={`/lesson/${l.id}`} style={{ textDecoration: "none" }}>
                      <Typography component="div" variant="h4" style={{ color: "#FAF9F6" }}>
                        {l.title}
                      </Typography>
                    </Link>
                    <Typography variant="subtitle1" color="#e0e0e0" component="div">
                      {(l.startDate === l.endDate) ? (l.startDate) : (`${l.startDate} to ${l.endDate}`)}
                    </Typography>
                  </CardContent>
                  <Box
                    className="keenSlider--buttons"
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, justifyContent: 'center' }}>
                    <IconButton
                      className="play--button"
                      aria-label="play/pause"
                      sx={{ color: "#FAF9F6" }}
                      disableRipple
                      disableFocusRipple
                    >
                      <UseVideoModal video={`${l.video}`} />
                    </IconButton>
                    <IconButton
                      className="bookmark--button"
                      aria-label="bookmark"
                      sx={{ color: "#FAF9F6" }}
                      disableRipple
                      disableFocusRipple
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
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: 'center' }}
        >
          {/* If not logged in, throw error/prompt when bookmark button clicked, otherwise bookmark successfully */}
          {bookmarkError || (viewer === "null") ?
            (
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Please sign up or login to bookmark!
              </Alert>
            ) :
            (
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Bookmarked!
              </Alert>
            )}
        </Snackbar>
      </>
    </Box>
  )
}