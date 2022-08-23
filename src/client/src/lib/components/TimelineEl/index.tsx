import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';
import { Lesson, useAllLessonsQuery } from '../../../graphql/generated';
import { DisplayError } from '../../utils';

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
    <Box sx={{ marginTop: 5, minHeight: 550 }}>
      <Typography variant="h4">Teach History Chronologically</Typography>
      {categoryList.map((j) => (<Button onClick={() => handleClick(j)}>{j}</Button>))}
      {start.map((i) => (
        <Box>
          <Timeline position='right'>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {i.startDate}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
                <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                {i.title}
              </Typography>
              <Typography>{i.meta}</Typography>
            </TimelineContent>
          </TimelineItem>
    
          </Timeline>
        </Box>
      ))}
    </Box>
  )
}