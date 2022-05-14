import { CircularProgress, Grid, Box, Card, Typography, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { Lesson, Playlist } from '../../graphql/generated';
import { useAllLessonsQuery } from '../../graphql/generated';
import { DisplayError } from '../../lib/utils';

const initialData: Playlist = {
  id: "",
  name: "Drew 101",
  creator: "",
  plan: []
}

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [])

  return ref;
}

export const CreatePlaylist = () => {
  const [input, setInput] = useState<string>("")
  const inputRef = useFocus();
  // const id = viewer && viewer.id ? viewer.id : null;
  const [playlist, setPlaylist] = useState(initialData)
  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 10,
      page: 1
    }
  })

  const onSearch = (input: string) => {
    if (data) {
      const filteredData = data.allLessons.result.filter(({title}) => title?.toLowerCase().indexOf(input.toLowerCase()) !== -1);
      return filteredData;
    } else {
      return null;
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const enteredSearch = e.target.value;
    setInput(enteredSearch)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "enter") {
      onSearch(input)
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <DisplayError title="Failed to query lessons" />
  }

  const lessonQuery = data ? data.allLessons.result : null;

  return (
    <Box sx={{ margin: 5 }}>
      <Grid container>
        <Grid item xs={6} md={8} lg={8}>
          <Card variant="outlined" sx={{ height: "750px", padding: 5, margin: 2 }}>
            <h2>{playlist.name}</h2>
          </Card>
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <Card variant="outlined" sx={{ height: "750px", padding: 5, margin: 2 }}>
            <TextField 
              variant='outlined' 
              id="lesson-search" 
              label="Search Lessons" 
              value={input} 
              onChange={inputHandler} 
              ref={inputRef} 
              onKeyPress={handleKeyPress} 
            />
            <Button onClick={() => onSearch(input)}><SearchIcon /></Button>
            {lessonQuery?.map((i, index) => (
              <>
              <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                  <Card variant="outlined" sx={{ padding: 2, margin: 1, width: "99%" }} key={index}>
                    <Typography>{i.title}</Typography>
                  </Card>
                </Grid>
              </Grid>
            </>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}