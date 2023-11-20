import React, { ChangeEvent } from 'react';
import { Box, Pagination, Grid, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Playlists, Viewer } from '../../../../graphql/generated';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UserPlaylistsCard } from '../../../../lib/components'
import './userPlaylists.scss';

interface Props {
  userPlaylists: Playlists;
  playlistsPage: number;
  limit: number;
  setPlaylistsPage: (page: number) => void;
  viewer: Viewer
}

export const UserPlaylists = ({ userPlaylists, playlistsPage, limit, setPlaylistsPage, viewer }: Props) => {
  const { result, totalCount } = userPlaylists;

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPlaylistsPage(page)
  }

  const userPlaylistsList = (
    <Box className="user--playlists">
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item>
          <h2>{totalCount} Lesson Plans</h2>
        </Grid>
        <Grid item>
          <Link to={`/playlist/create`}>
            <Tooltip title="Add New Playlist">
              <AddCircleIcon sx={{ color: "black" }} />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Grid container sx={{ marginLeft: 0 }}>
        {result.map((value: any, index) => (
          <UserPlaylistsCard playlist={value} key={index} paymentId={`${viewer.paymentId}`} />
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalCount / limit)}
        page={playlistsPage}
        onChange={handleChange}
        variant="outlined"
        color="secondary"
      />
    </Box>
  );

  return (
    <>
      {userPlaylistsList}
    </>
  )
}