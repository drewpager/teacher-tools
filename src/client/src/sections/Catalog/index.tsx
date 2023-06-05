import React from 'react';
import { Box, CircularProgress, Grid, Typography, Chip, Switch } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdjustIcon from '@mui/icons-material/Adjust';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { useAllLessonsQuery, Viewer } from '../../graphql/generated';
import { categories, titleCase, DisplayError } from '../../lib/utils';
import { CatalogItem } from './catalogItem';
import { Footer } from '../../lib/components';
import { CatalogSkeleton } from './catalogSkeleton';
import "./catalog.scss";

type Props = {
  viewer: Viewer;
}

export const Catalog = ({ viewer }: Props) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>(['ancient history']);
  const [ascending, setAscending] = React.useState<boolean>(true);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = async (event: React.SyntheticEvent, nodeIds: string[]) => {
    await setSelected(nodeIds);
    if (window.innerWidth > 900) {
      // window.location.replace(`/catalog#${nodeIds}`)
      window.scrollTo(0, 0)
    }
  };

  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 1000,
      page: 1
    }
  });

  if (loading) {
    return <CatalogSkeleton />
    // return (
    //   <Box marginTop={70} marginLeft={"50%"}>
    //     <CircularProgress />
    //   </Box>
    // )
  }

  if (error) {
    return (
      <Box>
        {console.log("Error: ", error.message)}
        <DisplayError title='Failed to load Content Catalog' />
      </Box>
    )
  }


  // Filtering functions
  function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  function onlyDefined(value: { main: string, secondary: undefined | string }, index: number, self: any) {
    return value.secondary !== undefined
  }

  function ascend(a: any, b: any) {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  }

  function descend(a: any, b: any) {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  }

  // Isolate the main and any secondary categories
  const categor = data?.allLessons.result;
  const mainCategoryArray: any[] = [];
  const secondaryCategory: any = [{}];
  const allCategories: any[] = [];

  categor?.map((i) => mainCategoryArray.push(i?.category ? i.category[0]?.trim() : undefined))
  categor?.map((i) => allCategories.push(i?.category ? i.category.map(item => item?.trim()) : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[1]?.trim() } : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[2]?.trim() } : undefined))
  categor?.map((i) => secondaryCategory.push(i?.category ? { main: i.category[0], secondary: i.category[3]?.trim() } : undefined))
  const mainCategories = mainCategoryArray.filter(onlyUnique).sort()
  let secCategories = secondaryCategory.filter(onlyDefined)
  const secondaryCategories = new Map(secCategories.map((item: any) =>
    [item["secondary"], item])).values();

  const combinedCategories = Array.from(secondaryCategories)
  const selectedSecondary = allCategories.filter((b) => b.includes(selected[0]));

  // return <CatalogSkeleton />
  return (
    <Box>
      <Grid container maxWidth={"100%"} overflow={"hidden"}>
        <Grid item sm={12} md={3} lg={3}>
          <Box className="catalogGrid--categories">
            <TreeView
              aria-label="controlled"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              defaultEndIcon={<AdjustIcon />}
              expanded={expanded}
              selected={selected}
              onNodeToggle={handleToggle}
              onNodeSelect={handleSelect}
              multiSelect
            >
              {mainCategories?.map((cat, ind) => (
                <TreeItem nodeId={`${cat}`} label={
                  <Typography variant='h3'>
                    {titleCase(cat)}
                  </Typography>
                }>
                  {combinedCategories.map((i: any) => i.main === `${cat}` && !!i.secondary ? (
                    <TreeItem nodeId={`${i.secondary}`} label={
                      <Typography variant='h4'>
                        {titleCase(`${i.secondary}`)}
                      </Typography>
                    }
                      key={`${i.secondary}`} />
                  ) : (
                    <></>
                  ))}
                </TreeItem>
              ))}
            </TreeView>
          </Box>
        </Grid>
        <Grid item sm={12} md={9} lg={9}>
          <Box className="catalogBackground" sx={{ marginBottom: "80px" }} id={`${selected[0]}`}>
            <h1 className="catalogTitle">Catalog <Chip label={data?.allLessons.total} color="primary" size="medium" /></h1>
            <Box sx={{ display: 'flex' }}>
              <Switch checked={ascending} onClick={() => setAscending(!ascending)} /><Typography variant='h3'>{ascending ? "Chronological" : "Reverse Chronological"}</Typography>
            </Box>
            {selected && data && (
              <div className="catalog--item">
                <CatalogItem viewer={`${viewer.id}`} name={`${selected[0]}`} category={data.allLessons.result.filter((b) => b.category?.includes(selectedSecondary[0][1] ? ` ${selectedSecondary[0][1]}` : selected[0])).sort(ascending ? ascend : descend)} key={`${selected[0]}`} />
              </div>
            )}
            {data && categories.map((cater) => (
              <div className="catalog--item">
                <CatalogItem viewer={`${viewer.id}`} name={cater.name} category={data.allLessons.result.filter((b) => b.category?.includes(cater.name)).sort(ascending ? ascend : descend)} key={cater.name} />
              </div>
            ))}
          </Box >
        </Grid>
      </Grid>
      <Footer viewer={viewer} />
    </Box>
  )
}