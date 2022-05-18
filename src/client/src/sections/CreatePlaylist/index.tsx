import { CircularProgress, Grid, Box, Card, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Lesson, Playlist, Lessons } from '../../graphql/generated';
import { useAllLessonsQuery } from '../../graphql/generated';
import { DisplayError } from '../../lib/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Viewer } from '../../graphql/generated';

type props = {
  viewer: Viewer;
}

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

export const CreatePlaylist = ({ viewer }: props) => {
  const [input, setInput] = useState<string>("")
  const [lessons, setLessons] = useState<Array<Lesson>>([])
  const inputRef = useFocus();
  // const id = viewer && viewer.id ? viewer.id : null;
  const [playlist, setPlaylist] = useState(initialData)
  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 10,
      page: 1
    }
  })


  const lessonQuery = data ? data.allLessons.result : null;

  useEffect(() => {
    if (lessonQuery) {
      setLessons(lessonQuery)
    }
  }, [lessonQuery])

  if (!viewer.id) {
    return (
      <>
        <DisplayError title="Must be logged in to create a playlist!" />
        <Box>
          <Button href='/login'>Log In</Button>
        </Box>
      </>
    )
  }

  const onSearch = (input: string) => {
    if (data) {
      const filteredData = data.allLessons.result.filter(({title}) => title?.toLowerCase().indexOf(input.toLowerCase()) !== -1);
      // return filteredData;
    } else {
      // return null;
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const enteredSearch = e.target.value;
    setInput(enteredSearch)
  }

  const titleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const name = e.target.value;
    setPlaylist({ 
      ...playlist, 
      name: name, 
      creator: viewer && viewer.id ? viewer.id : "0" 
    })
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

  const onDragEndHandler = (result: any) => {
    const { destination, source } = result;
    
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(source.index, 1);
    playlist.plan.push(reorderedItem);
    // const dest = destination ? destination.index : 0;
    // items.splice(dest, 0, reorderedItem)
    
    setLessons(items)
    setPlaylist({...playlist})
    // console.log("Drew hello, anyone out there? ", lessons)
    console.log("Hello playlist: ", playlist)
  }

  return (
    <Box sx={{ margin: 5 }}>
      <DragDropContext onDragEnd={onDragEndHandler}>
          <Grid container>
            <Droppable droppableId='lessons'>
              {(provided) =>  (
                <>
                  <Grid item xs={6} md={8} lg={8} {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                  <Card variant="outlined" sx={{ height: "750px", padding: 5, margin: 2 }}>
                    <TextField
                      label="Lesson Plan Title"
                      id="standard-size-normal"
                      variant="standard"
                      fullWidth
                      onChange={titleHandler}
                    />
                    {playlist.plan.map((i, index) => (
                      <Card variant="outlined" sx={{ padding: 2, margin: 1, width: "99%" }} key={index}>
                        {i?.title}
                      </Card>
                    ))}
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
                    <Grid container>
                    {lessons?.map((i, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <Grid item xs={12} md={12} lg={12} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={i.id}>
                            <Card variant="outlined" sx={{ padding: 2, margin: 1, width: "99%" }} key={i.id}>
                              {i.title}
                            </Card>
                          </Grid>
                          )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    </Grid>
                  </Card>
                </Grid>
              </>
              )}
          </Droppable>
        </Grid>
      </DragDropContext>
    </Box>
  )
}