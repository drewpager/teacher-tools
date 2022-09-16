import React, { ReactEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Playlist } from '../../../graphql/generated';

import './playlistdetails.scss';

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

export const PlaylistDetails = (playlist: Playlist) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Card>
        <CardContent>
            <Link to={`/playlist/${playlist.id}`}>
            <Typography className='card--title' variant="h3" color="text.secondary">
                {playlist.name}
            </Typography>
            </Link>
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
                <ul>
                    {playlist.plan.map((j) => (
                        <li key={j?.id}><Typography paragraph>{j?.title}</Typography></li>
                    ))}
                </ul>
            </CardContent>
        </Collapse>
    </Card>
  </>
  )
}