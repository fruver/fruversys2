import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUICssBaseline from '@material-ui/core/CssBaseline';
import MUIDrawer from '@material-ui/core/Drawer';
import MUIDivider from '@material-ui/core/Divider';

import Logo from './Logo';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import {ROUTES} from '../constants/Routes';

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerLogo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    drawerLogoSvg: {
      width: '5em',
      height: '2em',
      color: '#009150'
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

const Layout = ({title, children}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}><MUICssBaseline />
      <Topbar
        className={classes.appBar}
        title={title}
      />
      <MUIDrawer
        className={classes.drawer}
        anchor="left"
        variant="permanent"
        classes={{paper: classes.drawerPaper}}
      >
        {/* Logo */}
        <div className={classes.drawerLogo}>
          <Link to={ROUTES.SUMMARY}>
            <Logo className={classes.drawerLogoSvg} />
          </Link>
        </div>
        {/* Divider */}
        <MUIDivider />
        {/* Sidebar */}
        <Sidebar />
      </MUIDrawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Layout;