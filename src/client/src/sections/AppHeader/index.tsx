import { useState } from 'react';
import { useLogOutMutation } from '../../graphql/generated';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Avatar, Tooltip, Menu, MenuItem, SvgIcon } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Viewer } from '../../graphql/generated';
import { DisplaySuccess } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as PeachIcon } from '../../lib/assets/peach-logo.svg';
// import { ReactComponent as PlatosPeachIcon } from '../../lib/assets/platos-peach-logo.svg';
import { ReactComponent as PlatosPeachIcon } from '../../lib/assets/peach-logo.svg';
import theme from '../../theme';
import zIndex from '@mui/material/styles/zIndex';
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
    <AppBar>
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="info"
          aria-label="home"
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h1" className="nav--title">
          <Link to="/" style={{ color: `${theme.palette.info.light}`, textDecoration: "none", fontSize: 32, fontWeight: 800 }}>
            Plato's Peach
          </Link>
        </Typography>
        {viewer && viewer.avatar ? (
          <>
            <Link to={`/catalog`} style={{ textDecoration: "none" }}>
              <p style={{ color: `${theme.palette.info.light}` }}>Catalog</p>
            </Link>
            <Tooltip title="User Actions">
              <IconButton onClick={handleOpenActionMenu}>
                <AddCircleIcon className="nav--user-actions" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
              <Link to={`/lesson/create`} style={{ textDecoration: 'none' }}>
                <MenuItem onClick={handleCloseActionMenu} className="dropdown--buttons">
                  <Typography textAlign="center">Create Lesson</Typography>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleCloseActionMenu} className="dropdown--buttons">
                <Link to={'/quiz/create'} style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">Create Asessment</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseActionMenu} className="dropdown--buttons">
                <Link to={'/playlist/create'} style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">Create Lesson Plan</Typography>
                </Link>
              </MenuItem>
            </Menu>
            <Tooltip title="User Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
          </>
        ) : (
          <>
            <Link to={`/catalog`} style={{ textDecoration: "none" }}>
              <p style={{ color: `${theme.palette.info.light}` }}>Catalog</p>
            </Link>
            <Link to={`/login`} style={{ textDecoration: "none", color: "white" }}>
              <Tooltip title="Account Login">
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
              </Tooltip>
              <Button className="login--button">Start free</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};