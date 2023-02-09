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

  function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  const categor = data?.allLessons.result;
  const mainCategoryArray: any[] = [];
  categor?.map((i) => mainCategoryArray.push(i?.category ? i.category[0] : undefined))
  const mainCategories = mainCategoryArray.filter(onlyUnique)

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
                <TreeItem nodeId={`${cat}`} label={titleCase(cat)} />
              ))}
              {console.log(selected)}
              {/* <TreeItem nodeId="5" label="Documents">
            <TreeItem nodeId="6" label="MUI">
              <TreeItem nodeId="7" label="src">
                <TreeItem nodeId="8" label="index.js" />
                <TreeItem nodeId="9" label="tree-view.js" />
              </TreeItem>
            </TreeItem>
          </TreeItem> */}
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