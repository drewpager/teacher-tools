import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Chip, CircularProgress, Alert, Snackbar, Tooltip } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Link } from 'react-router-dom';
import { Lesson } from '../../graphql/generated';
import { titleCase } from '../../lib/utils';
import { UseVideoModal } from '../../lib/components/VideoModal';
import "./catalog.scss";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

type props = {
  name: string;
  category: Lesson[];
  viewer: string;
  bookmarks: string[] | undefined;
}

type BookmarkLessonData = {
  bookmarkLesson: Lesson;
}

type BookmarkLessonVariables = {
  id: string;
  viewer: string;
}

export const CatalogList = ({ name, category, viewer, bookmarks }: props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [bookmarkError, setBookmarkError] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<any[]>([]);
  const [bookmarkStatus, setBookmarkStatus] = useState<string>('');

  useEffect(() => {
    setBookmarked(bookmarks ? bookmarks : [])
  }, [bookmarked, bookmarks])

  const handleClose = () => {
    setOpen(false)
    setBookmarkError(false)
  }

  const BOOKMARK_LESSON = gql`
    mutation BookmarkLesson($id: ID!, $viewer: String!) {
      bookmarkLesson(id: $id, viewer: $viewer)
    }
  `;

  const [bookmarkLesson, { loading: BookmarkLessonLoading, error: BookmarkLessonError }] = useMutation<BookmarkLessonData, BookmarkLessonVariables>(BOOKMARK_LESSON);

  const onBookmark = async (id: string, viewer: string) => {
    if (viewer === "null") {
      setBookmarkError(true)
      setOpen(true)
    } else {
      let res = await bookmarkLesson({
        variables: {
          id,
          viewer
        }
      })
      setBookmarkStatus(`${res.data?.bookmarkLesson}`)
      setBookmarked([...bookmarked, `${id}`])
      res && setOpen(true)
    }
  }

  BookmarkLessonLoading && (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
    }} />
  )

  BookmarkLessonError && (
    <Alert variant="outlined" severity="error">
      Oops, something went wrong in the bookmarking process!
    </Alert>
  );
  return (
    <Box className="category--box">
      {
        category.length > 0 &&
        <h2 className='category--h2'>{titleCase(name)} <Chip label={category.length} color="primary" size="medium" /></h2>
      }
      {category.map((lesson, index) => (
        <Box className="category--list-box" key={index}>
          {/* <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: "none", color: "#fff" }}> */}
          <Link to={`/lesson/${lesson.title?.toLowerCase().replaceAll(/-/g, "_").replaceAll(/ /g, "-")}`} style={{ textDecoration: "none", color: "#fff" }}>
            <Typography variant="h4" className="category--list-title">{lesson.title}</Typography>
          </Link>
          <Tooltip title="View video" placement="top">
            <IconButton
              className="list-play--button"
              aria-label="play/pause"
              sx={{ color: "#FAF9F6" }}
              disableRipple
              disableFocusRipple
            >
              <UseVideoModal video={`${lesson.video}`} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bookmark for lesson plan" placement="top">
            <IconButton
              className="list-bookmark--button"
              aria-label="bookmark"
              sx={{ color: "#FAF9F6" }}
              disableRipple
              disableFocusRipple
              onClick={() => onBookmark(`${lesson.id}`, viewer)}
            >
              <BookmarkAddIcon color={bookmarked[0]?.includes(`${lesson.id}`) ? "success" : "inherit"} />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
      <>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: 'center' }}
        >
          {/* If not logged in, throw error/prompt when bookmark button clicked, otherwise bookmark successfully */}
          {bookmarkError || (viewer === "null") ?
            (
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} variant="filled">
                Please <Link to="/signup" style={{ color: "#FFF" }}>sign up</Link> or <Link to="/login" style={{ color: "#FFF" }}>login</Link> to bookmark!
              </Alert>
            ) :
            (
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} variant="filled">
                {titleCase(`${bookmarkStatus}!`)}
              </Alert>
            )}
        </Snackbar>
      </>
    </Box>
  )
}