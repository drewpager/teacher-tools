import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const Search = () => {
  const history = useNavigate();

  const onSearch = (value: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history(`/playlist/${value}`)
  }

  const [input, setInput] = useState('search playlists');

  return (
    <Box>
      <TextField variant='outlined' sx={{ width: 500 }} placeholder={input} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(`${e.target.value}`)} />
      <Button onClick={(event: FormEvent<any>): void => onSearch(input, event) }><SearchIcon /></Button>
    </Box>
  )
}