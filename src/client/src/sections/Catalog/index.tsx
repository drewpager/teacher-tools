import React from 'react';
import { Box, Card, Grid } from '@mui/material'
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { useAllLessonsQuery, Lesson, Viewer } from '../../graphql/generated';
import { categories, titleCase } from '../../lib/utils';
import { CatalogItem } from './catalogItem';
import { Footer } from '../../lib/components';
import "./catalog.scss";

type Props = {
  viewer: Viewer;
}

export const Catalog = ({ viewer }: Props) => {

  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
    );
  };

  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : [],
    );
  };

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

  // Filtering functions
  function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  function onlyDefined(value: { main: string, secondary: undefined | string }, index: number, self: any) {
    return value.secondary !== undefined
  }

  // Isolate the main and any secondary categories
  const categor = data?.allLessons.result;
  const mainCategoryArray: any[] = [];
  const secondaryCategory: any = [{}];
  categor?.map((i) => mainCategoryArray.push(i?.category ? i.category[0] : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[1]?.trim() } : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[2]?.trim() } : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[3]?.trim() } : undefined))
  const mainCategories = mainCategoryArray.filter(onlyUnique)
  let secCategories = secondaryCategory.filter(onlyDefined)
  const secondaryCategories = new Map(secCategories.map((item: any) =>
    [item["secondary"], item])).values();

  const combinedCategories = Array.from(secondaryCategories)
  console.log("Secondary Cat: ", combinedCategories)
  return (
    <Box>
      <Grid container>
        <Grid item sm={12} md={2} lg={3}>
          {console.log("Category Array: ", mainCategoryArray)}
          <Box sx={{ height: "auto", flexGrow: 1, maxWidth: 400, overflowY: 'auto', marginTop: 10, position: "sticky", top: 30 }}>
            <Box sx={{ mb: 1 }}>
              <Button onClick={handleExpandClick}>
                {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
              </Button>
              <Button onClick={handleSelectClick}>
                {selected.length === 0 ? 'Select all' : 'Unselect'}
              </Button>
            </Box>
            <TreeView
              aria-label="controlled"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              expanded={expanded}
              selected={selected}
              onNodeToggle={handleToggle}
              onNodeSelect={handleSelect}
              multiSelect
            >
              {mainCategories?.map((cat, ind) => (
                <TreeItem nodeId={`${cat}`} label={titleCase(cat)}>
                  {combinedCategories.map((i: any) => i.main === `${cat}` && (
                    <TreeItem nodeId={`${i.secondary}`} label={titleCase(`${i.secondary}`)} key={`${i.secondary}`} />
                  ))}
                </TreeItem>
              ))}
              {console.log(selected)}
            </TreeView>
          </Box>
        </Grid>
        <Grid item sm={12} md={10} lg={9}>
          <Box className="catalogBackground" sx={{ marginBottom: "80px" }}>
            <h1 className="catalogTitle">Catalog ({data?.allLessons.total})</h1>
            {selected && data && (
              <div className="catalog--item">
                <CatalogItem name={`${selected}`} category={data.allLessons.result.filter((b) => b.category?.includes(selected[0]))} key={`${selected}`} />
              </div>
            )}
            {data && categories.map((cater) => (
              <div className="catalog--item">
                <CatalogItem name={cater.name} category={data.allLessons.result.filter((b) => b.category?.includes(cater.name))} key={cater.name} />
              </div>
            ))}
          </Box >
        </Grid>
      </Grid>
      <Footer viewer={viewer} />
    </Box>
  )
}