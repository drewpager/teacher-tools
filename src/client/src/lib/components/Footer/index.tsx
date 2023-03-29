import { Box, CssBaseline, Container, Typography, Grid, Chip, SvgIcon } from '@mui/material';
import { Viewer } from '../../../graphql/generated';
import { Copyright } from '@mui/icons-material';
import { ReactComponent as PlatosPeachIcon } from '../../assets/peach-logo.svg';
import theme from '../../../theme';
import './footer.scss';
import { Link } from 'react-router-dom';

type Props = {
  viewer?: Viewer
}

export const Footer = ({ viewer }: Props) => {
  return (
    <Box
      component="footer"
      className="footer--box"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h5" className='footer--text'>
            Teacher Tools
          </Typography>
          <Link to="/lesson/create" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Create Lesson</Typography>
          </Link>
          <Link to="/quiz/create" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Create Assessment</Typography>
          </Link>
          <Link to="/playlist/create" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Create Lesson Plan</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h5" className='footer--text'>
            Resources
          </Typography>
          <Link to="/catalog" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Lesson Catalog</Typography>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Playlist Search <Chip label="Coming Soon!" size="small" sx={{ textDecoration: "none", backgroundColor: "#dda15e" }} /></Typography>
          </Link>
          {viewer ? (<Link to={viewer && viewer.id ? `/user/${viewer.id}` : `/login`} style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>{viewer && viewer.id ? "Profile" : "Login"}</Typography>
          </Link>) : (<></>)}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h5" className='footer--text'>
            Categories
          </Typography>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>World War II <Chip label="Coming Soon!" size="small" sx={{ textDecoration: "none", backgroundColor: "#dda15e" }} /></Typography>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>American History <Chip label="Coming Soon!" size="small" sx={{ textDecoration: "none", backgroundColor: "#dda15e" }} /></Typography>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>World History <Chip label="Coming Soon!" size="small" sx={{ textDecoration: "none", backgroundColor: "#dda15e" }} /></Typography>
          </Link>
        </Grid>
      </Grid>
      <Box className="footer--icon-center">
        <SvgIcon component={PlatosPeachIcon} inheritViewBox sx={{ fontSize: 150, color: `${theme.palette.primary.light}` }} />
        <Typography className='footer--text-center'>
          Plato's Peach
          <Copyright fontSize='small' />
        </Typography>
      </Box>
    </Box>
  )
}