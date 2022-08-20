import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Lesson, useAllLessonsQuery } from '../../../graphql/generated';
import { DisplayError } from '../../utils';

export const Timeline = () => {
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
    
    for (const lesson in res) {
      sorted.push(res[lesson]);
    }
    // 2. O rganize in descending order
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
      <Typography variant="h4">Teach History Chronologically</Typography>
      <ul>
        {start.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
        {/* <li key="101">History 101</li>
        <li key="102">History 102</li> */}
      </ul>
    </Box>
  )
}