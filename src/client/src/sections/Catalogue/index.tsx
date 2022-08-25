import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAllLessonsQuery } from '../../graphql/generated';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Lesson', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 250
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 150,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 150
  },
  {
    field: 'duration',
    headerName: 'Duration',
    description: "This column cannot be sorted.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => 
      `${params.row.startDate || ''}-${params.row.endDate || ''}`
  },
];

export const Catalogue = () => {
  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 10,
      page: 1
    }
  });
  
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Failed!</h1>;
  }

  if (data) {
    console.log(data.allLessons.result);
  }

  const rows = [
    { id: 1, title: "Biography of Drew Page", startDate: 1989, endDate: 2022 }
  ]

  return (
    <Box sx={{ mt: 10, width: '100%', height: 500 }}>
      <DataGrid 
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[50]}
      />
    </Box>
  )
}