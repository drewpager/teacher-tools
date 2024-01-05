import React, { useState, useRef, useEffect, ChangeEvent, useMemo, memo } from 'react';
import { Alert, Box, CircularProgress, Grid, Typography, Chip, Switch, TextField, InputAdornment, Icon, Tooltip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Close, ViewModule } from '@mui/icons-material';
import Pipe from '../../lib/assets/pipe.svg';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import AppsIcon from '@mui/icons-material/Apps';
import TableRowsIcon from '@mui/icons-material/TableRows';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { useAllLessonsQuery, Viewer, useUserQuery } from '../../graphql/generated';
import { categories, titleCase, DisplayError } from '../../lib/utils';
import { CatalogItem } from './catalogItem';
import { CatalogList } from './catalogList';
import { Footer } from '../../lib/components';
import { CatalogSkeletonGrid } from './catalogSkeletonGrid';
import { CatalogSkeletonList } from './listCatalogSkeleton';
import { FeedbackModal } from '../Contact/FeedbackModal';
import "./catalog.scss";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FixedSizeList as List, areEqual } from 'react-window';

type Props = {
  viewer: Viewer;
}

type RowProps = {
  data: any;
  index: number;
  style: any;
}

export const useSearchFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [])

  return ref;
}


export const Catalog = ({ viewer }: Props) => {
  const [expanded, setExpanded] = useState<string>('');
  const [selected, setSelected] = useState<string>('american history');
  const [ascending, setAscending] = useState<boolean>(true);
  const [alphabetical, setAlphabetical] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredLesson, setFilteredLesson] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [searchInfo, setSearchInfo] = useState<boolean>(true);
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [userBookmarks, setUserBookmarks] = useState<any[]>()
  const inputRef = useSearchFocus();

  const { data: userData, loading: userLoading, error: userError } = useUserQuery({
    variables: {
      id: `${viewer.id}`,
      playlistsPage: 1,
      lessonsPage: 1,
      quizzesPage: 1,
      articlesPage: 1,
      limit: 1
    }, pollInterval: 1000
  });

  if (userLoading) {
    console.log("Loading user data...")
  }

  if (userError) {
    console.log("Error: ", userError.message)
  }

  useEffect(() => {
    setUserBookmarks([userData?.user.bookmarks?.map((bookmark) => bookmark?.id)])
    if (window.location.hash) {
      setSelected(window.location.hash.slice(1).replaceAll("%20", " "))
    }
  }, [userData?.user.bookmarks])

  // Catalog Search Bar Feature
  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value)

    if (searchInput !== "") {
      setFilteredLesson(newDatum ? [...newDatum?.filter((lesson) => lesson?.title?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1)] : []);
      setSearchError(false);
    }

    if (searchInput !== "" && !filteredLesson.length) {
      setSearchError(true);
    }

    if (e.target.value === '') {
      setFilteredLesson([]);
      setSearchError(false);
    }
  }

  const resetSearch = () => {
    setSearchInput("");
    setFilteredLesson([]);
    setSearchError(false);
    setSearchInfo(false);
  }

  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 1500,
      page: 1
    }
  });

  const datum = useMemo(() => { return data }, [data])

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string) => {
    setExpanded(nodeIds);
  };

  const handleSelect = async (event: React.SyntheticEvent, nodeIds: string) => {
    await setSelected(nodeIds);
    datum?.allLessons.result.filter((selectedLesson) => selectedLesson.category?.map((e) => e?.includes(selected)))
    if (window.innerWidth > 900) {
      window.location.replace(`/catalog#${nodeIds}`)
      window.scrollTo(0, 0)
    }
    // window.scrollTo(0, 0)
  };

  if (loading && view === 'grid') {
    return <CatalogSkeletonGrid />
  }

  if (loading && view === 'list') {
    return <CatalogSkeletonList />
  }

  if (error) {
    return (
      <Box>
        {console.log("Error: ", error.message)}
        <DisplayError title='Failed to load Content Catalog' />
      </Box>
    )
  }
  // FOR SITEMAP GENERATION
  // const lessonsRoutes = datum?.allLessons.result.map((lesson: any) => {
  //   if (lesson.public === true) {
  //     return {
  //       url: `/lesson/${lesson.id}`,
  //       changefreq: "yearly",
  //       priority: 0.8,
  //     };
  //   } else {
  //     return null;
  //   }
  // });

  // console.log(lessonsRoutes?.filter((route) => route !== null))

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

  function alpha(a: any, b: any) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }

  function alphabetize(a: any, b: any) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  const Row = memo(({ data, index, style }: RowProps) => {
    const lessons = datum?.allLessons.result;
    // const lessons = data && data.allLessons.result;
    const item = lessons && lessons[index]

    return (
      <div style={style}>
        {item?.title} - {item?.category}
      </div>
    );
  }, areEqual)

  const Example = ({ data }: any) => (
    <List
      height={1000}
      itemCount={data.length}
      itemSize={35}
      layout={"vertical"}
      width={1000}
      style={{ color: "#bc9060" }}
    >
      {Row}
    </List>
  )

  const newDatum = datum?.allLessons.result.filter((d) => d.public)
  let categories: string[] = [];
  datum?.allLessons.result.map((lesson) => lesson?.category?.map((cat) => cat && categories.push(cat.trim())));
  categories = categories?.filter(onlyUnique).sort(alphabetize)

  return (
    <Box maxWidth="100vw" overflow-x="hidden">
      <Helmet>
        <title>{`Catalog of ${newDatum?.length} Short History Documentaries | Plato's Peach`}</title>
        <meta name="description" content={`${datum?.allLessons.total} Short Documentaries for Teachers to Leverage Trusted Content and Engage Students While Adhering to Widely Accepted Curriculum Standards.`} />
      </Helmet>
      <FeedbackModal />
      <Grid container maxWidth="100vw" overflow-x="hidden">
        <Grid item sm={12} md={3} lg={3}>
          <Box className="catalogGrid--categories">
            {/* <Example data={datum?.allLessons.result} /> */}
            <TreeView
              aria-label="controlled"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              defaultEndIcon={<Icon sx={{ color: "black" }}><img alt="catalog pipe" src={Pipe} /></Icon>}
              // expanded={expanded}
              selected={selected}
              // onNodeToggle={handleToggle}
              onNodeSelect={handleSelect}
            // multiSelect
            >
              {categories?.map((cat) => (
                <TreeItem nodeId={`${cat}`} label={
                  <Typography variant='h3'>
                    {titleCase(`${cat}`)}
                  </Typography>
                }>
                  {console.log(selected)}
                  {/* {combinedCategories.sort().map((i: any) => i.main === `${cat}` && !!i.secondary ? (
                    <TreeItem nodeId={`${i.secondary}`} label={
                      <Typography variant='h4'>
                        {titleCase(`${i.secondary}`)}
                      </Typography>
                    }
                      key={`${i.secondary}`} />
                  ) : (
                    <></>
                  ))} */}
                </TreeItem>
              ))}
            </TreeView>
          </Box>
        </Grid>
        <Grid item sm={12} md={9} lg={9}>
          <Example data={selected ? datum?.allLessons.result.filter((selectedLesson) => selectedLesson.category?.map((e) => e?.includes(selected))) : datum?.allLessons.result} />
          {/* <Box className="catalogBackground" sx={{ marginBottom: "80px" }} id={`${selected[0]}`}>
            <Box className="catalogHeader--container">
              <h1 className="catalogTitle">Documentary Catalog
                {" "}<Chip label={newDatum?.length} color="primary" size="medium" />
              </h1><TextField
                variant='outlined'
                // id="catalog-search"
                label="Search Catalog"
                onChange={(e) => inputHandler(e)}
                value={searchInput}
                ref={inputRef}
                className="catalog--search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Close onClick={resetSearch} />
                    </InputAdornment>
                  )
                }}
                helperText={searchError ? "No results found" : null}
                error={searchError}
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Tooltip title={alphabetical ? "Turn sort alphabetically off" : "Reverse chronological order"}>
                <Switch checked={ascending} disabled={alphabetical} onClick={() => setAscending(!ascending)} /></Tooltip><Typography variant='h3'>{ascending ? "Chronological" : "Reverse"}</Typography>
              {" "}
              <Tooltip title="Sort alphabetically"><SortByAlphaIcon onClick={() => setAlphabetical(!alphabetical)} className='catalog--view-button' color={alphabetical ? "secondary" : "info"} /></Tooltip>
              <Tooltip title="List view"><TableRowsIcon onClick={() => setView('list')} className='catalog--view-button' color={view === 'list' ? "secondary" : "info"} /></Tooltip>
              <Tooltip title="Grid view"><AppsIcon onClick={() => setView('grid')} className='catalog--view-button' color={view === 'grid' ? "secondary" : "info"} /></Tooltip>
            </Box>
            {filteredLesson && (
              <div className="catalog--item">
                <>
                  <CatalogItem viewer={`${viewer.id}`} name="Search Results" category={filteredLesson} key={filteredLesson.length} bookmarks={userBookmarks} />
                  {searchInfo && <Alert variant="outlined" severity="info" style={{ marginTop: "0.875rem" }}>Still not finding a topic you want? You can add it <Link to="/lesson/create" style={{ color: "#000" }}>here</Link>.</Alert>}
                </>
              </div>
            )}
            {selected && newDatum && (
              <div className="catalog--item" id={`${selected[0]}`}>
                {view === 'grid' ? (
                  <>
                    <CatalogItem viewer={`${viewer.id}`} name={`${selected[0]}`} category={newDatum.filter((b) => b.category?.includes(selectedSecondary[0][1] ? ` ${selectedSecondary[0][1]}` : selected[0])).sort(ascending ? ascend : descend).sort(alphabetical ? alpha : undefined)} key={`${selected[0]}`} bookmarks={userBookmarks} />
                    <Alert variant="outlined" severity="info" style={{ marginTop: "0.875rem" }}>Not seeing what you're looking for? It might be in another category or try using the search bar above!</Alert>
                  </>
                ) : (
                  <>
                    <CatalogList viewer={`${viewer.id}`} name={`${selected[0]}`} category={newDatum.filter((b) => b.category?.includes(selectedSecondary[0][1] ? ` ${selectedSecondary[0][1]}` : selected[0])).sort(ascending ? ascend : descend).sort(alphabetical ? alpha : undefined)} key={`${selected[0]}`} bookmarks={userBookmarks} />
                    <Alert variant="outlined" severity="info">Not seeing what you're looking for? It might be in another category or try using the search bar above!</Alert>
                  </>
                )}
              </div>
            )}
            {newDatum && categories.map((cater) => (cater.name !== selected[0]) && (
              <div className="catalog--item" id={`${cater.name}`}>
                {view === 'grid' && newDatum ? (
                  <CatalogItem viewer={`${viewer.id}`} name={cater.name} category={newDatum.filter((b) => b.category?.includes(cater.name)).sort(ascending ? ascend : descend).sort(alphabetical ? alpha : undefined)} key={cater.name} bookmarks={userBookmarks} />
                ) : newDatum && (
                  <CatalogList viewer={`${viewer.id}`} name={cater.name} category={newDatum.filter((b) => b.category?.includes(cater.name)).sort(ascending ? ascend : descend).sort(alphabetical ? alpha : undefined)} key={cater.name} bookmarks={userBookmarks} />
                )}

              </div>
            ))}
          </Box > */}
        </Grid>
        <Footer viewer={viewer} />
      </Grid>
    </Box>
  )
}