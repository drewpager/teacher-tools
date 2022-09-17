import React, { useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Playlist, Lesson } from '../../../graphql/generated';
import { VideoPlayer } from '../index';
import './playlistcard.scss';

interface Props {
  playlist: Playlist
}


// NOTE: Pass lessons object instead of single lesson for Accordion to work correctly
export const PlaylistCard = ({ playlist }: Props) => {
  const [video, setVideo] = useState<string>(`${playlist.plan[0]?.video}`)
  const [active, setActive] = useState<string>(`${playlist.plan[0]?.id}`)

  const handleChange = ({ video, id }: Lesson) => {
    setVideo(`${video}`)
    setActive(`${id}`)
  };


  return (
    <>
        <Typography className='card--title' variant="h2" sx={{ py: 1 }}>
            {playlist.name}
        </Typography>

        <Grid container className='playlistcard--grid'>
            <Grid className='playlistcard--grid__list'>
                <List>
                    {playlist.plan.map((lesson, id) => (
                    <ListItem disableGutters key={id}>
                        <ListItemButton disableGutters className={active === `${lesson?.id}` ? 'active' : ''} onClick={() => handleChange({ ...lesson })}>
                        <ListItemText primary={lesson?.title} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid  className='playlistcard--grid__video'>
                <VideoPlayer url={video} />
            </Grid>
        </Grid>
    </>
  )
}