import React, { ChangeEvent } from 'react';
import { Box, Card, CardContent, ListItem, Pagination, Typography, Grid, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Playlists } from '../../../../graphql/generated';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
  userPlaylists: Playlists;
  playlistsPage: number;
  limit: number;
  setPlaylistsPage: (page: number) => void;
}

export const UserPlaylists = ({ userPlaylists, playlistsPage, limit, setPlaylistsPage}: Props) => {
  const { total, result } = userPlaylists;

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPlaylistsPage(page)
  }

  const userPlaylistsList = (
    <Box sx={{ marginLeft: 5 }}>
      <Grid container spacing={3} sx={{ alignItems: "center" }}>
        <Grid item>
          <h2>{total} Playlists</h2>
        </Grid>
        <Grid item>
          <Link to={`/playlist/create`}>
            <Tooltip title="Add New Playlist">
              <AddCircleIcon sx={{ color: "black" }} />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        {result.map((value: any, index) => (
          <Grid item lg={4} md={6} sm={12} xs={12} key={index}>
            <Link to={`/playlist/${value.id}`}>
              <ListItem key={index}>
                <Card>
                  <CardContent>
                    <Typography variant='h3'>
                      {value.name}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Pagination 
        count={total / limit} 
        page={playlistsPage}
        onChange={handleChange}
      />
    </Box>
  );

  return (
    <>
      {userPlaylistsList}
    </>
  )
}