import React, { useState, ChangeEvent } from 'react';
import { Box, Grid, Pagination, ListItem, Tooltip, Typography, Button, Snackbar, Alert } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { LessonCard } from '../../../../lib/components';
import { User, Lesson } from '../../../../graphql/generated';
import { CatalogItem } from '../../../Catalog/catalogItem';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

interface Props {
  user: User | any;
  setBookmarksPage: (page: number) => void;
}

// type BookmarkLessonData = {
//   bookmarkLesson: Lesson;
// }

// type BookmarkLessonVariables = {
//   id: string;
//   viewer: string;
// }

export const UserBookmarks = ({ user, setBookmarksPage }: Props) => {
  let bookmarksPage = 1;
  const bookmarks = user.bookmarks;
  const totalCount = bookmarks.length;
  const limit = 3;
//   const [open, setOpen] = useState<boolean>(false);
//   const [bookmarkError, setBookmarkError] = useState<boolean>(false);
//   const [bookmarkStatus, setBookmarkStatus] = useState<string>('');

//   const BOOKMARK_LESSON = gql`
//     mutation BookmarkLesson($id: ID!, $viewer: String!) {
//       bookmarkLesson(id: $id, viewer: $viewer)
//     }
//   `;

// const [bookmarkLesson, { loading: BookmarkLessonLoading, error: BookmarkLessonError }] = useMutation<BookmarkLessonData, BookmarkLessonVariables>(BOOKMARK_LESSON);

// const onBookmark = async (id: string, viewer: string) => {
//   if (viewer === "null") {
//     setBookmarkError(true)
//     setOpen(true)
//   } else {
//     let res = await bookmarkLesson({
//       variables: {
//         id,
//         viewer
//       }
//     })
//     setBookmarkStatus(`${res.data?.bookmarkLesson}`)

//     res && setOpen(true)
//   }
// }

// const handleClose = () => {
//   setOpen(false)
//   setBookmarkError(false)
// }
  // const handleChange = (event: ChangeEvent<unknown>, page: number) => {
  //   setBookmarksPage(page)
  // }

  const userBookmarksList = (
    <Box sx={{ marginLeft: "2rem" }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item>
          <h2>{totalCount} Bookmarks</h2>
        </Grid>
        <Grid item>
          <Link to={`/catalog`}>
            <Tooltip title="Bookmark more content">
              <AddCircleIcon sx={{ color: "black" }} />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        {bookmarks.map((b: Lesson, index: number) => (
          <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
            <ListItem key={index}>
              <Box>
                <Typography variant="h3">{b.title}</Typography>
              </Box>
            </ListItem>
          </Grid>
        ))}
      </Grid>
      {/* <Pagination 
        // Take total number of playlists divided by number of playlists per page
        count={Math.ceil(totalCount/limit)} 
        page={bookmarksPage}
        onChange={handleChange}
      /> */}
      {/* <>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: 'center' }}
        >
          {bookmarkError || (user === "null") ?
            (
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Please sign up or login to bookmark!
              </Alert>
            ) :
            (
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {bookmarkStatus}
              </Alert>
            )}
        </Snackbar>
      </> */}
    </Box>
  );

  return (
    <>
      {userBookmarksList}
    </>
  )
}