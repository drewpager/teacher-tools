import React, { ChangeEvent } from 'react';
import { User_user_playlists as User } from '../../../../lib/graphql/queries/User/__generated__/User';

interface Props {
  userPlaylists: User;
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
      <ul>
        <li key={value}>{value}</li>
      </ul>
    ))
  );

  return (
    <>
      {userPlaylistsList}
    </>
  )
}