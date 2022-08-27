import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import './search.scss';

export const Search = () => {
  const history = useNavigate();

  const onSearch = (value: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history(`/playlist/${value}`)
  }

  const [input, setInput] = useState('search playlists');

  return (
    <Box className='search--wrapper'>
      <TextField className='search--input' variant='outlined' placeholder={input} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(`${e.target.value}`)} />
      <Button className='search--submit' onClick={(event: FormEvent<any>): void => onSearch(input, event) }><SearchIcon /></Button>
    </Box>
  )
}