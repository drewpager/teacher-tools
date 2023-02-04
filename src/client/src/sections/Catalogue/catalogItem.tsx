import { Grid, Card, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '../../graphql/generated';
import { titleCase } from '../../lib/utils';

type props = {
  name: string;
  category: Lesson[]
}

export const CatalogItem = ({ name, category }: props) => {
  return (
    <Box>
      {category.length > 0 && <h2 style={{ padding: "5px" }}>{titleCase(name)} ({category.length})</h2>}
      <Grid
        container
        gap={1}
        spacing={2}
        direction="row"
        ml={5}
      >
        {category.map((l, index) => (
          <Card key={index} sx={{ width: "auto", textAlign: "center", padding: 2 }}>
            <Link to={`/lesson/${l.id}`} style={{ textDecoration: "none", color: "black" }}>
              {l.title}
            </Link>
          </Card>
        ))}
      </Grid>
    </Box>
  )
}