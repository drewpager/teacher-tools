import React, { ChangeEvent } from 'react';
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
    result.map((value: any) => (
      <>
        <h2>{total} Playlists</h2>
        <ul>
          <li key={value}>{value}</li>
        </ul>
      </>
    ))
  );

  return (
    <>
      {userPlaylistsList}
    </>
  )
}