import React, { useState } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Container } from '@mui/material';
import { Playlist, Lesson } from '../../../graphql/generated';
import { VideoPlayer } from '../index';
interface Props {
  playlist: Playlist
}

// NOTE: Pass lessons object instead of single lesson for Accordion to work correctly
export const PlaylistCard = ({ playlist }: Props) => {
  const [video, setVideo] = useState<string>(`${playlist.plan[0]?.video}`)

  const handleChange = ({ video }: Lesson) => {
    setVideo(`${video}`)
  };

  let drawerWidth = 240;

  return (
    <>
        <Drawer
          sx={{
            maxWidth: drawerWidth,
            width: drawerWidth 
          }}
          variant="permanent"
          anchor="left"
        >
          <List>
            {playlist.plan.map((lesson, id) => (
              <ListItem key={id}>
                <ListItemButton onClick={() => handleChange({ ...lesson })}>
                  <ListItemText primary={lesson?.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
            <Toolbar>
              <Typography variant="h3" sx={{ padding: 5 }}>
                {playlist.name}
              </Typography>
            </Toolbar>
            <VideoPlayer url={video} />
    </>
  )
}