import React, { useState } from 'react';
import { Card, CardContent, ListItem, Typography, Grid, Button, CircularProgress, Alert, Tooltip, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Playlist, Lesson, Quiz, Questions, Quizzes, Content } from '../../../graphql/generated';
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
          </CardContent>
        </Card>
      </ListItem>
    </Grid>
  )
}