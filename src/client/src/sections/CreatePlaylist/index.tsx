import { CircularProgress, Grid, Box, Card, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { 
  FullLessonInput, 
  useLessonPlanMutation, 
  useAllLessonsQuery, 
  useAllQuizzesQuery,
  Viewer, 
  FullLessonQuiz,
  Plan
} from '../../graphql/generated';
import { DisplayError } from '../../lib/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { UseModal } from '../Modal';
import './createPlaylist.scss';

type props = {
  viewer: Viewer;
}

type InputLessonPlan = {
  name: string,
  creator: string,
  plan: Plan[]
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
  const [lessons, setLessons] = useState<FullLessonInput>({})
  const [quizzes, setQuizzes] = useState<FullLessonQuiz>({})
  const [plans, setPlans] = useState<Array<Plan>>([])
  const [filter, setFilter] = useState<Array<Plan>>([])
  const inputRef = useFocus();
  // const id = viewer && viewer.id ? viewer.id : null;
  const [playlist, setPlaylist] = useState<InputLessonPlan>(initialData)
  
  const limit: number = 10;
  const page: number = 1;

  const { data: lessonData, loading: lessonLoading, error: lessonError } = useAllLessonsQuery({
    variables: {
      limit: limit,
      page: page
    }
  })
  
  const { data: quizData, loading: quizLoading, error: quizError } = useAllQuizzesQuery({
    variables: {
      limit: limit,
      page: page
    }
  })

  const [lessonPlan, { loading, error }] = useLessonPlanMutation({
    variables: {
      input: playlist
    }
  })


  const lessonQuery = lessonData ? lessonData.allLessons.result : null;
  const quizQuery = quizData ? quizData.allquizzes.result : null;

  useEffect(() => {
    if (lessonQuery) {
      const lessonInput: FullLessonInput[] = []
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
          id: i.id
        }
        lessonInput.push(lessonObj);
      })

      setFilter(lessonInput)
      setPlans(lessonInput)
    }
    if (quizQuery) {
      const quizInput: FullLessonQuiz[] = []
      quizQuery.forEach(q => {
        let quizObj = {
          creator: q.creator,
          id: q.id,
          title: q.title,
          questions: [...q.questions]
        }
        quizInput.push(quizObj)
      })

      setFilter(f => [...f, ...quizInput])
      setPlans(p => [...p, ...quizInput])
    }
  }, [lessonQuery, quizQuery])

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

  if (lessonLoading || quizLoading) {
    return <CircularProgress />
  }

  if (lessonError || quizError) {
    return <DisplayError title="Failed to query lesson plan items" />
  }

  const onDragEndHandler = (result: any) => {
    const { destination, source } = result;
    
    // if there is no droppable destination, simply return.
    if (!destination) {
      return;
    }

    // Otherwise, cut the item from lessons array and push to new playlist
    const items = plans;

    // Allow the user to reorder playlist if failed to drag and drop in correct order
    if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const [reorderedPlaylistItem] = playlist.plan.splice(source.index, 1);
      const displacedPlaylistItem = playlist.plan.slice(destination.index, (destination.index + 1));
      playlist.plan[destination.index] = reorderedPlaylistItem;
      playlist.plan.splice((destination.index + 1), 0, ...displacedPlaylistItem);
      
      return {...playlist}
    }

    // if dragging and dropping within lessons simply return items unchanged
    if (source.droppableId === "lessons" && destination.droppableId === "lessons") {
      const [reorderedLesson] = items.splice(source.index, 1);
      const displacedLesson = items.slice(destination.index, (destination.index + 1));
      items[destination.index] = reorderedLesson;
      items.splice((destination.index + 1), 0, ...displacedLesson)
      // items.push(...displacedLesson);
      
      return {...items}
    }

    if (destination.droppableId === "playlist") {

      const [reorderedItem] = items.splice(source.index, 1);
      setPlans([...items]);
      const displacedItem = playlist.plan.slice(destination.index, (destination.index + 1));
      playlist.plan[destination.index] = reorderedItem;
      playlist.plan.push(...displacedItem)
  
      setPlaylist(playlist)
    }

    if (destination.droppableId === "lessons") {
      const [reorderedPlay] = playlist.plan.splice(source.index, 1);
      const displacedPlay = items.slice(destination.index, (destination.index + 1));
      items[destination.index] = reorderedPlay;
      items.push(...displacedPlay)
      
      setPlans([...items])
      setPlaylist(playlist)
    }
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    let enteredSearch = e.target.value;
    setSearchInput(enteredSearch)

    if (enteredSearch) {
      const filteredLessons = plans.filter((plan) => plan?.title?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
      setPlans(filteredLessons)
    }

    if (enteredSearch === '') {
      setPlans(filter)
      // setFilter(lessons)
    }
  }
  console.log(playlist);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (playlist && playlist.plan) {
      await lessonPlan({
        variables: {
          input: playlist
        }
      });
    }
    // Navigate to User Profile Page
    navigate(`../user/${viewer.id}`, { replace: true })    
  }

  if (error) {
    <DisplayError title="Lesson Plan Creation Failed!" />    
  }

  if (loading) {
    return <CircularProgress color='primary' />
  }

  return (
    <Box className="createPlaylist--box">
      <h1>Create Lesson Plan</h1>
      <form onSubmit={handleSubmit}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Grid container>
            <Droppable droppableId='playlist'>
              {(provided, snapshot) => (
                <Grid item xs={12} sm={6} md={8} lg={8}>
                  <Card variant="outlined" sx={{ minHeight: "750px", padding: 5, margin: 2 }} {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                    <TextField
                      label="Lesson Plan Title"
                      id="lesson-plan-title"
                      variant="standard"
                      ref={inputRef}
                      fullWidth
                      onChange={titleHandler}
                    />
                  {playlist.plan.map((i, indices) => (
                    <Draggable draggableId={`${i.id}`} index={indices} key={i.id}>
                      {(provided) => (
                        <Grid item xs={12} md={12} lg={12}>
                          <Card variant="outlined" sx={{ padding: 2, margin: 1 }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}> 
                            { i.title }
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
              {(provided, snapshot) => (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                <Card variant="outlined" className="createPlaylist--card" {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
                  <TextField 
                    variant='outlined' 
                    id="lesson-search" 
                    label="Search Lessons" 
                    value={searchInput} 
                    onChange={inputHandler} 
                    ref={inputRef} 
                    className="createPlaylist--search"
                  />
                  <Grid container>
                    
                  {plans.map((i, index) => (
                    <Draggable draggableId={`${i.id}`} index={index} key={i.id}>
                      {(provided) => (
                        <Grid item xs={12} md={12} lg={12}>
                          <Card variant="outlined" sx={{ padding: 2, margin: 1 }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}> 
                            {JSON.parse(JSON.stringify(i)).title}
                          </Card>
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  </Grid>
                </Card>
                <Grid container>
                {/* <Card variant="outlined" className="createQuiz--card">
                  <UseModal viewer={viewer} />
                </Card> */}
                <UseModal viewer={viewer} />
              </Grid>
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
