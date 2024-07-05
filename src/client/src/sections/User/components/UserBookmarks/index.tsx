import React, { useState } from 'react';
import { Box, Grid, ListItem, Tooltip, Typography, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { User, Lesson, useDeleteAllBookmarksMutation } from '../../../../graphql/generated';
import { Link } from 'react-router-dom';
import { Cancel } from '@mui/icons-material';
import "./userBookmarks.scss";

interface Props {
  user: User | any;
  setBookmarksPage: (page: number) => void;
}

export const UserBookmarks = ({ user, setBookmarksPage }: Props) => {
  // let bookmarksPage = 1;
  const bookmarks = user.bookmarks;
  const totalCount = bookmarks.length;
  // const limit = 3;
  const [open, setOpen] = useState<boolean>(false);

  const [deleteBookmarks] = useDeleteAllBookmarksMutation({
    variables: {
      id: user.id
    }
  })

  const handleRemoveAllBookmarks = () => {
    deleteBookmarks(user.id);
    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const userBookmarksList = (
    <Box className="user--bookmarks">
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
        {totalCount !== 0 && (
          <Grid item>
            <Tooltip title="Remove all bookmarks">
              <Cancel sx={{ color: "#BC4710", cursor: 'pointer' }} onClick={() => setOpen(true)} />
            </Tooltip>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <Typography variant="h3">Are you sure you want to remove all bookmarks?</Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This action cannot be undone and you will need to re-bookmark all desired content.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleRemoveAllBookmarks} autoFocus>
                  Remove All Bookmarks
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        )}
      </Grid>
      <Grid container>
        {totalCount === 0 && (
          <Box className="user-bookmark--how-to">
            <Typography variant='h3' sx={{ color: '#000', fontWeight: "bold" }}>How to Get Started With Bookmarks:</Typography>
            <Link to={`/catalog`} style={{ justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
              <BookmarkAddIcon sx={{ color: "black", marginRight: '0.25rem' }} />
              <Typography variant='h3' sx={{ textDecoration: 'underline', color: '#000', marginBottom: '0.5rem' }}>Navigate Catalog and Bookmark Desired Content</Typography>
            </Link>
          </Box>
        )}
        {bookmarks.map((b: Lesson, index: number) => (
          <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
            <ListItem key={index}>
              <Box>
                {/* <Link to={`/lesson/${b.id}`} style={{ color: "#000" }}> */}
                <Link to={`/lesson/${b.title?.toLowerCase().replaceAll(/-/g, "_").replaceAll(/ /g, "-")}`} style={{ color: "#000" }}>
                  <Typography variant="h3">{b.title}</Typography>
                </Link>
              </Box>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <>
      {userBookmarksList}
    </>
  )
}