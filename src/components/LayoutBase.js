import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUICssBaseline from '@material-ui/core/CssBaseline';
import MUIDrawer from '@material-ui/core/Drawer';
import MUIDivider from '@material-ui/core/Divider';

import {DASH_ROUTES} from '../constants/Routes';
import Logo from './Logo';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
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

const LayoutBase = ({title, children}) => {
  const styles = useStyles();

  return (
    <div className={styles.root}><MUICssBaseline />
      <Topbar
        className={styles.appBar}
        title={title}
      />
      <MUIDrawer
        className={styles.drawer}
        anchor="left"
        variant="permanent"
        classes={{paper: styles.drawerPaper}}
      >
        {/* Logo */}
        <div className={styles.drawerLogo}>
          <Link to={DASH_ROUTES.SUMMARY}>
            <Logo className={styles.drawerLogoSvg} />
          </Link>
        </div>
        {/* Divider */}
        <MUIDivider />
        {/* Sidebar */}
        <Sidebar />
      </MUIDrawer>
      <main className={styles.content}>
        <div className={styles.toolbar} />
        {children}
      </main>
    </div>
  );
};


LayoutBase.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
};


export default LayoutBase;