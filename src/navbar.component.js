import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import { Scoped } from 'kremling';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {signOut} from './firebase/auth.js';

const classes = {};
const isMenuOpen = false;

export default function Navbar({user}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Scoped css={css}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Open drawer">
          <MenuIcon />
        </IconButton>
        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          noWrap>
          Remote Observer
        </Typography>
        <div className="grow" />
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            {(user && user.photoURL) ? <img className="profile-photo" src={user.photoURL} alt="User profile" /> : <AccountCircle /> }
          </IconButton>
          <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-haspopup="true"
            onClick={() => {}}
            color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    </Scoped>
  );
}

const css = `
  & .grow {
    flex: 1;
  }
  & .profile-photo {
    border-radius: 10px;
    width: 20px;
  }
`;
