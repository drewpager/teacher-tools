import { Box, CssBaseline, Container, Typography, Grid, Chip, SvgIcon, IconButton } from '@mui/material';
import { Viewer } from '../../../graphql/generated';
import { Copyright } from '@mui/icons-material';
import { ReactComponent as PlatosPeachIcon } from '../../assets/peach-logo.svg';
import { ReactComponent as PeachIcon } from '../../assets/peach-logo.svg';
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
        <Grid item xs={12} md={12} lg={12}>
          <Box className="footer--logo">
            <IconButton
              size="small"
              edge="start"
              color="primary"
              aria-label="home"
              className="navbar--icon"
              // sx={{ ml: 3 }}
              disableFocusRipple
              disableRipple
              href='/'
            >
              <PeachIcon className="navbar--icon" />
            </IconButton>
            <Typography variant="h1" className="footer--title">
              <Link to="/" style={{ color: `${theme.palette.info.dark}`, textDecoration: "none" }}>
                Plato's Peach
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="h5" className='footer--text'>
            Teacher Tools
          </Typography>
          <Link to="/lesson/create" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Create Lessons</Typography>
          </Link>
          <Link to="/quiz/create" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Create Assessments</Typography>
          </Link>
          <Link to="/article/create" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Create Article</Typography>
          </Link>
          <Link to="/playlist/create" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Create Lesson Plans</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="h5" className='footer--text'>
            Resources
          </Typography>
          <Link to="/catalog" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Lesson Catalog</Typography>
          </Link>
          <Link to="/plans" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Template Gallery</Typography>
          </Link>
          {viewer && viewer.id ? (<></>) : (
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography variant='body1' className='footer--link-text'>Free Signup</Typography>
            </Link>)}
          {viewer ? (<Link to={viewer && viewer.id ? `/user/${viewer.id}` : `/login`} style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>{viewer && viewer.id ? "Profile" : "Login"}</Typography>
          </Link>) : (<></>)}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="h5" className='footer--text'>
            Popular Categories
          </Typography>
          <Link to="/catalog#westward%20expansion" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Westward Expansion</Typography>
          </Link>
          <Link to="/catalog#world%20war%20two" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>World War II</Typography>
          </Link>
          <Link to="/catalog#biography" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Biography</Typography>
          </Link>
          <Link to="/catalog#civil%20rights%20movement" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Civil Rights Movement</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="h5" className='footer--text'>
            General
          </Typography>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>How It Works</Typography>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Contact Us</Typography>
          </Link>
          <Link to="/donate" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>Donate</Typography>
          </Link>
          {/* <Link to="/pricing#frequent-questions" style={{ textDecoration: "none" }}>
            <Typography variant='body1' className='footer--link-text'>FAQ</Typography>
          </Link> */}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Box className="subfooter--center">
            <Typography className='footer--text-center'>
              All Rights Reserved
              <Copyright fontSize='small' />
              Plato's Peach
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}