import React, { useState } from 'react';
import { Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert, Tooltip, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Playlist, Lesson, Quiz, Questions, Quizzes, Content, Article } from '../../../graphql/generated';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { DisplaySuccess } from '../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../theme';

interface Props {
  article: {
    id: string;
    creator: string;
    content: Content;
    title: string;
  }
}

export const UserArticlesCard = ({ article }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const DELETE_ARTICLE = gql`
    mutation DeleteArticle($id: ID) {
      deleteArticle(id: $id)
    }
  `;

  interface DeleteArticleData {
    deleteArticle: Article
  }

  interface DeleteArticleVariables {
    id: string
  }

  const deleteArticleLoadingMessage = (
    <CircularProgress sx={{
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
    }} />
  );

  const deleteArticleErrorMessage = (
    <Alert variant="outlined" severity="error">
      Oops, something went wrong in the article deletion process!
    </Alert>
  );

  const handleDelete = async (id: string) => {
    const res = await deleteArticle({ variables: { id } })
    if (res) {
      // window.location.reload();
      return (<DisplaySuccess title="Deletion Successful!" />);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  // const navigation = useNavigate();
  const [deleteArticle, { loading: deleteArticleLoading, error: deleteArticleError }] = useMutation<DeleteArticleData, DeleteArticleVariables>(DELETE_ARTICLE);
  return (
    <Grid item lg={4} md={6} sm={12} xs={12} key={article.id}>
      <ListItem key={article.id}>
        <Card sx={{ width: "90vw" }}>
          <CardContent>
            <Link to={`/article/${article.id}`} style={{ textDecoration: "none" }}>
              <Typography variant='h4' style={{ color: "#000" }}>
                {article.title}
              </Typography>
            </Link>
            {deleteArticleLoading ? deleteArticleLoadingMessage : (
              <Tooltip title="Delete Article!">
                <IconButton sx={{ color: "#000" }}>
                  <DeleteIcon onClick={() => setOpen(true)} />
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      <Typography variant="h3">Are you sure you want to delete this article?</Typography>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => handleDelete(article.id)} autoFocus>
                        Delete Article
                      </Button>
                    </DialogActions>
                  </Dialog>
                </IconButton>
              </Tooltip>
            )}
            {deleteArticleError ? deleteArticleErrorMessage : null}
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}