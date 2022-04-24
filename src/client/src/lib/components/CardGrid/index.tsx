import React, { ReactEventHandler, useState } from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { useAllPlaylistsQuery } from '../../../graphql/generated';
import { LinearProgress, Box } from '@mui/material';
import { DisplayError } from '../../../lib/utils/alerts/displayError';
import { CardGridSkeleton } from '../CardGridSkeleton';

import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  expand: boolean;
  onClick: ReactEventHandler;
}

const ExpandMore = styled((props: Props) => {
  const { expand, ...more } = props;
  return <IconButton {...more} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));  

export const CardGrid = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { data, loading, error } = useAllPlaylistsQuery({
    variables: {
      limit: 10,
      page: 1
    }
  });

  if (loading) {
    return (
      <>
        <LinearProgress color='success'/>
        <CardGridSkeleton />
      </>
    )
  }

  if (error) {
    return (
      <DisplayError title="Failed to load playlists" />
    )
  }

  const playlists = data ? data.allplaylists : null;

  return (
    <Box>
      <Grid container>
        {playlists?.result.map((i, index) => (
          <Grid item spacing={4} lg={4} md={6} sm={12} xs={12}>
            <Card key={index} sx={{ margin: 1}}>
            <CardContent>
              <Typography variant="h3" color="text.secondary">
                {i.name}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {i.plan.map((j, ind) => (
                  <ul>
                    <li key={ind}><Typography paragraph>{j?.title}</Typography></li>
                  </ul>
                ))}
              </CardContent>
            </Collapse>
        </Card>
        </Grid>
        ))}
      </Grid>
    </Box>
  )
}