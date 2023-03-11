import React, { useState, ChangeEvent } from 'react';
import { Box, Grid, Pagination, ListItem } from '@mui/material';
import { LessonCard } from '../../../../lib/components';
import { User } from '../../../../graphql/generated';
import { CatalogItem } from '../../../Catalog/catalogItem';

interface Props {
  user: User | any;
  setBookmarksPage: (page: number) => void;
}

export const UserBookmarks = ({ user, setBookmarksPage }: Props) => {
  let bookmarksPage = 1;
  const bookmarks = user.bookmarks;
  const totalCount = bookmarks.length;
  const limit = 3;

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setBookmarksPage(bookmarksPage + 1)
  }

  const userBookmarksList = (
    <Box sx={{ marginLeft: "2rem" }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item>
          <h2>{totalCount} Bookmarks</h2>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      {userBookmarksList}
    </>
  )
}