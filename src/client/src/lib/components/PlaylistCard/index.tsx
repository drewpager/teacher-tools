import React, { useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Playlist, Lesson, LessonPlanUnion } from '../../../graphql/generated';
import { VideoPlayer } from '../index';
import './playlistcard.scss';

interface Props {
  playlist: Playlist
}


// NOTE: Pass lessons object instead of single lesson for Accordion to work correctly
export const PlaylistCard = ({ playlist }: Props) => {
  // const [video, setVideo] = useState<string>(`${playlist.plan[0]?.video}`)
  const [active, setActive] = useState<string>(playlist && playlist.plan ? `${playlist?.plan[0]?.id}` : `1`)

  const handleChange = ({ id }: LessonPlanUnion) => {
    // setVideo(`${video}`)
    setActive(`${id}`)
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
              {/* TODO: Render Either a Video or Quiz Element */}
              <h1>{playlist.id}</h1>
                {/* <VideoPlayer url={video} /> */}
            </Grid>
        </Grid>
    </>
  )
}