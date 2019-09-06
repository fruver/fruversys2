import * as React from 'react';
import {NavLink, LinkProps} from 'react-router-dom';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faScanner} from '@fortawesome/pro-duotone-svg-icons';

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import MUIListItemIcon from '@material-ui/core/ListItemIcon';
import MUIListItemText from '@material-ui/core/ListItemText';
import {SideNavItemProp} from '../constants/types';
import * as routes from '../constants/routes';

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
    }
  }),
);

const NavItems: SideNavItemProp[] = [
  {
    'id': 1,
    'labelName': 'Productos',
    'iconName': faScanner,
    'urlName': '/products/'
  }
];

// eslint-disable-next-line react/display-name
const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
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
    <MUIList className={classes.root}>
      {NavItems.map(({
        id,
        labelName,
        iconName,
        urlName
      }) => (
        <MUIListItem
          button={true}
          classes={{selected: classes.activeListItem}}
          component={AdapterLink}
          to={urlName}
          key={id}
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