import { useState } from 'react';
import { useLogOutMutation } from '../../graphql/generated';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Avatar, Tooltip, Menu, MenuItem, SvgIcon, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Viewer } from '../../graphql/generated';
import { DisplaySuccess } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as PeachIcon } from '../../lib/assets/peach-logo.svg';
// import { ReactComponent as PlatosPeachIcon } from '../../lib/assets/platos-peach-logo.svg';
import { ReactComponent as PlatosPeachIcon } from '../../lib/assets/peach-logo.svg';
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
  }

  const handleUserAction = () => {
    console.log("Add button clicked!")
  }

  const HomeIcon = () => {
    return (
      <Link to="/">
        {/* <SvgIcon component={PlatosPeachIcon} inheritViewBox sx={{ fontSize: 65, color: `${theme.palette.primary.light}`, justifySelf: "center" }} /> */}
      </Link>
    );
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
          // sx={{ ml: 3 }}
          disableFocusRipple
          disableRipple
        >
          <PeachIcon className="navbar--icon" />
        </IconButton>
        <Typography variant="h1" className="nav--title">
          <Link to="/" style={{ color: `${theme.palette.info.dark}`, textDecoration: "none" }}>
            Plato's Peach
          </Link>
        </Typography>
        {viewer && viewer.avatar ? (
          <Box>
            <Box className="desktop--loggedIn-items">
              <Link to={`/catalog`} style={{ textDecoration: "none" }}>
                <p style={{ color: `${theme.palette.info.dark}` }}>Catalog</p>
              </Link>
              {/* <Tooltip title="Create Content!">
                <IconButton
                  onClick={handleOpenActionMenu}
                  disableFocusRipple
                  disableRipple
                >
                  <AddCircleIcon className="nav--user-actions" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '30px' }}
                id="action-appbar"
                anchorEl={anchorElAction}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElAction)}
                onClose={handleCloseActionMenu}
                className="header--menu"
              >
                <MenuItem onClick={handleCloseActionMenu} className="dropdown--buttons">
                  <Link to={`/lesson/create`} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Create Lesson</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseActionMenu} className="dropdown--buttons">
                  <Link to={`/quiz/create`} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Create Asessment</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseActionMenu} className="dropdown--buttons">
                  <Link to={`/playlist/create`} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Create Lesson Plan</Typography>
                  </Link>
                </MenuItem>
              </Menu> */}
              <Tooltip title="Click For User Options">
                <IconButton
                  onClick={handleOpenUserMenu} sx={{ p: 1 }}
                  disableFocusRipple
                  disableRipple
                >
                  <Avatar alt="logged in user avatar" src={viewer.avatar} />
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
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className="header--menu"
              >
                <Link to={`/user/${viewer.id}`} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseUserMenu} className="dropdown--buttons">
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/catalog`} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseUserMenu} className="dropdown--buttons">
                    <Typography textAlign="center">Catalog</Typography>
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogOut} className="dropdown--buttons">
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
            {/* Mobile Responsive Icon Menu */}
            <Box className='navbar--icon'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="mobile-menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className="mobile--menu"
              >
                <Link to={`/user/${viewer.id}`} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseUserMenu} className="dropdown--buttons">
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/catalog`} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseUserMenu} className="dropdown--buttons">
                    <Typography textAlign="center">Catalog</Typography>
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogOut} className="dropdown--buttons">
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseActionMenu} className="dropdown--buttons">
                  <Link to={`/lesson/create`} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Create Lesson</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseActionMenu} className="dropdown--buttons">
                  <Link to={`/quiz/create`} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Create Asessment</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseActionMenu} className="dropdown--buttons">
                  <Link to={`/playlist/create`} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Create Lesson Plan</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        ) : (
          <>
            <Box className='navburger--icon'>
              <Link to={`/login`} style={{ textDecoration: "none" }}>
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
                sx={{ mt: '30px' }}
                id="mobile-menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className="mobile--menu"
              >
                <Link to={`/login`} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseUserMenu} className="dropdown--buttons">
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/catalog`} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseUserMenu} className="dropdown--buttons">
                    <Typography textAlign="center">Catalog</Typography>
                  </MenuItem>
                </Link>
                <Link to={`/login`} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseUserMenu} className="dropdown--buttons">
                    <Typography textAlign="center">Sign Up</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            <Box className="desktop--menu-items">
              <div className="desktop--mid-menu-items">
                <Link to={`/catalog`} style={{ textDecoration: "none", marginRight: 32 }}>
                  <p style={{ color: `${theme.palette.info.dark}` }}>Teacher Tools</p>
                </Link>
                <Link to={`/catalog`} style={{ textDecoration: "none", marginRight: 32 }}>
                  <p style={{ color: `${theme.palette.info.dark}` }}>Video Catalog</p>
                </Link>
                <Link to={`/pricing`} style={{ textDecoration: "none", marginRight: 32 }}>
                  <p style={{ color: `${theme.palette.info.dark}` }}>Pricing</p>
                </Link>
                <Link to={`/`} style={{ textDecoration: "none", marginRight: 110 }}>
                  <p style={{ color: `${theme.palette.info.dark}` }}>Contact Us</p>
                </Link>
              </div>
              <Link to={`/login`} style={{ textDecoration: "none" }}>
                <Button className="login--button">Login</Button>
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
              <Link to={`/login`} style={{ textDecoration: "none" }}>
                <Button className="getStarted--button">Get Started for Free</Button>
              </Link>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};