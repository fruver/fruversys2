import React, {forwardRef} from 'react';
import {NavLink} from 'react-router-dom';

// FontAwesome
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {
  faScanner as farScanner,
  faTags as farTags
} from '@fortawesome/pro-regular-svg-icons';

// Material UI
import {makeStyles, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Routes
import * as routes from '../constants/routes';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      padding: 0,
    },
    activeListItem: {
      backgroundColor: theme.palette.action.selected
    }
  }),
);

const NavItems = [
  {
    'id': 1,
    'labelName': 'Productos',
    'iconName': farScanner,
    'urlName': routes.PRODUCT_LIST
  }
];

// eslint-disable-next-line react/display-name
const AdapterLink = forwardRef((props, ref) => (
  <NavLink
    innerRef={ref}
    activeStyle={{
      backgroundColor: '#ddd'
    }}
    {...props}
  />
));

const Sidebar = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {NavItems.map(({
        id,
        labelName,
        iconName,
        urlName
      }) => (
        <ListItem
          button={true}
          classes={{selected: classes.activeListItem}}
          component={AdapterLink}
          to={urlName}
          key={id}
        >
          <ListItemIcon>
            <Icon icon={iconName} />
          </ListItemIcon>
          <ListItemText primary={labelName} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;