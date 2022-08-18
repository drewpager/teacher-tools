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
    <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            maxWidth: drawerWidth,
            width: drawerWidth 
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
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
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ maxWidth: "1200px" }}>
            <Toolbar />
            <Toolbar>
              <Typography variant="h3" sx={{ padding: 5 }}>
                {playlist.name}
              </Typography>
            </Toolbar>
            <VideoPlayer url={video} />
          </Box>
        </Box>
    </Box>
    // <Box>
    //   <h1>{playlist.name}</h1>
    //     {playlist.plan.map((lesson, id) => (
    //       <Grid container spacing={2}>
    //         <Grid item xs={12} sm={12} md={6} lg={4}>
    //           <Accordion expanded={expanded === `${lesson?.id}`} onChange={handleChange(`${lesson?.id}`)} disableGutters sx={{ margin: 1 }} key={id}>
    //             <AccordionSummary
    //               expandIcon={<ExpandMoreIcon />}
    //               aria-controls={`panel${lesson?.id}bh-content`}
    //               id={`panel${lesson?.id}bh-header`}
    //             >
    //               <Typography>
    //                 {lesson?.title}
    //               </Typography>
    //             </AccordionSummary>
    //             <AccordionDetails>
    //               <Typography sx={{ color: 'black' }}>
    //                 {lesson?.category?.map((i, index) => (<Chip label={i} sx={{ marginRight: 1 }} color="primary" key={index}/>))}
    //               </Typography>
    //               <Typography sx={{ color: 'text.secondary' }}>{lesson?.startDate} to {lesson?.endDate}</Typography>
    //             </AccordionDetails>
    //           </Accordion>
    //         </Grid>
    //         <Grid item xs={12} sm={12} md={6} lg={8}>
    //           {expanded === `${lesson?.id}` ? (
    //               <VideoPlayer url={`${lesson?.video}`} key={lesson?.id} />
    //             ) : (
    //               <></>
    //             )}
    //         </Grid>
    //       </Grid>
    //     ))}
    // </Box>
  )
}