import * as React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import MUICssBaseline from '@material-ui/core/CssBaseline';
import MUIDrawer from '@material-ui/core/Drawer';
import MUIDivider from '@material-ui/core/Divider';
import Logo from './Logo';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
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

interface Props {
  title: string;
  children?: React.ReactNode;
}

const LayoutBase = ({
  title,
  children
}: Props) => {
  const styles = useStyles();

  return (
    <div
      className={styles.root}><MUICssBaseline />
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
          <Link to={SUMMARY}>
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

export default LayoutBase;