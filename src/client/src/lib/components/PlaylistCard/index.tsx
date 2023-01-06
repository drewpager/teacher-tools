import React, { useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Playlist, Lesson, LessonPlanUnion } from '../../../graphql/generated';
import { VideoPlayer, QuizPlayer } from '../index';
import './playlistcard.scss';

interface Props {
  playlist: Playlist
}


// NOTE: Pass lessons object instead of single lesson for Accordion to work correctly
export const PlaylistCard = ({ playlist }: Props) => {
  // const [video, setVideo] = useState<string>()
  // const [itemName, setItemName] = useState<LessonPlanUnion>(playlist && playlist.plan ? {...playlist.plan[0]} : {})
  const [active, setActive] = useState<string>(playlist && playlist.plan ? `${playlist?.plan[0]?.id}` : `1`)

  const handleChange = ({ ...item }: LessonPlanUnion) => {
    // setItemName(item)
    setActive(`${item.id}`)
  };

  return (
    <>
        <Typography className='playlist--title' variant="h2" sx={{ py: 1 }}>
            {playlist.name}
        </Typography>

        <Grid container className='playlistcard--grid'>
            <Grid className='playlistcard--grid__list'>
                <List>
                    {playlist?.plan?.map((item, id) => (
                    <ListItem disableGutters key={id}>
                        <ListItemButton disableGutters className={active === `${item?.id}` ? 'active' : ''} onClick={() => handleChange({ ...item })}>
                        <ListItemText primary={item?.title} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid  className='playlistcard--grid__video'>
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