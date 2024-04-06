import React, { useState, useRef, ChangeEvent, useMemo, useEffect } from 'react';
import { Box, Grid, TextField, InputAdornment, Pagination, Chip, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Playlist, Viewer, useAllPlaylistsQuery, Plan } from '../../graphql/generated';
import { PublicPlaylistCard } from '../../lib/components/PublicPlaylistCard';
import { Footer } from '../../lib/components';
import { PlaylistsSkeleton } from './playlistsSkeleton';
import './playlistsCatalogStyle.scss';
import { Helmet } from 'react-helmet';

type Props = {
  viewer: Viewer
}

export const PlaylistsCatalog = ({ viewer }: Props) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchError, setSearchError] = useState<boolean>(false);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);
  const [gradeFilter, setGradeFilter] = useState<number | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, loading, error } = useAllPlaylistsQuery({
    variables: {
      limit: 1000,
      page: 1,
    }
  });

  if (loading) {
    return (<PlaylistsSkeleton />);
  }

  if (error) {
    return <Box sx={{ marginTop: 15 }}><div>Error: {error.message}</div></Box>;
  }

  if (!data) {
    return <div>No data</div>;
  }
  // FOR SITEMAP GENERATION
  // const playlistRoutes = data?.allplaylists.result.map((playlist: any) => {
  //   if (playlist.public === true) {
  //     const slug = playlist?.name?.replace(/\s+/g, "-").toLowerCase();
  //     return {
  //       url: `/plans/${slug}`,
  //       changefreq: "monthly",
  //       priority: 0.9,
  //     };
  //   } else {
  //     return null;
  //   }
  // });

  // console.log(playlistRoutes.filter((route) => route !== null))

  const resetSearch = () => {
    setSearchInput("");
    setFilteredPlaylists([]);
    setSearchError(false);
  }

  // Catalog Search Bar Feature
  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value)

    if (searchInput !== "") {
      // setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.plan?.find((lesson) => lesson?.title?.toLowerCase().includes(searchInput.toLowerCase()))));
      setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.name?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) &&
        data?.allplaylists.result.filter((playlist) => playlist?.plan?.find((lesson) => lesson?.title?.toLowerCase().includes(searchInput.toLowerCase()))))
      setSearchError(false);
    }

    if (searchInput !== "" && !filteredPlaylists.length) {
      setSearchError(true);
    }

    if (e.target.value === '') {
      setFilteredPlaylists([]);
      setSearchError(false);
    }
  }

  const getWholeNumbers = (range: number[]) => {
    const [start, end] = range;
    const numbers = [];

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }

    return numbers;
  }

  const handleGradeFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGradeFilter(Number(e.target.value));
    setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.level && getWholeNumbers(playlist.level).includes(Number(e.target.value))));
  }

  const handleCategoryFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryFilter(e.target.value);
    setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist.category?.includes(e.target.value.toLowerCase())));
  }

  const handleFilters = () => {
    if (gradeFilter) {
      setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.level && getWholeNumbers(playlist.level).includes(gradeFilter)));
    }

    if (categoryFilter) {
      setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist.category?.includes(categoryFilter.toLowerCase())));
    }
  }

  const handleRemoveFilters = () => {
    setFilteredPlaylists([]);
    setGradeFilter(undefined);
    setCategoryFilter(undefined);
  }

  return (
    <Box>
      <Helmet>
        <title>{`Free Lesson Plan Templates | Plato's Peach`}</title>
        <meta name="description" content={`Discover interactive lesson plans including short videos, articles, PDFs, and assessments. Use the lesson plan as is or copy to your profile and modify for your classroom.`} />
      </Helmet>
      <Chip label="Lesson Plan Template Gallery" color="secondary" className="playlists--chip" size='medium' />
      {console.log(data.allplaylists.result.map((playlist) => playlist.level && getWholeNumbers(playlist.level)))}
      <Box className="playlists--header">
        <TextField
          variant='outlined'
          // id="catalog-search"
          label="Search Catalog"
          onChange={(e) => inputHandler(e)}
          value={`${searchInput}`}
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
        <h1 className='lessonPlan--h1'>
          {categoryFilter && gradeFilter ? `${gradeFilter}th Grade ${categoryFilter}` : categoryFilter ? `${categoryFilter}` : gradeFilter ? `${gradeFilter}th Grade` : null} Lesson Plans
        </h1>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={3} className="lessonPlans--filter">
            <FormControl sx={{ marginLeft: "1rem" }}>
              <FormLabel
                id="radio-buttons-grade-level"
                sx={{ color: 'black', fontWeight: 'bold' }}
              >Grade Level</FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-grade-level"
                name="radio-buttons-group"
              >
                <FormControlLabel value={5} control={<Radio onChange={(e) => handleGradeFilterChange(e)} />} label="5th Grade" />
                <FormControlLabel value={6} control={<Radio onChange={(e) => handleGradeFilterChange(e)} />} label="6th Grade" />
                <FormControlLabel value={7} control={<Radio onChange={(e) => handleGradeFilterChange(e)} />} label="7th Grade" />
                <FormControlLabel value={8} control={<Radio onChange={(e) => handleGradeFilterChange(e)} />} label="8th Grade" />
                <FormControlLabel value={9} control={<Radio onChange={(e) => handleGradeFilterChange(e)} />} label="9th Grade" />
                <FormControlLabel value={10} control={<Radio onChange={(e) => handleGradeFilterChange(e)} />} label="10th Grade" />
                <FormControlLabel value={11} control={<Radio onChange={(e) => handleGradeFilterChange(e)} />} label="11th Grade" />
                <FormControlLabel value={12} control={<Radio onChange={(e) => handleGradeFilterChange(e)} />} label="12th Grade" />
              </RadioGroup>

              <FormLabel
                id="radio-buttons-category"
                sx={{ marginTop: 2, color: 'black', fontWeight: 'bold' }}
              >Category</FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-category"
                name="radio-buttons-group"
              >
                <FormControlLabel value="American History" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="American History" />
                <FormControlLabel value="World History" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="World History" />
                <FormControlLabel value="European History" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="European History" />
                <FormControlLabel value="Holiday History" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="Holiday History" />
                <FormControlLabel value="Biography" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="Biography" />
                <FormControlLabel value="Military History" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="Military History" />
                <FormControlLabel value="Science" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="Science" />
                <FormControlLabel value="Art" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="Art" />
                <FormControlLabel value="World Religions" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="World Religions" />
                <FormControlLabel value="Ancient History" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="Ancient History" />
                <FormControlLabel value="African American History" control={<Radio onChange={(e) => handleCategoryFilterChange(e)} />} label="African American History" />
              </RadioGroup>
              {/* <FormLabel id="demo-radio-buttons-group-label">Time Constraints</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue={30}
                name="radio-buttons-group"
              >
                <FormControlLabel value={10} control={<Radio onChange={(e) => handleTimeFilterChange(e)} />} label="10 Minutes" />
                <FormControlLabel value={15} control={<Radio onChange={(e) => handleTimeFilterChange(e)} />} label="15 Minutes" />
                <FormControlLabel value={20} control={<Radio onChange={(e) => handleTimeFilterChange(e)} />} label="20 Minutes" />
                <FormControlLabel value={30} control={<Radio onChange={(e) => handleTimeFilterChange(e)} />} label="30 Minutes" />
                <FormControlLabel value={45} control={<Radio onChange={(e) => handleTimeFilterChange(e)} />} label="45 Minutes" />
                <FormControlLabel value={60} control={<Radio onChange={(e) => handleTimeFilterChange(e)} />} label="1 Hour+" />
              </RadioGroup> */}
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, textTransform: 'capitalize' }}
                onClick={handleFilters}
              >Apply Filter</Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, textTransform: 'capitalize' }}
                onClick={handleRemoveFilters}
              >Reset Filters</Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9} className="lessonPlans--grid">
            {filteredPlaylists.length ? filteredPlaylists.map((playlist) => (
              (playlist.public || playlist.public === null) &&
              <PublicPlaylistCard {...playlist} premium={playlist.premium ? playlist.premium : false} viewer={viewer} />
            )) : categoryFilter !== undefined || gradeFilter !== undefined && filteredPlaylists.length === 0 ? (
              <Box sx={{ marginTop: 15 }}>
                <h3>No Lesson Plans Match Filter Criteria</h3>
                <Button variant='contained' sx={{ textTransform: "capitalize", marginRight: "0.5rem" }} onClick={handleRemoveFilters}>Reset Filters</Button>
                <Button variant='outlined' sx={{ textTransform: "capitalize" }} href='/playlist/create'>Create New Lesson Plan</Button>
              </Box>
            ) : data.allplaylists.result.map((playlist) => (
              (playlist.public || playlist.public === null) &&
              <PublicPlaylistCard {...playlist} premium={playlist.premium ? playlist.premium : false} viewer={viewer} />
            ))}
          </Grid>
        </Grid>
      </Box>
      <Footer viewer={viewer} />
    </Box>
  );
}