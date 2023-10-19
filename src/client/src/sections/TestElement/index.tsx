// import React from 'react';
// import { CreatePlaylistSkeleton } from '../CreatePlaylist/createPlaylistSkeleton';
// import { Viewer } from '../../graphql/generated';

// type Props = {
//   viewer: Viewer;
// }

// export const TestElement = ({ viewer }: Props) => {
//   return (
//     <div>
//       <CreatePlaylistSkeleton />
//     </div>
//   )
// }


// V2 Test // 


// import { Grid, Box, Card, TextField, Button, Switch, FormControlLabel, Chip, Typography, CardMedia, InputAdornment, Tooltip } from '@mui/material';
// import { Close } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import React, { useState, ChangeEvent, useRef, useEffect, useMemo } from 'react';
// import {
//   FullLessonInput,
//   useLessonPlanMutation,
//   useAllLessonsQuery,
//   useAllQuizzesQuery,
//   Viewer,
//   FullLessonQuiz,
//   Plan,
//   useUserQuery
// } from '../../graphql/generated';
// import { DisplayError, titleCase } from '../../lib/utils';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import { useNavigate } from 'react-router-dom';
// import { UseModal } from '../Modal';
// import '../CreatePlaylist/createPlaylist.scss';
// import { Link } from 'react-router-dom';
// import { CreatePlaylistCard, Footer } from '../../lib/components';
// import theme from '../../theme';
// import HowItWorks from '../../lib/assets/how-it-works-3.png';
// import { CreatePlaylistSkeleton } from '../CreatePlaylist/createPlaylistSkeleton';

// type props = {
//   viewer: Viewer;
// }

// type InputLessonPlan = {
//   name: string,
//   creator: string,
//   plan: Plan[]
// }

// const initialData: InputLessonPlan = {
//   name: "",
//   creator: "",
//   plan: []
// }

// export const useNewRefFocus = () => {
//   const ref = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     ref.current?.focus();
//   }, [])

//   return ref;
// }

// export const TestElement = ({ viewer }: props) => {
//   let navigate = useNavigate();
//   const [searchInput, setSearchInput] = useState<string>("")
//   const [searchError, setSearchError] = useState<boolean>(false)
//   const [variant, setVariant] = useState<boolean>(true)
//   const [filled, setFilled] = useState<boolean>(true)
//   const [lessons, setLessons] = useState<Array<Plan>>([])
//   const [quizzes, setQuizzes] = useState<Array<Plan>>([])
//   const [plans, setPlans] = useState<Array<Plan>>([])
//   const [filter, setFilter] = useState<Array<Plan>>([])
//   const [yourContent, setYourContent] = useState<boolean>(false);
//   const inputRef = useNewRefFocus();
//   // const searchRef = useSearchFocus();
//   const [playlist, setPlaylist] = useState<InputLessonPlan>(initialData)

//   const limit: number = 1000;
//   const page: number = 1;

//   const { data: userData, loading: userLoading, error: userError } = useUserQuery({
//     variables: {
//       id: `${viewer.id}`,
//       playlistsPage: 0,
//       lessonsPage: 0,
//       quizzesPage: 0,
//       limit: 0
//     }
//   });

//   const { data: lessonData, loading: lessonLoading, error: lessonError } = useAllLessonsQuery({
//     variables: {
//       limit: limit,
//       page: page
//     }
//   })

//   const { data: quizData, loading: quizLoading, error: quizError } = useAllQuizzesQuery({
//     variables: {
//       limit: limit,
//       page: page
//     }
//   })

//   const [lessonPlan, { loading, error }] = useLessonPlanMutation({
//     variables: {
//       input: playlist,
//       viewerId: `${viewer.id}`
//     }
//   })

