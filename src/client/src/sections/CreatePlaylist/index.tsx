import { CircularProgress, Grid, Box, Card, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { FullLessonInput, useLessonPlanMutation } from '../../graphql/generated';
import { useAllLessonsQuery, Viewer } from '../../graphql/generated';
import { DisplayError } from '../../lib/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

type props = {
  viewer: Viewer;
}

type InputLessonPlan = {
  name: string,
  creator: string,
  plan: FullLessonInput[]
}

const initialData: InputLessonPlan = {
  name: "",
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
  let navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("")
  const [lessons, setLessons] = useState<Array<FullLessonInput>>([])
  const [filter, setFilter] = useState<Array<FullLessonInput>>(lessons)
  const inputRef = useFocus();
  // const id = viewer && viewer.id ? viewer.id : null;
  const [playlist, setPlaylist] = useState<InputLessonPlan>(initialData)
  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 10,
      page: 1
    }
  })

  const [lessonPlan] = useLessonPlanMutation({
    variables: {
      input: playlist
    }
  })


  const lessonQuery = data ? data.allLessons.result : null;


  useEffect(() => {
    if (lessonQuery) {
      const lessonInput: any = []
      lessonQuery.forEach(i => {
        let lessonObj = {
          title: i.title,
          category: i.category,
          creator: i.creator,
          endDate: i.endDate,
          image: i.image,
          meta: i.meta,
          startDate: i.startDate,
          video: i.video,
        }

        lessonInput.push(lessonObj)
      })

      setLessons(lessonInput)
      setFilter(lessonInput)
    }
  }, [lessonQuery])

  if (!viewer.id) {
    return (
      <>
        <DisplayError title="Must be logged in to create a playlist!" />
        <Box sx={{ margin: 5 }}>
          <Button href='/login' variant='contained'>Go To Log In Page</Button>
        </Box>
      </>
    )
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

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <DisplayError title="Failed to query lessons" />
  }

  const onDragEndHandler = (result: any) => {
    const { destination, source } = result;
    
    // if there is no droppable destination, simply return.
    if (!destination) {
      return;
    }

    // if the source and destination are identical, do nothing. 
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Otherwise, cut the item from lessons array and push to new playlist
    const items = Array.from(lessons);

    if (destination.droppableId === "playlist") {
      const [reorderedItem] = items.splice(source.index, 1);
      playlist.plan.push(reorderedItem);
    
      setLessons(items)
      setPlaylist({...playlist})
    }

    if (destination.droppableId === "lessons") {
      const [reorderedPlay] = playlist.plan.splice(source.index, 1);
      items.push(reorderedPlay)
      
      setLessons(items)
      setPlaylist({...playlist})
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    let enteredSearch = e.target.value;
    setSearchInput(enteredSearch)

    if (enteredSearch) {
      const filteredLessons = lessons.filter(({title}) => title?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
      setLessons(filteredLessons)
    }

    if (enteredSearch === '') {
      setLessons(filter)
      // setFilter(lessons)
    }
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (playlist && playlist.plan) {
      await lessonPlan({
        variables: {
          input: playlist
        }
      });
    }
    // TODO: Navigate to User Profile Page Instead of Home
    navigate("../", { replace: true })    
  }

  return (
    <Box sx={{ margin: 5 }}>
      <h1>Create Lesson Plan</h1>
      <form onSubmit={handleSubmit}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Grid container>
            <Droppable droppableId='playlist'>
              {(provided) => (
                <Grid item xs={6} md={8} lg={8} {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                <Card variant="outlined" sx={{ minHeight: "750px", padding: 5, margin: 2 }}>
                  <TextField
                    label="Lesson Plan Title"
                    id="lesson-plan-title"
                    variant="standard"
                    fullWidth
                    onChange={titleHandler}
                  />
                  {playlist.plan.map((i, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <Grid item xs={12} md={12} lg={12} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={i.id}>
                          <Card variant="outlined" sx={{ padding: 2, margin: 1 }} key={index}>
                            {i?.title}
                          </Card>
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Card>
              </Grid>
              )}
            </Droppable>
            <Droppable droppableId='lessons'>
              {(provided) => (
                <Grid item xs={6} md={4} lg={4} {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                <Card variant="outlined" sx={{ minHeight: "750px", padding: 5, margin: 2 }}>
                  <TextField 
                    variant='outlined' 
                    id="lesson-search" 
                    label="Search Lessons" 
                    value={searchInput} 
                    onChange={inputHandler} 
                    ref={inputRef} 
                    sx={{ width: "100%" }}
                  />
                  <Grid container>
                  {lessons?.map((i, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <Grid item xs={12} md={12} lg={12} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={i.id}>
                          <Card variant="outlined" sx={{ padding: 2, margin: 1 }} key={i.id}>
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
                )}
          </Droppable>
          </Grid>
        </DragDropContext>
        <Button variant='outlined' type='submit'>Create</Button>
      </form>
    </Box>
  )
}