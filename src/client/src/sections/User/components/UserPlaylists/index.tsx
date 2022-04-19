import React, { ChangeEvent } from 'react';
import { Box, Card, CardContent, List, ListItem, Pagination, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Playlists } from '../../../../graphql/generated';

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
      <h2>{total} Playlists</h2>
      <List sx={{ width: '100%' }}>
        {result.map((value: any, index) => (
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
        ))}
      </List>
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