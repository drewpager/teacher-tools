import React from 'react';
import { Box, Card, Grid } from '@mui/material'
import { useAllLessonsQuery, Lesson, Viewer } from '../../graphql/generated';
import { categories } from '../../lib/utils';
import { CatalogItem } from './catalogItem';
import { Footer } from '../../lib/components';
import "./catalog.scss";

type Props = {
  viewer: Viewer;
}

export const Catalog = ({ viewer }: Props) => {

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
    <>
      <Box className="catalogBackground" sx={{ marginBottom: "80px" }}>
        <h1 className="catalogTitle">Catalog ({data?.allLessons.total})</h1>
        {data && categories.map((cater) => (
          <CatalogItem name={cater.name} category={data.allLessons.result.filter((b) => b.category?.includes(cater.name))} />
        ))}
      </Box >
      <Footer viewer={viewer} />
    </>
  )
}