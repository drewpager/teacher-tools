import { useState } from 'react';
import { useLogOutMutation } from '../../graphql/generated';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Avatar, Tooltip, Menu, MenuItem, SvgIcon } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Viewer } from '../../graphql/generated';
import { DisplaySuccess } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as PeachIcon } from '../../lib/assets/peach-logo.svg';
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
  
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const handleLogOut = () => {
    logOut();
  }

  const HomeIcon = () => {
    return (
      <SvgIcon component={PeachIcon} inheritViewBox sx={{ fontSize: 65 }} />
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
              <Link to="/" style={{ textDecoration: "none", color: "white", fontSize: 32, fontWeight: 800 }}>
                Plato's Peach
              </Link>
            </Typography>
          {viewer && viewer.avatar ? (
            <>
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
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={`/user/${viewer.id}`} style={{ textDecoration: "none", color: 'black' }}>
                    <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to={'/catalog'} style={{ textDecoration: 'none', color: 'black'}}>
                    <Typography textAlign="center">Catalog</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
          </>
          ): (
          <>
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
            <Link to={`/login`} style={{ textDecoration: "none" }}>
              <Button className="login--button">Login</Button>
            </Link>
          </>
        )}
        </Toolbar>
      </AppBar>
  );
};