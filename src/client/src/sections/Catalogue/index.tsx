import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Button, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useAllLessonsQuery, Lesson } from '../../graphql/generated';
import { formatDate } from '../../lib/utils';
import "./catalog.scss";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Lesson', width: 70 },
  {
    field: 'title',
    headerName: 'Title',
    width: 250
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 100,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 100
  },
  {
    field: 'duration',
    headerName: 'Duration',
    description: "This column cannot be sorted.",
    sortable: false,
    width: 200,
    valueGetter: (params: GridValueGetterParams) => 
      `${params.row.startDate || ''}-${params.row.endDate || ''}`
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 300
  },
];

export const Catalogue = () => {
    const [start, setStart] = useState<Lesson[]>([]);
    const [category, setCategory] = useState<string>("All")
    const [categoryList, setCategoryList] = useState<string[]>([""])

  let rows = [];
  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 10,
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
    return <CircularProgress />;
  }

  if (error) {
    return <h1>Failed!</h1>;
  }

  if (data && categoryList && start) {
    // let lessons = data.allLessons.result;
    for (let i = 0; i < start.length; i++) {
      const items = {
        id: i + 1,
        title: start[i].title,
        startDate: formatDate(start[i].startDate),
        endDate: formatDate(start[i].endDate),
        category: start[i].category
      };

      rows.push(items);
    }
  }

  return (
    // DataGrid checkboxSelection set to true adds checkbox, but requires an MUI Pro plan to access data
    // TODO: Query user for # of playlists, if > 0, say "Start Building Next Lesson Plan", if 0 say "...First Lesson Plan"
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={9} lg={8}>
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[50]}
            className="catalog--dataTable"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={4} className="catalogGrid--item">
          {categoryList.map((j, index) => (<Button className="catalogFilters--button" key={index} onClick={() => handleClick(j)}>{j}</Button>))}
          <Box className="catalog--cta">
            <h3>Start Building Your First Lesson Plan</h3>
            <Link to="/playlist/create" style={{ textDecoration: "none" }}>
              <Button className="catalogFilters--button">Create Lesson Plan</Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}