import { useState } from 'react';
import { useLogOutMutation } from '../../graphql/generated';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Avatar, Tooltip, Menu, MenuItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Viewer } from '../../graphql/generated';
import { DisplaySuccess } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as PeachIcon } from '../../lib/assets/peach-logo.svg';
import theme from '../../theme';
import './appHeader.scss';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: Props) => {
  let navigate = useNavigate();
  const [logOut] = useLogOutMutation({
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem("token")
        navigate("/login");
        return (<DisplaySuccess title="You've Successfully logged out!" />);
      }
    }
  });

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElAction, setAnchorElAction] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleOpenActionMenu = (event: any) => {
    setAnchorElAction(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const handleCloseActionMenu = () => {
    setAnchorElAction(null);
  }

  const handleLogOut = () => {
    logOut();
    setAnchorElUser(null);
  }

  return (
    <AppBar className='NavBar-container'>
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="primary"
          aria-label="home"
          className="navbar--icon"
          sx={{ ml: 1 }}
          disableFocusRipple
          disableRipple
          href='/'
        >
          <PeachIcon className="navbar--icon" />
        </IconButton>
        <Typography variant="body1" className="nav--title">
          <Link to="/" style={{ color: `${theme.palette.info.dark}`, textDecoration: "none" }}>
            Plato's Peach
          </Link>
        </Typography>
        {viewer && viewer.avatar ? (
          <Box>
            <Box className="desktop--loggedIn-items">
              <Button
                variant="outlined"
                className="catalog--button"
                // href="/catalog"
                onClick={handleOpenNavMenu}
                disableRipple
                disableFocusRipple
              >
                Catalog
              </Button>
              <Menu
                sx={{ mt: '50px' }}
                id="action-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                // keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                className="header--menu"
              >
                <MenuItem className="dropdown--buttons" onClick={() => setAnchorElNav(null)} disableRipple disableTouchRipple>
                  <Link to={`/catalog`} style={{ textDecoration: 'none', color: "#000" }}>
                    <Typography textAlign="center">Lesson Catalog</Typography>
                  </Link>
                </MenuItem>
                <MenuItem className="dropdown--buttons" onClick={() => setAnchorElNav(null)} disableRipple disableTouchRipple>
                  <Link to={`/plans`} style={{ textDecoration: 'none', color: "#000" }} onTransitionEnd={handleCloseNavMenu}>
                    <Typography textAlign="center">Lesson Plan Catalog</Typography>
                  </Link>
                </MenuItem>
                <MenuItem className="dropdown--buttons" onClick={() => setAnchorElNav(null)} disableRipple disableTouchRipple>
                  <Link to={`/blog`} style={{ textDecoration: 'none', color: "#000" }} onTransitionEnd={handleCloseNavMenu}>
                    <Typography textAlign="center">Blog</Typography>
                  </Link>
                </MenuItem>
              </Menu>
              <Tooltip title="Create Content!">
                <Button
                  variant='outlined'
                  className="catalog--button"
                  onClick={handleOpenActionMenu}
                  disableRipple
                  disableFocusRipple
                >
                  Create
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: '50px' }}
                id="action-appbar"
                anchorEl={anchorElAction}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                // keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElAction)}
                onClose={handleCloseActionMenu}
                className="header--menu"
              >
                <MenuItem onClick={() => setAnchorElAction(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Link to={`/lesson/create`} style={{ textDecoration: 'none', color: "#000" }}>
                    <Typography textAlign="center">Create Lesson</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorElAction(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Link to={`/quiz/create`} style={{ textDecoration: 'none', color: "#000" }}>
                    <Typography textAlign="center">Create Assessment</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorElAction(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Link to={`/article/create`} style={{ textDecoration: 'none', color: "#000" }}>
                    <Typography textAlign="center">Create Article</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorElAction(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Link to={`/playlist/create`} style={{ textDecoration: 'none', color: "#000" }}>
                    <Typography textAlign="center">Create Lesson Plan</Typography>
                  </Link>
                </MenuItem>
              </Menu>
              <Tooltip title="Click For User Options">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 1 }}
                  disableFocusRipple
                  disableRipple
                >
                  <Avatar alt="logged in user avatar" src={viewer.avatar} sx={{ border: `1px solid #000` }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                // keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className="header--menu"
              >
                <Link to={`/user/${viewer.id}`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/donate/`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Donate</Typography>
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogOut} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
            {/* Mobile Responsive Icon Menu */}
            <Box className='navburger--icon'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {viewer ? <Avatar alt="logged in user avatar" src={viewer.avatar} sx={{ border: `1px solid #000` }} /> : <MenuIcon />}
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="mobile-menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                // keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className="mobile--menu"
              >
                <Link to={`/user/${viewer.id}`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/catalog`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Lesson Catalog</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/plans`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Lesson Plan Catalog</Typography>
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogOut} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Link to={`/lesson/create`} style={{ textDecoration: 'none', color: "#000" }}>
                    <Typography textAlign="center">Create Lesson</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Link to={`/quiz/create`} style={{ textDecoration: 'none', color: "#000" }}>
                    <Typography textAlign="center">Create Assessment</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Link to={`/article/create`} style={{ textDecoration: 'none', color: "#000" }}>
                    <Typography textAlign="center">Create Article</Typography>
                  </Link>
                </MenuItem>

                <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                  <Link to={`/playlist/create`} style={{ textDecoration: 'none', color: "#000" }}>
                    <Typography textAlign="center">Create Lesson Plan</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        ) : (
          <>
            <Box className='navburger--icon'>
              <Link to={`/signup`} style={{ textDecoration: "none" }}>
                <Button className="mobileStarted--button">Get Started</Button>
              </Link>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                disableFocusRipple
                disableRipple
              >
                <MenuIcon sx={{ color: `${theme.palette.info.dark}` }} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="mobile-menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                // keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className="mobile--menu"
              >
                <Link to={`/signup`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Sign Up</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/login`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/catalog`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Lesson Catalog</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/plans`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Lesson Plan Catalog</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/blog`} style={{ textDecoration: 'none', color: "#000" }}>
                  <MenuItem onClick={() => setAnchorElUser(null)} className="dropdown--buttons" disableRipple disableTouchRipple>
                    <Typography textAlign="center">Blog</Typography>
                  </MenuItem>
                </Link>

              </Menu>
            </Box>
            <Box className="desktop--menu-items">
              <div className="desktop--mid-menu-items">
                <Link to={`/plans`} style={{ textDecoration: "none", marginRight: 32 }}>
                  <p style={{ color: `${theme.palette.info.dark}` }}>Lesson Plan Templates</p>
                </Link>
                <Link to={`/donate`} style={{ textDecoration: "none", marginRight: 32 }}>
                  <p style={{ color: `${theme.palette.info.dark}` }}>Donate</p>
                </Link>
                <Link to={`/contact`} style={{ textDecoration: "none", marginRight: 32 }}>
                  <p style={{ color: `${theme.palette.info.dark}` }}>Contact</p>
                </Link>
                <Link to={`/blog`} style={{ textDecoration: "none", marginRight: 110 }}>
                  <p style={{ color: `${theme.palette.info.dark}` }}>Blog</p>
                </Link>
              </div>
              {/* <Button disableFocusRipple disableRipple variant="outlined" className="catalog--button" href="/catalog">
                Video Catalog
              </Button> */}
              <Box>
                <Button
                  variant="outlined"
                  className="catalog--button"
                  // href="/catalog"
                  onClick={handleOpenNavMenu}
                  disableRipple
                  disableFocusRipple
                >
                  Catalog
                </Button>
                <Menu
                  sx={{ mt: '50px' }}
                  id="action-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  // keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  className="header--menu"
                >
                  <MenuItem className="dropdown--buttons" onClick={() => setAnchorElNav(null)} disableRipple disableTouchRipple>
                    <Link to={`/catalog`} style={{ textDecoration: 'none', color: "#000" }}>
                      <Typography textAlign="center">Lesson Catalog</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem className="dropdown--buttons" onClick={() => setAnchorElNav(null)} disableRipple disableTouchRipple>
                    <Link to={`/plans`} style={{ textDecoration: 'none', color: "#000" }} onTransitionEnd={handleCloseNavMenu}>
                      <Typography textAlign="center">Lesson Plan Catalog</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem className="dropdown--buttons" onClick={() => setAnchorElNav(null)} disableRipple disableTouchRipple>
                    <Link to={`/blog`} style={{ textDecoration: 'none', color: "#000" }} onTransitionEnd={handleCloseNavMenu}>
                      <Typography textAlign="center">Blog</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
              <Link to={`/login`} style={{ textDecoration: "none" }}>
                <Button disableFocusRipple disableRipple className="login--button">Login</Button>
              </Link>
              {/* <Tooltip title="Account Login">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip> */}
              <Link to={`/signup`} style={{ textDecoration: "none" }}>
                <Button disableFocusRipple disableRipple className="getStarted--button">Get Started for Free</Button>
              </Link>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};