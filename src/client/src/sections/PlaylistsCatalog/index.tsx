import React, { useState, useRef, ChangeEvent, useMemo, useEffect } from 'react';
import { Box, Grid, TextField, InputAdornment, Pagination, Chip } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Playlist, Viewer, useAllPlaylistsQuery } from '../../graphql/generated';
import { PublicPlaylistCard } from '../../lib/components/PublicPlaylistCard';
import { Footer } from '../../lib/components';
import { PlaylistsSkeleton } from './playlistsSkeleton';
import './playlistsCatalogStyle.scss';

type Props = {
  viewer: Viewer
}

export const PlaylistsCatalog = ({ viewer }: Props) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchError, setSearchError] = useState<boolean>(false);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);
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

  return (
    <Box>
      <Chip label="Lesson Plan Template Gallery" color="secondary" className="playlists--chip" size='medium' />
      <Box className="playlists--header">
        <h1>Lesson Plans</h1>
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
      </Box>
      <Box>
        <Grid container>
          {/* {data.allplaylists.result.map((playlist) => (
            (playlist.public || playlist.public === null) && 
              <PublicPlaylistCard {...playlist} viewer={viewer} />
            ))} */}
          {filteredPlaylists.length ? filteredPlaylists.map((playlist) => (
            (playlist.public || playlist.public === null) &&
            <PublicPlaylistCard {...playlist} viewer={viewer} />
          )) : data.allplaylists.result.map((playlist) => (
            (playlist.public || playlist.public === null) &&
            <PublicPlaylistCard {...playlist} viewer={viewer} />
          ))}
        </Grid>
      </Box>
      <Footer viewer={viewer} />
    </Box>
  );
}