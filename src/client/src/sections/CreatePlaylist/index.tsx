import { CircularProgress, Grid, Box, Card, Typography, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Lesson, Playlist } from '../../graphql/generated';
import { useAllLessonsQuery } from '../../graphql/generated';
import { DisplayError } from '../../lib/utils';

const initialData: Playlist = {
  id: "",
  name: "Drew 101",
  creator: "",
  plan: []
}

export const CreatePlaylist = () => {
  const [input, setInput] = useState<string>("")
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
  
  const SearchPlaylists = () => (
    <Box sx={{ maxWidth: "95%", margin: 1 }}>
      <TextField variant='outlined' sx={{ width: 500 }} placeholder="Search Playlists" onChange={(e: ChangeEvent<any>) => { e.preventDefault(); setInput(`${e.target.value}`)} } value={input}/>
      <Button onClick={() => onSearch(input)}><SearchIcon /></Button>
    </Box>
  )

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <DisplayError title="Failed to query lessons" />
  }

  const lessonCount = data ? data.allLessons.total : 0;
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
            <p>{lessonCount}</p>
            <SearchPlaylists />
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