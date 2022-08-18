import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Lesson, useAllLessonsQuery } from '../../../graphql/generated';
import { DisplayError } from '../../utils';

export const Timeline = () => {
  const [start, setStart] = useState<Array<Lesson[]>>([])
  // 1. Get All Start Dates from All Lessons
  const { data, loading, error } = useAllLessonsQuery({ 
    variables: {
      limit: 10,
      page: 1
    }
  });

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

  let res = data?.allLessons.result;
  let sorted: any[] = []
  
  for (const lesson in res) {
    sorted.push([res[lesson]]);
  }
  // 2. Organize in descending order
  sorted.sort(function(a, b) { 
    return a[0].startDate - b[0].startDate; 
  })
  setStart(sorted)

  // 3. Display in Timeline component
  return (
    <Box sx={{ marginTop: 5 }}>
      <Typography variant="h4">Teach History Chronologically</Typography>
      <ul>
        {start.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
    </Box>
  )
}