import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/pro-duotone-svg-icons';
import {faSearch} from '@fortawesome/pro-duotone-svg-icons'
import {faSignOut} from '@fortawesome/pro-duotone-svg-icons';

import {makeStyles, createStyles, fade} from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIInputBase from '@material-ui/core/InputBase';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUITypography from '@material-ui/core/Typography';
import MUIIconButton from '@material-ui/core/IconButton';
import MUIBadge from '@material-ui/core/Badge';

import {logout} from '../redux/actions/authenticate';

const useStyles = makeStyles((theme) =>
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

const Topbar = ({title, className, ...otherProps}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <MUIAppBar
      position="absolute"
      className={className}
      {...otherProps}
    >
      <MUIToolbar>
        <MUITypography
          className={classes.title}
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
        >
          {title}
        </MUITypography>

        {/* Add Icons Actions top bar */}
        {/* Search, Notification, Logout */}

        {/* Search Bar */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Icon icon={faSearch} />
          </div>
          <MUIInputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>

        {/* Notification */}
        <MUIIconButton color="inherit">
          <MUIBadge badgeContent={4} color="secondary">
            <Icon icon={faBell} />
          </MUIBadge>
        </MUIIconButton>

        {/* Signout */}
        <MUIIconButton
          color="inherit"
          onClick={() => dispatch(logout())}
        >
          <Icon icon={faSignOut} />
        </MUIIconButton>
      </MUIToolbar>
    </MUIAppBar>
  );
};

Topbar.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default Topbar;