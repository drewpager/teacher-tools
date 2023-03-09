import React, { useState } from 'react';
import { Grid, Card, Box, CardMedia, CardContent, IconButton, Typography, Chip, CircularProgress, Alert } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { Lesson } from '../../graphql/generated';
import { DisplaySuccess, titleCase } from '../../lib/utils';
import { useKeenSlider } from 'keen-slider/react';
import { UseVideoModal } from '../../lib/components/VideoModal';
import 'keen-slider/keen-slider.min.css';
import "./catalog.scss";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

type props = {
  name: string;
  category: Lesson[];
}

type BookmarkLessonData = {
  bookmarkLesson: Lesson;
}

type BookmarkLessonVariables = {
  id: string;
}

export const CatalogItem = ({ name, category }: props) => {
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

  const BOOKMARK_LESSON = gql`
    mutation BookmarkLesson($id: ID) {
      bookmarkLesson(id: $id)
    }
  `;

  const [bookmarkLesson, { loading: BookmarkLessonLoading, error: BookmarkLessonError }] = useMutation<BookmarkLessonData, BookmarkLessonVariables>(BOOKMARK_LESSON);

  const onBookmark = async (id: string) => {
    console.log(id);
    let res = await bookmarkLesson({ variables: { id } })
    res && (<DisplaySuccess title="Bookmarked!" />)
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
              <Card sx={{ display: 'flex', backgroundColor: '#535ac8', borderRadius: 5, height: "200px" }} key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
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
                      aria-label="bookmark"
                      sx={{ color: "#FAF9F6" }}
                    >
                      <BookmarkAddIcon onClick={() => onBookmark(`${l.id}`)} />
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
    </Box>
  )
}