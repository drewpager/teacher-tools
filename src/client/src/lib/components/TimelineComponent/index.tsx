import { CircularProgress, Typography } from '@mui/material';
import { Timeline } from '@mui/lab'
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Lesson, useAllLessonsQuery } from '../../../graphql/generated';
import { DisplayError } from '../../utils';

export const TimelineComponent = () => {
  const [start, setStart] = useState<Lesson[]>([]);

  // 1. Get All Start Dates from All Lessons
  const { data, loading, error } = useAllLessonsQuery({ 
    variables: {
      limit: 10,
      page: 1
    }
  });

  useEffect(() => {
    const sorted: Lesson[] = [];
    const res = data?.allLessons.result;
    
    res?.map((i) => (
      sorted.push(i)
    ))
    
    // 2. Organize in descending order
    sorted.sort((a: any, b: any) => {
      return a.startDate - b.startDate;
    })
    
    setStart(sorted);
  }, [data])

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
    <Box sx={{ marginTop: 5 }}>
      <Timeline position="alternate">

      </Timeline>
      {/* <Typography variant="h4">Teach History Chronologically</Typography>
      <ul>
        {start.map((i, index) => (
          <li key={index}>{i.title}</li>
        ))}
      </ul> */}
    </Box>
  )
}