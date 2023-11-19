import React, { useState, useRef, ChangeEvent, useMemo, useEffect } from 'react';
import { Box, Grid, TextField, InputAdornment, Pagination, Chip, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Article, Viewer, useAllArticlesQuery } from '../../graphql/generated';
import { PublicPlaylistCard } from '../../lib/components/PublicPlaylistCard';
import { Footer } from '../../lib/components';
import { Link } from 'react-router-dom';
import { ArticlesSkeleton } from './articlesSkeleton';
import './articlesCatalogStyle.scss';

type Props = {
  viewer: Viewer
}

export const ArticlesCatalog = ({ viewer }: Props) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchError, setSearchError] = useState<boolean>(false);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, loading, error } = useAllArticlesQuery({
    variables: {
      limit: 1000,
      page: 1,
    }
  });

  if (loading) {
    return (<ArticlesSkeleton />);
  }

  if (error) {
    return <Box sx={{ marginTop: 15 }}><div>Error: {error.message}</div></Box>;
  }

  if (!data) {
    return <div>No data</div>;
  }
  // FOR SITEMAP GENERATION
  // const articleRoutes = data?.allarticles.result.map((article: any) => {
  //   if (article.public === true) {
  //     return {
  //       url: `/article/${article.id}`,
  //       changefreq: "monthly",
  //       priority: 0.9,
  //     };
  //   } else {
  //     return null;
  //   }
  // });

  // console.log(articleRoutes.filter((route) => route !== null))

  const resetSearch = () => {
    setSearchInput("");
    setFilteredArticles([]);
    setSearchError(false);
  }

  // Catalog Search Bar Feature
  const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value)

    if (searchInput !== "") {
      // setFilteredPlaylists(data?.allplaylists.result.filter((playlist) => playlist?.plan?.find((lesson) => lesson?.title?.toLowerCase().includes(searchInput.toLowerCase()))));
      setFilteredArticles(data?.allarticles.result.filter((article) => article?.title?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1))
      setSearchError(false);
    }

    if (searchInput !== "" && !filteredArticles.length) {
      setSearchError(true);
    }

    if (e.target.value === '') {
      setFilteredArticles([]);
      setSearchError(false);
    }
  }

  return (
    <Box>
      <Chip label="Article + PDF Catalog" color="secondary" className="articles--chip" size='medium' />
      <Box className="articles--header">
        <h1>Articles</h1>
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
          {filteredArticles.length ? filteredArticles.map((article) => (
            (article.public || article.public === null) &&
            // TODO: Create Article Display Card
            <ul>
              <li>{article.title}</li>
            </ul>
          )) : data.allarticles.result.map((article) => (
            (article.public || article.public === null) &&
            // TODO: Create Article Display Card
            <Link to={`/article/${article.id}`} style={{ textDecoration: "none" }}>
              <Chip
                label={`${article.title}`}
                color="secondary"
                className="article--chip"
                size='medium'
                style={{ marginRight: "1rem", marginBottom: "0.5rem" }}
              />
            </Link>
          ))}
        </Grid>
      </Box>
      <Footer viewer={viewer} />
    </Box>
  );
}