//   const BookmarkSwitch = styled(Switch)(({ theme }) => ({
//     width: 62,
//     height: 34,
//     padding: 7,
//     '& .MuiSwitch-switchBase': {
//       margin: 2,
//       padding: 0,
//       transform: 'translateX(6px)',
//       '&.Mui-checked': {
//         color: '#fff',
//         transform: 'translateX(22px)',
//         '& .MuiSwitch-thumb:before': {
//           backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 25 25"><path fill="${encodeURIComponent(
//             '#fff',
//           )}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>')`,
//         },
//         '& + .MuiSwitch-track': {
//           opacity: 1,
//           backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//         },
//       },
//     },
//     '& .MuiSwitch-thumb': {
//       backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
//       width: 32,
//       height: 32,
//       '&:before': {
//         content: "''",
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         left: 0,
//         top: 0,
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 25 25"><path fill="${encodeURIComponent(
//           '#fff',
//         )}" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/> </svg>')`,
//       },
//     },
//     '& .MuiSwitch-track': {
//       opacity: 1,
//       backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//       borderRadius: 20 / 2,
//     },
//   }));

//   const lessonQuery = useMemo(() => { return lessonData?.allLessons.result }, [lessonData])
//   // let lessonQuery = lessonData ? lessonData.allLessons.result : null;
//   let quizQuery = useMemo(() => { return quizData?.allquizzes?.result }, [quizData])
//   let bookmarkQuery = userData ? userData.user.bookmarks : null;

//   useEffect(() => {
//     if (window.localStorage.getItem("playlist")?.length) {
//       setPlaylist(JSON.parse(`${window?.localStorage?.getItem("playlist")}`))
//     } else {
//       setPlaylist(initialData);
//     }
//   }, [])

//   useEffect(() => {
//     if (window.localStorage.getItem("playlist")?.length) {
//       setPlaylist(JSON.parse(`${window?.localStorage?.getItem("playlist")}`))
//     }

//     if (lessonQuery) {
//       const lessonInput: FullLessonInput[] = []
//       lessonQuery.forEach(i => {
//         let lessonObj = {
//           title: i.title,
//           category: i.category,
//           creator: i.creator,
//           endDate: i.endDate,
//           image: i.image,
//           meta: i.meta,
//           startDate: i.startDate,
//           video: i.video,
//           _id: i.id
//         }
//         lessonInput.push(lessonObj);
//       })

//       setFilter(lessonInput)
//       setPlans(lessonInput)
//       setLessons(lessonInput)
//     }
//     if (quizQuery) {
//       const quizInput: FullLessonQuiz[] = []
//       quizQuery.forEach(q => {
//         let quizObj = {
//           creator: q.creator,
//           _id: q.id,
//           title: q.title,
//           // questions: [...q.questions]
//           questions: q.questions
//         }
//         quizInput.push(quizObj)
//       })
//       setQuizzes(quizInput)
//       setFilter((f) => [...f, ...quizInput])
//       setPlans((p) => [...p, ...quizInput])
//     }
//   }, [lessonQuery, quizQuery, quizData, lessonData])

//   if (!viewer.id) {
//     return (
//       <>
//         {navigate('/login', { replace: true })}
//         <DisplayError title="Must be logged in to create a playlist!" />
//         <Footer />
//       </>
//     )
//   }

//   // Filtering functions
//   function onlyUnique(value: any, index: number, self: any) {
//     return self.indexOf(value) === index;
//   }

//   function onlyDefined(value: { main: string, secondary: undefined | string }, index: number, self: any) {
//     return value.secondary !== undefined
//   }

//   // Isolate the main and any secondary categories
//   const categor = lessonData?.allLessons.result;
//   const mainCategoryArray: any[] = [];
//   const secondaryCategory: any = [{}];
//   const allCategories: any[] = [];
//   categor?.map((i) => mainCategoryArray.push(i?.category ? i.category[0]?.trim() : undefined))
//   categor?.map((i) => allCategories.push(i?.category ? i.category.map(item => item?.trim()) : undefined))
//   categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[1]?.trim() } : undefined))
//   categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[2]?.trim() } : undefined))
//   categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[3]?.trim() } : undefined))
//   const mainCategories = mainCategoryArray.filter(onlyUnique)
//   let secCategories = secondaryCategory.filter(onlyDefined)
//   const secondaryCategories = new Map(secCategories.map((item: any) =>
//     [item["secondary"], item])).values();

//   const combinedCategories = Array.from(secondaryCategories)
//   // const selectedSecondary = allCategories.filter((b) => b.includes(selected[0]));
//   // setCater(mainCategories.map((i) => false))
//   const titleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     e.preventDefault();
//     let name = e.target.value;
//     setPlaylist({
//       plan: [...playlist.plan],
//       name: name,
//       creator: viewer && viewer.id ? viewer.id : "0"
//     })
//     window.localStorage.setItem('playlist', JSON.stringify(playlist));
//   }

//   if (lessonLoading || quizLoading) {
//     return <CreatePlaylistSkeleton />
//   }

//   if (lessonError || quizError) {
//     return <DisplayError title="Failed to query lesson plan items" />
//   }


//   const onDragEndHandler = (result: any) => {
//     const { destination, source } = result;

//     // if there is no droppable destination, simply return.
//     if (!destination) {
//       return;
//     }

//     // Otherwise, cut the item from lessons array and push to new playlist
//     let items = plans

//     // Allow the user to reorder playlist if failed to drag and drop in correct order
//     if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
//       const [reorderedPlaylistItem] = playlist.plan.splice(source.index, 1);
//       const displacedPlaylistItem = playlist.plan.slice(destination.index, (destination.index + 1));
//       playlist.plan[destination.index] = reorderedPlaylistItem;
//       playlist.plan.splice((destination.index + 1), 0, ...displacedPlaylistItem);

//       return { ...playlist }
//     }

//     // if dragging and dropping within lessons simply return items unchanged
//     if (source.droppableId === "lessons" && destination.droppableId === "lessons") {
//       const [reorderedLesson] = items.splice(source.index, 1);
//       const displacedLesson = items.slice(destination.index, (destination.index + 1));
//       items[destination.index] = reorderedLesson;
//       items.splice((destination.index + 1), 0, ...displacedLesson)
//       // items.push(...displacedLesson);

//       return { ...items }
//     }

//     if (destination.droppableId === "playlist") {
//       const [reorderedItem] = items.splice(source.index, 1);
//       setPlans([...items]);
//       const displacedItem = playlist.plan.slice(destination.index, (destination.index + 1));
//       playlist.plan[destination.index] = reorderedItem;
//       playlist.plan.push(...displacedItem)

//       setPlaylist(playlist)
//       window.localStorage.setItem('playlist', JSON.stringify(playlist));
//     }

//     if (destination.droppableId === "lessons") {
//       const [reorderedPlay] = playlist.plan.splice(source.index, 1);
//       const displacedPlay = items.slice(destination.index, (destination.index + 1));
//       items[destination.index] = reorderedPlay;
//       items.push(...displacedPlay)

//       setPlans(items)
//       setFilter(items)
//       setPlaylist(playlist)
//       window.localStorage.setItem('playlist', JSON.stringify(playlist));
//     }
//   }

//   const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     e.preventDefault();
//     let enteredSearch = e.target.value;
//     setSearchInput(enteredSearch)

//     if (enteredSearch) {
//       const filteredLessons = plans.filter((plan) => plan.category?.find((p) => p?.includes(searchInput.toLowerCase())) || plan?.title?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
//       if (!filteredLessons.length) {
//         setSearchError(true)
//       }
//       setPlans(filteredLessons)
//     }

//     if (enteredSearch === '') {
//       // if value is already from plan, remove from lessons
//       setSearchError(false)
//       setPlans(filter.filter(val => !playlist.plan.includes(val)))
//       // setSearchError(true)
//       // setFilter(lessons)
//     }
//   }

//   const handleReset = () => {
//     setPlaylist(initialData);
//     playlist.plan.length = 0;
//     setPlans(playlist.plan);
//     if (!!window.localStorage.getItem('playlist')) {
//       window.localStorage.removeItem('playlist');
//     }
//     handleCategoryClick("All", 0)
//   }

//   const handleSwitch = () => {
//     setYourContent(!yourContent)
//     handleCategoryClick("All", 0)
//   }

//   const resetSearch = () => {
//     setSearchInput("");
//     setPlans(filter.filter(val => !playlist.plan.includes(val)))
//     setSearchError(false);
//     document.getElementById("lesson-search")?.focus();
//   }

//   const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (playlist && playlist.plan) {
//       await lessonPlan({
//         variables: {
//           input: playlist,
//           viewerId: `${viewer.id}`
//         }
//       });
//     }
//     // Remove items from playlist plan field for next visit and Navigate to User Profile Page
//     setPlaylist(initialData);
//     playlist.plan.length = 0;
//     window.localStorage.removeItem('playlist');
//     navigate(`../user/${viewer.id}`, { replace: true })
//   }

//   const handleCategoryClick = (i: string, index: number) => {
//     if (i === "All") {
//       setPlans([...filter])
//       return { ...filter }
//       // DisplayError({ title: "All" })
//     }

//     if (i === "Quizzes") {
//       setPlans([...filter.filter((e) => e.questions && e.questions?.length > 0)])
//       return { ...filter }
//     }
//     // setFilled(!filled)
//     setPlans([...filter.filter((e) => e.category?.includes(i))])
//   }

//   if (error) {
//     return <DisplayError title="Lesson Plan Creation Failed!" />
//   }

//   if (loading) {
//     return <CreatePlaylistSkeleton />
//   }

//   return (
//     <div>
//       <Box className="createPlaylist--box">
//         {/* <FeedbackModal /> */}
//         <h1 className='createPlaylist--h1'>Create Lesson Plan</h1>
//         <form onSubmit={handleSubmit}>
//           <Button disableRipple disableTouchRipple className='createPlaylist--button' variant="contained" onClick={handleReset}>Reset</Button>
//           <DragDropContext onDragEnd={onDragEndHandler}>
//             <Grid container>
//               <Droppable droppableId='playlist'>
//                 {(provided, snapshot) => (
//                   <Grid item xs={12} sm={12} md={7} lg={7}>
//                     <Card variant="outlined" className="createPlaylist-drop--card" {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
//                       <TextField
//                         label="Lesson Plan Title"
//                         id="lesson-plan-title"
//                         variant="standard"
//                         ref={inputRef}
//                         fullWidth
//                         onChange={titleHandler}
//                         value={playlist.name}
//                         onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
//                       />
//                       {playlist.plan.length === 0 && <CardMedia component="img" image={HowItWorks} sx={{ width: "95%", opacity: "50%" }} />}
//                       {playlist.plan.map((i, indices) => (
//                         <Draggable draggableId={`${i._id}`} index={indices} key={i._id}>
//                           {(provided, snapshot) => (
//                             <Grid item xs={12} md={12} lg={12} className="playlist--dropbox">
//                               <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
//                                 {i.questions ? (
//                                   <Card className="lesson--card">
//                                     {i.title} <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
//                                   </Card>
//                                 ) : (
//                                   <CreatePlaylistCard {...i} />
//                                 )}
//                               </div>
//                             </Grid>
//                           )}
//                         </Draggable>
//                       ))}
//                       {snapshot.isDraggingOver && provided.placeholder && <Box sx={{ border: "1px dotted #3a70cd", height: 170, width: "90%", backgroundColor: "rgba(60, 117, 214, 0.1)" }} />}
//                       {provided.placeholder}
//                     </Card>
//                   </Grid>
//                 )}
//               </Droppable>
//               <Droppable droppableId='lessons'>
//                 {(provided, snapshot) => (
//                   <Grid item xs={12} sm={12} md={5} lg={5}>
//                     <Tooltip title="Filter for content you've created or bookmarked" placement="top">
//                       <FormControlLabel
//                         control={<BookmarkSwitch
//                           sx={{ m: 1 }}
//                           checked={!yourContent}
//                           onChange={handleSwitch}
//                         />}
//                         label={yourContent ? "Viewing Your Content Only" : "Viewing All Public Content"}
//                       />
//                     </Tooltip>
//                     <br />
//                     <Chip
//                       key={1000}
//                       label={"All"}
//                       variant={"outlined"}
//                       onClick={() => handleCategoryClick("All", 0)}
//                       sx={{ m: "1px" }}
//                     />
//                     <Chip
//                       key={1001}
//                       label={"Quizzes"}
//                       variant={"outlined"}
//                       onClick={() => handleCategoryClick("Quizzes", 1)}
//                       sx={{ m: "1px" }}
//                     />
//                     {mainCategories.map((i: any, index) => (
//                       <>
//                         <Chip
//                           key={index}
//                           label={titleCase(i)}
//                           variant={variant ? "filled" : "outlined"}
//                           onClick={() => handleCategoryClick(i.toString(), index)}
//                           sx={{ m: "1px" }}
//                         />
//                       </>
//                     ))}
//                     <Card variant="outlined" className="createPlaylist--card" {...provided.droppableProps} ref={provided.innerRef} key={provided.droppableProps['data-rbd-droppable-id']}>
//                       <TextField
//                         variant='outlined'
//                         id="lesson-search"
//                         label="Search Lessons"
//                         value={searchInput}
//                         onChange={inputHandler}
//                         ref={inputRef}
//                         className="createPlaylist--search"
//                         InputProps={{
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <Close onClick={resetSearch} />
//                             </InputAdornment>
//                           )
//                         }}
//                         helperText={searchError ? "No results found" : null}
//                         error={searchError}
//                         onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
//                       />
//                       <Grid container>
//                         {/* {plans.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).map((i, index) => ( */}
//                         {plans.map((i, index) => (
//                           yourContent && (bookmarkQuery?.find((val) => (val?.id === `${i._id}`)) || (i.creator === viewer.id)) ? (
//                             <Draggable draggableId={`${i._id}`} index={index} key={i._id}>
//                               {(provided) => (
//                                 <Grid item xs={12} md={12} lg={12}>
//                                   {!i && <Link to="/catalog"><Typography variant="h5">You haven't added or bookmarked any content here yet, click here to add your first lesson.</Typography></Link>}
//                                   <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
//                                     {i.questions ? (
//                                       <Card className="lesson--card">
//                                         {JSON.parse(JSON.stringify(i)).title} <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
//                                       </Card>
//                                     ) : (
//                                       <CreatePlaylistCard {...i} />
//                                     )}
//                                   </Box>
//                                 </Grid>
//                               )}
//                             </Draggable>
//                           ) : !yourContent && (
//                             <Draggable draggableId={`${i._id}`} index={index} key={i._id}>
//                               {(provided) => (
//                                 <Grid item xs={12} md={12} lg={12}>
//                                   <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
//                                     {i.questions ? (
//                                       <Card className="lesson--card">
//                                         {JSON.parse(JSON.stringify(i)).title} <Chip label="Assessment" color="error" sx={{ ml: 1, color: theme.palette.info.light }} />
//                                       </Card>
//                                     ) : (
//                                       <CreatePlaylistCard {...i} />
//                                     )}
//                                   </Box>
//                                 </Grid>
//                               )}
//                             </Draggable>
//                           )
//                         ))}
//                         {provided.placeholder}
//                       </Grid>
//                     </Card>
//                     <Grid container>
//                       <UseModal viewer={viewer} />
//                     </Grid>
//                   </Grid>
//                 )}
//               </Droppable>
//             </Grid>
//           </DragDropContext>
//           <Button
//             className="createPlaylist--button"
//             variant='contained'
//             type='submit'
//             disableRipple
//             disableTouchRipple
//           >Create</Button>
//         </form >
//       </Box>
//       <Footer viewer={viewer} />
//     </div>
//   )
// }

// @flow
// import React, { useState, useLayoutEffect, useRef } from "react";
// // import ReactDOM from "react-dom";
// import { FixedSizeList, areEqual } from "react-window";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./testElement.scss";
// import getInitialData from "./get-initial-data";

// interface Props {
//   data: any;
//   index: number;
//   style: any;
// }

// function getStyle({ draggableStyle, virtualStyle, isDragging }: any) {
//   // If you don't want any spacing between your items
//   // then you could just return this.
//   // I do a little bit of magic to have some nice visual space
//   // between the row items
//   const combined = {
//     ...virtualStyle,
//     ...draggableStyle
//   };

//   // Being lazy: this is defined in our css file
//   const grid = 8;

//   // when dragging we want to use the draggable style for placement, otherwise use the virtual style
//   const result = {
//     ...combined,
//     height: isDragging ? combined.height : combined.height - grid,
//     left: isDragging ? combined.left : combined.left + grid,
//     width: isDragging
//       ? draggableStyle.width
//       : `calc(${combined.width} - ${grid * 2}px)`,
//     marginBottom: grid
//   };

//   return result;
// }

// function reorderList(list: any, startIndex: number, endIndex: number) {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// }

// function Item({ provided, item, style, isDragging }: any) {
//   return (
//     <div
//       {...provided.draggableProps}
//       {...provided.dragHandleProps}
//       ref={provided.innerRef}
//       style={getStyle({
//         draggableStyle: provided.draggableProps.style,
//         virtualStyle: style,
//         isDragging
//       })}
//       className={`item ${isDragging ? "is-dragging" : ""}`}
//     >
//       {item.text}
//     </div>
//   );
// }

// // Recommended react-window performance optimisation: memoize the row render function
// // Things are still pretty fast without this, but I am a sucker for making things faster
// const Row = React.memo(function Row(props: Props) {
//   const { data: items, index, style } = props;
//   const item = items[index];

//   // We are rendering an extra item for the placeholder
//   if (!item) {
//     return null;
//   }

//   return (
//     <Draggable draggableId={item.id} index={index} key={item.id}>
//       {provided => <Item provided={provided} item={item} style={style} />}
//     </Draggable>
//   );
// }, areEqual);

// const ItemList = React.memo(function ItemList({ column, index }: any) {
//   // There is an issue I have noticed with react-window that when reordered
//   // react-window sets the scroll back to 0 but does not update the UI
//   // I should raise an issue for this.
//   // As a work around I am resetting the scroll to 0
//   // on any list that changes it's index
//   const listRef = useRef();
//   useLayoutEffect(() => {
//     const list: any = listRef.current;
//     if (list) {
//       list.scrollTo(0);
//     }
//   }, [index]);

//   return (
//     <Droppable
//       droppableId={column.id}
//       mode="virtual"
//       renderClone={(provided, snapshot, rubric) => (
//         <Item
//           provided={provided}
//           isDragging={snapshot.isDragging}
//           item={column.items[rubric.source.index]}
//         />
//       )}
//     >
//       {(provided, snapshot) => {
//         // Add an extra item to our list to make space for a dragging item
//         // Usually the DroppableProvided.placeholder does this, but that won't
//         // work in a virtual list
//         const itemCount = snapshot.isUsingPlaceholder
//           ? column.items.length + 1
//           : column.items.length;

//         return (
//           <FixedSizeList
//             height={500}
//             itemCount={itemCount}
//             itemSize={80}
//             width={300}
//             outerRef={provided.innerRef}
//             itemData={column.items}
//             className="task-list"
//             ref={listRef ? listRef.current : null}
//           >
//             {Row}
//           </FixedSizeList>
//         );
//       }}
//     </Droppable>
//   );
// });

// const Column = React.memo(function Column({ column, index }: any) {
//   return (
//     <Draggable draggableId={column.id} index={index}>
//       {provided => (
//         <div
//           className="column"
//           {...provided.draggableProps}
//           ref={provided.innerRef}
//         >
//           <h3 className="column-title" {...provided.dragHandleProps}>
//             {column.title}
//           </h3>
//           <ItemList column={column} index={index} />
//         </div>
//       )}
//     </Draggable>
//   );
// });

// export const TestElement = ({ viewer }: any) => {
//   console.log(viewer);
//   const [state, setState] = useState<any>(() => getInitialData());

//   function onDragEnd(result: any) {
//     if (!result.destination) {
//       return;
//     }

//     if (result.type === "column") {
//       // if the list is scrolled it looks like there is some strangeness going on
//       // with react-window. It looks to be scrolling back to scroll: 0
//       // I should log an issue with the project
//       // const columnOrder: any = reorderList(
//       //   state.columnOrder,
//       //   result.source.index,
//       //   result.destination.index
//       // );

//       const columnOrder: any = state.columnOrder;

//       setState({
//         ...state,
//         columnOrder
//       });
//       return;
//     }

//     // reordering in same list
//     if (result.source.droppableId === result.destination.droppableId) {
//       const column = state.columns[result.source.droppableId];
//       const items = reorderList(
//         column.items,
//         result.source.index,
//         result.destination.index
//       );

//       // updating column entry
//       const newState = {
//         ...state,
//         columns: {
//           ...state.columns,
//           [column.id]: {
//             ...column,
//             items
//           }
//         }
//       };
//       setState(newState);
//       return;
//     }

//     // moving between lists
//     const sourceColumn = state.columns[result.source.droppableId];
//     const destinationColumn = state.columns[result.destination.droppableId];
//     const item = sourceColumn.items[result.source.index];

//     // 1. remove item from source column
//     const newSourceColumn = {
//       ...sourceColumn,
//       items: [...sourceColumn.items]
//     };
//     newSourceColumn.items.splice(result.source.index, 1);

//     // 2. insert into destination column
//     const newDestinationColumn = {
//       ...destinationColumn,
//       items: [...destinationColumn.items]
//     };
//     // in line modification of items
//     newDestinationColumn.items.splice(result.destination.index, 0, item);

//     const newState = {
//       ...state,
//       columns: {
//         ...state.columns,
//         [newSourceColumn.id]: newSourceColumn,
//         [newDestinationColumn.id]: newDestinationColumn
//       }
//     };

//     setState(newState);
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="app">
//         <Droppable
//           droppableId="all-droppables"
//           direction="horizontal"
//           type="column"
//         >
//           {provided => (
//             <div
//               className="columns"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {state.columnOrder.map((columnId: any, index: number) => (
//                 <Column
//                   key={columnId}
//                   column={state.columns[columnId]}
//                   index={index}
//                 />
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </div>
//     </DragDropContext>
//   );
// }

import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Viewer } from '../../graphql/generated';
import { pdfjs } from 'react-pdf';
import "../../lib/assets/New-Deal-SAC-Student-Materials.pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

interface Props {
  viewer: Viewer;
}

export const TestElement = ({ viewer }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div style={{ marginTop: 150 }}>
      <Document file="https://schoolwires.henry.k12.ga.us/cms/lib/GA01000549/Centricity/Domain/5939/TextBook.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}