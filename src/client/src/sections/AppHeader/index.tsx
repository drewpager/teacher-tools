import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOG_OUT } from '../../lib/graphql/mutations/LogOut';
import { LogOut as LogOutData } from '../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Avatar, Tooltip, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Viewer } from '../../lib/types';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Teacher Tools
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
                  <Typography textAlign="center">Profile</Typography>
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
            <Button color="inherit">Login</Button>
          </>
        )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};