import React, { useEffect, useState, useRef } from 'react';
import { Grid, Card, Box, CardMedia, CardContent, IconButton, Typography, Button, Chip, InputLabel, FormControl, OutlinedInput, MenuItem, CircularProgress } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { Lesson, useAllLessonsQuery } from '../../../graphql/generated';
import { DisplayError, titleCase } from '../../../lib/utils';
import { useKeenSlider } from 'keen-slider/react';
import { UseVideoModal } from '../../../lib/components/VideoModal';
import 'keen-slider/keen-slider.min.css';
import './homedetails.scss';

export const HomeDetails = () => {
  const windowWidth = useRef([window.innerWidth]);
  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 20,
      page: 1
    }
  })

  if (loading) {
    <Box sx={{ alignContent: "center" }}>
      <CircularProgress />
    </Box>
  }

  if (error) {
    <DisplayError title="Failed to query lessons" />
  }
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: {
        origin: 0,
        perView: `${windowWidth.current[0] > 500}` ? 5 : 3,
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

  return (
    <Box className="home--details">
      <h2 className="homeDetails--box">Short History Documentaries</h2>
      <Grid
        container
        gap={1}
        spacing={2}
        direction="row"
        ml={5}
      >
        <div ref={sliderRef} className="keen-slider">
          {data?.allLessons.result.map((l, index) => (
            <div className="keen-slider__slide">
              <Card sx={{ display: 'flex', backgroundColor: '#535ac8', borderRadius: 5, height: "200px" }} key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Link to={`/lesson/${l.id}`} style={{ textDecoration: "none" }}>
                      <Typography component="div" variant="h3" sx={{
                        color: "#FAF9F6",
                        fontSize: {
                          lg: 20,
                          md: 18,
                          sm: 16,
                          xs: 16
                        },
                        wordWrap: 'break-word',
                      }}>
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
                    <IconButton aria-label="bookmark" sx={{ color: "#FAF9F6" }}>
                      <BookmarkAddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
              {/* {loaded && instanceRef.current && (
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
              )} */}
            </div>
          ))}
        </div>
      </Grid>
      <div className="viewAll--button">
        <Link to="/catalog" style={{ textDecoration: "none" }}>
          <Button variant='outlined'>
            <Typography variant="button">View All</Typography>
          </Button>
        </Link>
      </div>
    </Box>
  )
}