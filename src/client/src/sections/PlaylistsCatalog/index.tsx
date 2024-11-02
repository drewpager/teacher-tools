import React, { useState, useRef, ChangeEvent, useMemo, useEffect } from 'react';
import { Box, Grid, TextField, InputAdornment, Pagination, Chip, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Button, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Playlist, Viewer, useAllPlaylistsQuery, Plan } from '../../graphql/generated';
import { PublicPlaylistCard } from '../../lib/components/PublicPlaylistCard';
import { Footer } from '../../lib/components';
import { PlaylistsSkeleton } from './playlistsSkeleton';
import './playlistsCatalogStyle.scss';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { titleCase } from '../../lib/utils';

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

  const navigate = useNavigate();
  const location = useLocation();

  const extractGradeNumber = (path: string) => {
    const regex = /\/plan\/(\d+)th-grade/;
    const match = path.match(regex);
    return match ? Number(match[1]) : undefined;
  }

  useEffect(() => {
    if (location.pathname.length > 6) {
      (location.pathname.match(/\//g) || []).length > 1 && location.pathname.match(/[0-9]+/g) && setGradeFilter(extractGradeNumber(location.pathname));
      (location.pathname.match(/\//g) || []).length > 1 && !location.pathname.match(/[0-9]+/g) && setCategoryFilter(titleCase(`${location.pathname.split('/').pop()?.replaceAll('-', ' ')}`));
      (location.pathname.match(/\//g) || []).length > 2 && setCategoryFilter(titleCase(`${location.pathname.split('/').pop()?.replaceAll('-', ' ')}`));
    }
  }, [location.pathname])

  const getWholeNumbers = (range: number[]) => {
    const [start, end] = range;
    const numbers = [];

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }

    return numbers;
  }

  const { data, loading, error } = useAllPlaylistsQuery({
    variables: {
      limit: 1000,
      page: 1,
    }
  });

  useEffect(() => {
    if (data && gradeFilter && categoryFilter !== undefined) {
      setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.level && getWholeNumbers(playlist.level).includes(Number(gradeFilter)) && playlist.category?.includes(categoryFilter.toLowerCase())));
    }

    if (data && categoryFilter && gradeFilter === undefined) {
      setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist.category?.includes(categoryFilter.toLowerCase())));
    }

    if (data && gradeFilter && categoryFilter === undefined) {
      setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.level && getWholeNumbers(playlist.level).includes(gradeFilter)));
    }
  }, [data, gradeFilter, categoryFilter])

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
  // const playlistRoutes = data?.allplaylists.result.slice(24).map((playlist: any) => {
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

  const updateURL = (grade: number | undefined, category?: string | undefined) => {
    if (grade && category === undefined) {
      navigate(`/plan/${grade}th-grade`);
    } else if (grade && category && category !== `undefined`) {
      navigate(`/plan/${grade}th-grade/${category.replaceAll(` `, `-`).toLowerCase()}`);
    } else if (category && category !== `undefined` && grade === undefined) {
      console.log("here")
      navigate(`/plan/${category.replaceAll(` `, `-`).toLowerCase()}`);
    } else if (category === `undefined`) {
      navigate(`/plans`);
    }
  };

  // Catalog Search Bar Feature
  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value)

    if (searchInput !== "") {
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

  const handleGradeFilterChange = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<number>) => {
    setGradeFilter(e.target.value === undefined ? undefined : Number(e.target.value));
    setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.level && getWholeNumbers(playlist.level).includes(Number(e.target.value))));
    if (categoryFilter) {
      setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.level && getWholeNumbers(playlist.level).includes(Number(e.target.value)) && playlist.category?.includes(categoryFilter.toLowerCase())));
    }
    updateURL(Number(e.target.value), categoryFilter ? categoryFilter : undefined);
  }

  const handleCategoryFilterChange = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    setCategoryFilter(e.target.value === "undefined" ? undefined : e.target.value);
    setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist.category?.includes(e.target.value.toLowerCase())));
    if (gradeFilter) {
      setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.level && getWholeNumbers(playlist.level).includes(gradeFilter) && playlist.category?.includes(e.target.value.toLowerCase())));
    }
    updateURL(gradeFilter ? gradeFilter : undefined, e.target.value);
  }

  const handleRemoveFilters = () => {
    setFilteredPlaylists([]);
    setGradeFilter(undefined);
    setCategoryFilter(undefined);
    navigate(`/plans`);
  }

  return (
    <Box>
      <Helmet>
        <title>{gradeFilter && categoryFilter
          ? `Free ${gradeFilter}th Grade ${categoryFilter} Lesson Plans | Plato's Peach`
          : gradeFilter ? `Free ${gradeFilter}th Grade Lesson Plans | Plato's Peach`
            : categoryFilter ? `Free ${categoryFilter} Lesson Plans | Plato's Peach`
              : `Free Lesson Plans & Templates | Plato's Peach`}</title>
        <meta name="description" content={`Discover interactive lesson plans including short videos, articles, PDFs, and assessments. Use the lesson plan as is or copy to your profile and modify for your classroom.`} />
      </Helmet>
      <Chip label="Lesson Plan Template Gallery" color="secondary" className="playlists--chip" size='medium' />
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
          {/* Mobile Filter Treatment - Dropdown Menus */}
          <Grid item xs={12} sm={12} md={12} lg={0} className="lessonPlans--dropdownFilter">
            <FormControl sx={{ width: "30%", marginRight: "0.5rem" }}>
              <InputLabel id="mobile-select-grade">Grade</InputLabel>
              <Select
                labelId="mobile-select-grade"
                id="mobile-simple-select"
                value={gradeFilter}
                label="Grade Level"
                onChange={(value) => handleGradeFilterChange(value)}
              >
                <MenuItem value={undefined}>
                  <em>All Grades</em>
                </MenuItem>
                <MenuItem value={4}>4th Grade</MenuItem>
                <MenuItem value={5}>5th Grade</MenuItem>
                <MenuItem value={6}>6th Grade</MenuItem>
                <MenuItem value={7}>7th Grade</MenuItem>
                <MenuItem value={8}>8th Grade</MenuItem>
                <MenuItem value={9}>9th Grade</MenuItem>
                <MenuItem value={10}>10th Grade</MenuItem>
                <MenuItem value={11}>11th Grade</MenuItem>
                <MenuItem value={12}>12th Grade</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "30%", marginRight: "0.5rem" }}>
              <InputLabel id="mobile-select-category">Category</InputLabel>
              <Select
                labelId="mobile-select-category"
                id="category-simple-select"
                value={categoryFilter ? categoryFilter : ""}
                label="Category"
                onChange={(value) => handleCategoryFilterChange(value)}
              >
                <MenuItem value="undefined">
                  <em>All Categories</em>
                </MenuItem>
                <MenuItem value="American History">American History</MenuItem>
                <MenuItem value="Military History">Military History</MenuItem>
                <MenuItem value="World History">World History</MenuItem>
                <MenuItem value="European History">European History</MenuItem>
                <MenuItem value="Holiday History">Holiday History</MenuItem>
                <MenuItem value="Biography">Biography</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
                <MenuItem value="World Religions">World Religions</MenuItem>
                <MenuItem value="Ancient History">Ancient History</MenuItem>
                <MenuItem value="African American History">African American History</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'capitalize' }}
              onClick={handleRemoveFilters}
            >Reset Filters</Button>
          </Grid>

          {/* Desktop Filter Treatment - Left Rail Radio Button Groups */}
          <Grid item xs={12} sm={12} md={12} lg={3} className="lessonPlans--filterRadio">
            <FormControl sx={{ marginLeft: "1rem" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2, textTransform: 'capitalize' }}
                onClick={handleRemoveFilters}
              >Reset Filters</Button>
              <FormLabel
                id="radio-buttons-grade-level"
                sx={{ color: 'black', fontWeight: 'bold' }}
              >Grade Level</FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-grade-level"
                name="radio-buttons-group"
                defaultValue={gradeFilter}
              >
                <FormControlLabel value={4} control={<Radio onChange={(e) => handleGradeFilterChange(e)} />} label="4th Grade" />
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
                defaultValue={categoryFilter}
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