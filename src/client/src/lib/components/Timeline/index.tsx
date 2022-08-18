import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Lessons, useAllLessonsQuery } from '../../../graphql/generated';
import { DisplayError } from '../../utils';

export const Timeline = () => {
  const [start, setStart] = useState<string[]>([])
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

  if (data) {
    let startArray: string[] = []
    let res = data.allLessons.result;
    res.forEach((i) => {
      startArray.push(`${i.startDate}`)
    })
    setStart(startArray)
  }
  // 2. Organize in descending order

  // 3. Display in Timeline component
  return (
    <Box>
      <Typography variant="h3">Hello</Typography>
    </Box>
  )
}