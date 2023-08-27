import React, { useState } from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import { Playlist, Lesson, LessonPlanUnion } from '../../../graphql/generated';
import { VideoPlayer, QuizPlayer } from '../index';
import './playlistcard.scss';

interface Props {
  playlist: Playlist
}


// NOTE: Pass lessons object instead of single lesson for Accordion to work correctly
export const PlaylistCard = ({ playlist }: Props) => {
  // const [video, setVideo] = useState<string>()
  const [itemName, setItemName] = useState<LessonPlanUnion>(playlist && playlist.plan ? { ...playlist.plan[0] } : {})
  const [active, setActive] = useState<string>(playlist && playlist.plan ? `${playlist?.plan[0]?.id}` : `1`)

  const handleChange = ({ ...item }: LessonPlanUnion) => {
    setItemName(item)
    setActive(`${item.id}`)
  };

  const handleDateFormat = (date: string) => {
    if (date === "Present") {
      return "Present"
    }

    if (date.startsWith("-")) {
      return `${date.split("-")[1]} BCE`
    }
    return new Date(date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <>
      <Typography className='playlist--title' variant="h2" sx={{ py: 1 }}>
        {playlist.name}
      </Typography>

      <Grid container className='playlistcard--grid'>
        <Timeline position="left" className='playist--grid__timeline'>
          {playlist?.plan?.map((item, id) => (
            <TimelineItem>
              <TimelineOppositeContent>{item?.__typename === "Lesson" ? handleDateFormat(item.endDate) : ""}</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot sx={{ mx: 2 }} color={active === `${item?.id}` ? "secondary" : "primary"} onClick={() => handleChange({ ...item })}>
                  {item?.__typename === "Lesson" ? <PlayCircleIcon sx={{ fontSize: 20 }} /> : <QuizIcon sx={{ fontSize: 20 }} />}
                </TimelineDot>
                {playlist.plan.length !== (id + 1) ? <TimelineConnector /> : <></>}
              </TimelineSeparator>
              <TimelineContent>{item?.__typename === "Lesson" ? handleDateFormat(item.startDate) : "Quiz"}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        <Grid className='playlistcard--grid__list'>
          <List>
            {playlist?.plan?.map((item, id) => (
              <ListItem disableGutters key={id}>
                <ListItemButton
                  disableGutters
                  className={active === `${item?.id}` ? 'playlistCard--button active' : 'playlistCard--button'}
                  onClick={() => handleChange({ ...item })}
                >
                  <ListItemText primary={item?.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid className='playlistcard--grid__video'>
          {playlist.plan?.filter((item) => item?.id === active).map((iter, index) => {
            if (iter?.__typename === "Quiz") {
              return (
                <QuizPlayer quiz={iter} key={index} />
              )
            }

            if (iter?.__typename === "Lesson") {
              return (
                <VideoPlayer url={`${iter?.video}`} key={index} />
              )
            }
            return (
              <h2>Failed to load resource</h2>
            )
          })}
        </Grid>
      </Grid>
    </>
  )
}