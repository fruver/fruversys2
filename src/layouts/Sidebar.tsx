import * as React from 'react';
import {NavLink} from 'react-router-dom';

// Material UI
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

// FontAwesome Icons
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {
  faCaretUp as farCaretUp,
  faCaretDown as farCaretDown
} from '@fortawesome/pro-regular-svg-icons';

// Routes and Types
import {NavItemProps, DASHBOARD} from '../../../constants/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      padding: 0,
    },
    activeListItem: {
      backgroundColor: theme.palette.action.selected
    },
    nested: {
      paddingLeft: theme.spacing(4),
    }
  }),
);

const NavItem = ({
  labelName,
  urlName,
  iconName,
  children,
}: NavItemProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  if (!children) {
    return (
      <>
        <ListItem
          button
          activeClassName={classes.activeListItem}
          component={NavLink}
          to={urlName}
        >
          <ListItemIcon>
            <Icon icon={iconName} size="lg" />
          </ListItemIcon>
          <ListItemText primary={labelName} />
        </ListItem>
      </>
    );
  }

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
      >
        <ListItemIcon>
          <Icon icon={iconName} />
        </ListItemIcon>
        <ListItemText primary={labelName} />
        <Icon icon={open ? farCaretUp : farCaretDown} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children.map(route => 
          <List key={route.id} component="div" disablePadding>
            <ListItem
              button
              component={NavLink}
              activeClassName={classes.activeListItem}
              className={classes.nested}
              to={route.urlName}
            >
              <ListItemIcon>
                <Icon icon={route.iconName} size="lg" />
              </ListItemIcon>
              <ListItemText primary={route.labelName} />
            </ListItem>
          </List>
        )}
      </Collapse>
    </>
  );
};

const Sidebar = () => {
  const classes = useStyles();

  return (
    <>
      {DASHBOARD.map((route) =>
        <List className={classes.root} key={route.id}>
          <NavItem {...route} />
        </List>
      )}
    </>
  );
};

export default Sidebar;