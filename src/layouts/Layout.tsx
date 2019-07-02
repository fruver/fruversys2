import * as React from 'react';
import {Link} from 'react-router-dom';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

// Components
import Logo from '../components/Logo';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

// Routes
import {SUMMARY} from '../constants/routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
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

interface LayoutProps {
  title: string;
  children?: React.ReactNode;
}

const Layout = ({
  title,
  children
}: LayoutProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}><CssBaseline />
      <Topbar
        className={classes.appBar}
        title={title}
      />
      <Drawer
        className={classes.drawer}
        anchor="left"
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {/* Logo */}
        <div className={classes.drawerLogo}>
          <Link to={SUMMARY}>
            <Logo className={classes.drawerLogoSvg} />
          </Link>
        </div>
        {/* Divider */}
        <Divider />
        {/* Sidebar */}
        <Sidebar />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;