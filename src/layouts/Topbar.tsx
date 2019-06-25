import * as React from 'react';
import {signOut} from '@fruver/react-firebase';
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {makeStyles, createStyles, fade, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

// FontAwesome Icons
import {
  faBell as farBell,
  faSearch as farSearch,
  faSignOut as farSignOut
} from '@fortawesome/pro-regular-svg-icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
  })
);

interface TopbarProps {
  className: string;
  title: string;
}

const Topbar = ({
  className,
  title,
  ...otherProps
}: TopbarProps) => {
  const classes = useStyles();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <AppBar
      position="absolute"
      className={className}
      {...otherProps}
    >
      <Toolbar>
        <Typography
          className={classes.title}
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
        >
          {title}
        </Typography>

        {/* Add Icons Actions top bar */}
        {/* Search, Notification, Logout */}

        {/* Search Bar */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Icon icon={farSearch} />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>

        {/* Notification */}
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Icon icon={farBell} />
          </Badge>
        </IconButton>

        {/* Signout */}
        <IconButton color="inherit" onClick={handleSignOut}>
          <Icon icon={farSignOut} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;