import React, { ChangeEvent } from 'react';
import { Box, Pagination, Grid, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Playlists } from '../../../../graphql/generated';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UserPlaylistsCard } from '../../../../lib/components'

interface Props {
  userPlaylists: Playlists;
  playlistsPage: number;
  limit: number;
  setPlaylistsPage: (page: number) => void;
}

export const UserPlaylists = ({ userPlaylists, playlistsPage, limit, setPlaylistsPage}: Props) => {
  
  const { result, totalCount } = userPlaylists;

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPlaylistsPage(page)
  }

  const userPlaylistsList = (
    <Box>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item>
          <h2>{totalCount} Playlists</h2>
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
          <UserPlaylistsCard playlist={value} key={index} />
        ))}
      </Grid>
      <Pagination 
        count={Math.ceil(totalCount/limit)} 
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