import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';
import { Lesson, useAllLessonsQuery } from '../../../graphql/generated';
import { DisplayError } from '../../utils';

import './timeline.scss';

export const TimelineEl = () => {
  const [start, setStart] = useState<Lesson[]>([]);
  const [category, setCategory] = useState<string>("History")
  const [categoryList, setCategoryList] = useState<string[]>([""])

  const handleClick = (category: string) => {
    setCategory(category);
  }

  // 1. Get All Start Dates from All Lessons
  const { data, loading, error } = useAllLessonsQuery({ 
    variables: {
      limit: 10,
      page: 1
    }
  });

  useEffect(() => {
    let sorted: Lesson[] = [];
    const categories: string[] = [];
    const res = data?.allLessons.result;

    res?.map((i) => (
      sorted.push(i)
    ))

    // get categories
    sorted.map((i) => (
      categories.push(`${i.category}`)
    ))
    
    // 2. Organize in descending order
    sorted.sort((a: any, b: any) => {
      return a.startDate - b.startDate;
    })
    
    console.log(category);
    // sorted.filter((l) => l.category?.toString().toLowerCase().includes(category.toLowerCase()))
    sorted = sorted.filter((l) => `${l.category?.toString()}` === category)

    let uniqueCategories = Array.from(new Set(categories));
    setStart(sorted);
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
                    variant="body2"
                    color="text.secondary"
                    className='timeline--date'
                >
                    {i.startDate}
                </TimelineOppositeContent>
                
                <TimelineSeparator>
                    <TimelineConnector />
                        <TimelineDot />
                    <TimelineConnector />
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