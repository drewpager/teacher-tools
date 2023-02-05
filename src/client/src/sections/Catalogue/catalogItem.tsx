import React from 'react';
import { Grid, Card, Box, CardMedia, CardContent, IconButton, Typography, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { Lesson } from '../../graphql/generated';
import { titleCase } from '../../lib/utils';
import { useKeenSlider } from 'keen-slider/react';
import { UseVideoModal } from '../../lib/components/VideoModal'
import 'keen-slider/keen-slider.min.css'

type props = {
  name: string;
  category: Lesson[]
}

export const CatalogItem = ({ name, category }: props) => {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      mode: "snap",
      slides: {
        origin: "auto",
        perView: 3,
        spacing: 10,
      },
      breakpoints: {
        '(min-width: 600px)': {
          loop: false
        }
      }
    },
    [
      // add plugins here
    ]
  )

  return (
    <Box>
      {category.length > 0 && <h2 style={{ padding: "5px" }}>{titleCase(name)} ({category.length})</h2>}
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
              <Card sx={{ display: 'flex', backgroundColor: '#535ac8' }} key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Link to={`/lesson/${l.id}`} style={{ textDecoration: "none" }}>
                      <Typography component="div" variant="h3" style={{ color: "#FAF9F6" }}>
                        {l.title}
                      </Typography>
                    </Link>
                    <Typography variant="subtitle1" color="#e0e0e0" component="div">
                      {l.startDate}-{l.endDate}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="play/pause" sx={{ color: "#FAF9F6" }}>
                      <UseVideoModal video={`${l.video}`} />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </div>
          ))}
        </div>
      </Grid>
    </Box>
  )
}