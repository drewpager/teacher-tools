import React, { ChangeEvent } from 'react';
import { Box, Pagination, Grid, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Playlists, Viewer } from '../../../../graphql/generated';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
        {totalCount === 0 && (
          <Box className="user-plan--how-to">
            <Typography variant='h3' sx={{ color: '#000', fontWeight: "bold" }}>How to Get Started Lesson Planning:</Typography>
            <Link to={`/plans/`} style={{ justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
              <ContentCopyIcon sx={{ color: "black", marginRight: '0.25rem' }} />
              <Typography variant='h3' sx={{ textDecoration: 'underline', color: '#000' }}>Copy Existing Lesson Template</Typography>
            </Link>
            <Link to={`/playlist/create`} style={{ justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
              <AddCircleIcon sx={{ color: "black", marginRight: '0.25rem' }} />
              <Typography variant='h3' sx={{ textDecoration: 'underline', color: '#000', marginBottom: '0.5rem' }}>Create a Custom Lesson Plan Here</Typography>
            </Link>
          </Box>
        )}
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