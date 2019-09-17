import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faScanner} from '@fortawesome/pro-duotone-svg-icons';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import MUIListItemIcon from '@material-ui/core/ListItemIcon';
import MUIListItemText from '@material-ui/core/ListItemText';

import {DASH_ROUTES} from '../constants/Routes';
import MUIDivider from '@material-ui/core/Divider/Divider';

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

// eslint-disable-next-line react/display-name
const AdapterLink = React.forwardRef((props, ref) => (
  <NavLink
    innerRef={ref}
    activeStyle={{
      backgroundColor: '#ddd'
    }}
    {...props}
  />
));

const NavItems = [{
  labelName: 'Productos',
  iconName: faScanner,
  urlName: DASH_ROUTES.PRODUCTS
}];

const Sidebar = () => {
  const classes = useStyles();
  const {user} = useSelector(store => store.user);

  return (
    <MUIList className={classes.root}>
      <MUIListItem>
        <MUIListItemText primary={user.first_name} secondary={user.email} />
      </MUIListItem>
      <MUIDivider />
      {NavItems.map(({labelName, iconName, urlName}) => (
        <MUIListItem
          button={true}
          classes={{selected: classes.activeListItem}}
          component={AdapterLink}
          to={urlName}
          key={labelName}
        >
          <MUIListItemIcon>
            <Icon icon={iconName} />
          </MUIListItemIcon>
          <MUIListItemText primary={labelName} />
        </MUIListItem>
      ))}
    </MUIList>
  );
};

export default Sidebar;