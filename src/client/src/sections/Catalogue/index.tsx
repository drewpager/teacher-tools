import React from 'react';
import { Box, Card, Grid } from '@mui/material'
import { useAllLessonsQuery, Lesson } from '../../graphql/generated';
import { categories } from '../../lib/utils';
import { CatalogItem } from './catalogItem';
import "./catalog.scss";

export const Catalogue = () => {

  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 215,
      page: 1
    }
  });

  if (loading) {
    return (
      <h2>Loading...</h2>
    )
  }

  if (error) {
    return (
      <h2>Error!</h2>
    )
  }

  return (
    <Box className="catalogBackground">
      <h1 className="catalogTitle">Catalog ({data?.allLessons.total})</h1>
      {data && categories.map((cater) => (
        <CatalogItem name={cater.name} category={data.allLessons.result.filter((b) => b.category?.includes(cater.name))} />
      ))}
    </Box >
  )
}