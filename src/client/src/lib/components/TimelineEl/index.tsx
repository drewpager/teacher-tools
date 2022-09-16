import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';
import { Lesson, useAllLessonsQuery } from '../../../graphql/generated';
import { DisplayError, formatDate } from '../../utils';
import theme from '../../../theme';

import './timeline.scss';

export const TimelineEl = () => {
    const [start, setStart] = useState<Lesson[]>([]);
    const [category, setCategory] = useState<string>("All")
    const [categoryList, setCategoryList] = useState<string[]>([""])
  
    // 1. Get All Start Dates from All Lessons
    const { data, loading, error } = useAllLessonsQuery({ 
      variables: {
        limit: 20,
        page: 1
      }
    });
  
    const handleClick = (category: string) => {
      setCategory(category);
      let allArray: Lesson[] = [];
      if (category === "All") {
        let result = data?.allLessons.result;
        result?.map((i) => (
          allArray.push(i)
        ))
        setStart(allArray);
      }
    }

  useEffect(() => {
    // Create an array to push the resulting lesson objects
    let sorted: Lesson[] = [];
    const categories: string[] = ["All"];
    const res = data?.allLessons.result;

    res?.map((i) => (
      sorted.push(i)
    ))

    // get categories
    sorted.map((i) => (
      categories.push(`${i.category}`)
    ))
    
    // Isolate one word categories
    categories.forEach((c, i) => {
      if (c.includes(",")) {
        categories.splice(i, i + 1)
        const litter: string[] = c.split(",");
        litter.map((e) => (
          categories.push(`${e}`)
        ))
      }
    })
    
    // 2. Organize/sort lessons in descending order of start dates
    sorted.sort((a: any, b: any) => {
      if (a.startDate.startsWith("-")) {
        // if negative, multiply by number of seconds per year to get epoch value
        let start = a.startDate * 31556926 * 1000;
        return start;
      }
      let start = Date.parse(a.startDate)
      let end = Date.parse(b.startDate)
      
      return start - end;
    })

    // Default State & If "All" is selected, setStart to initialState
    if (category === "All") {
      let initialState: Lesson[] = [];
      sorted.map((i) => (
        initialState.push(i)
      ))
      setStart(initialState);
    } else {
      // Filter the sorted list based on the category set in state
      sorted = sorted.filter((l) => `${l.category}`.includes(category))
      setStart(sorted);
    }

    let uniqueCategories = Array.from(new Set(categories));
    setCategoryList(uniqueCategories);

  }, [data, category])

  if (loading) {
    return (
      <Box sx={{ padding: 5 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <DisplayError title='Failed to query Lessons' />
  }
  
  // 3. Display in Timeline component
  return (
    <Box className='timeline--wrapper'>
      <Typography variant="h4">Teach History Chronologically</Typography>
      
      {categoryList.map((j, index) => (<Button key={index} onClick={() => handleClick(j)}>{j}</Button>))}
      
        <Timeline className='timeline--outer'>
          {start.map((i, index) => (
            <TimelineItem className='timeline--item' key={index}>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                    className='timeline--date'
                >
                    {formatDate(i.startDate)}
                    {/* {i.startDate} */}
                    <br />
                    {formatDate(i.endDate)}
                    {/* {i.endDate} */}
                </TimelineOppositeContent>
                
                <TimelineSeparator>
                    <TimelineConnector sx={{ backgroundColor: `${theme.palette.primary.main}` }}/>
                        <TimelineDot sx={{ backgroundColor: `${theme.palette.primary.main}` }}/>
                    <TimelineConnector sx={{ backgroundColor: `${theme.palette.primary.main}` }}/>
                </TimelineSeparator>
                
                <TimelineContent className='timeline--title'>
                    <Typography variant="h6" component="p">
                        {i.title}
                    </Typography>
                    
                    <Typography className='timeline--description'>{i.meta}</Typography>
                </TimelineContent>
            </TimelineItem>
    
          ))}
        </Timeline>
    </Box>
  )
}