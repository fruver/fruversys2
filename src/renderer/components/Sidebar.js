import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import {matchPath} from 'react-router';
import {NavLink, withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {
  faScanner,
  faUsers,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/pro-duotone-svg-icons';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import MUIListItemIcon from '@material-ui/core/ListItemIcon';
import MUIListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider/Divider';
import Collapse from '@material-ui/core/Collapse';

import {ROUTES} from '../constants/Routes';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      padding: 0,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    listItemActive: {
      backgroundColor: theme.palette.action.selected
    }
  }),
);

const NavItems = [
  {
    labelName: 'Catalogo',
    urlName: ROUTES.CATALOGUE,
    iconName: faScanner,
    items: [
      {
        labelName: 'Productos',
        urlName: ROUTES.PRODUCTS
      },
      {
        labelName: 'Departamentos',
        urlName: ROUTES.DEPARTAMENTS
      },
      {
        labelName: 'Marcas',
        urlName: ROUTES.BRANDS
      }
    ]
  },
  {
    labelName: 'Cliente',
    urlName: ROUTES.CUSTOMER,
    iconName: faUsers,
    items: [
      {
        labelName: 'Usuario',
        urlName: ROUTES.USER
      },
      {
        labelName: 'Dirección de envío',
        urlName: ROUTES.USERADDRESS
      }
    ]
  }
];

const ListItemLink = ({
  urlName,
  labelName,
  classes,
  ...otherProps
}) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const renderLink = React.useMemo(() => (
    // eslint-disable-next-line react/display-name
    React.forwardRef((linkProps, ref) => (
      <NavLink
        innerRef={ref}
        to={urlName}
        {...linkProps}
      />
    ))
  ), [urlName]);

  const oddEvent = (match) => {
    if (match) {
      if (isSelected !== true) {
        setIsSelected(true);
      } 
    }
  };

  return (
    <MUIListItem
      button={true}
      className={classes.nested}
      component={renderLink}
      isActive={oddEvent}
      selected={isSelected}
      to={urlName}
      {...otherProps}
    >
      <MUIListItemText primary={labelName} />
    </MUIListItem>
  );
};

ListItemLink.propTypes = {
  urlName: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

const ListItem = ({
  classes,
  isOpen,
  rowItem
}) => {
  const [open, setOpen] = React.useState(isOpen);

  return (
    <React.Fragment>
      {rowItem && rowItem.items ? (
        <React.Fragment>
          <MUIListItem
            onClick={() => setOpen(!open)}
            button={true}
            key={uuid()}
          >
            <MUIListItemIcon>
              <Icon icon={rowItem.iconName} />
            </MUIListItemIcon>
            <MUIListItemText primary={rowItem.labelName} />
            {open ? <Icon icon={faChevronUp} /> : <Icon icon={faChevronDown} />}
          </MUIListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <MUIList component="div" disablePadding>
              {rowItem.items.map(({labelName, urlName}) =>
                <ListItemLink
                  classes={classes}
                  labelName={labelName}
                  key={uuid()}
                  urlName={urlName}
                />
              )}
            </MUIList>
          </Collapse>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.any,
  rowItem: PropTypes.shape({
    labelName: PropTypes.string.isRequired,
    iconName: PropTypes.any.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        labelName: PropTypes.string.isRequired,
        urlName: PropTypes.string.isRequired
      })
    )
  })
};

const Sidebar = ({location}) => {
  const classes = useStyles();
  const {currentUser} = useSelector(store => store.user);

  const isOpen = (rowItem) => {
    const match = matchPath(location.pathname, {
      path: rowItem.urlName
    });
    return match ? true : false;
  };

  return (
    <MUIList className={classes.root}>
      <MUIListItem>
        <MUIListItemText
          primary={`Hola, ${currentUser.displayName}`}
          secondary={currentUser.email}
        />
      </MUIListItem>
      <Divider />
      {NavItems.map(rowItem =>
        <ListItem
          classes={classes}
          isOpen={isOpen(rowItem)}
          key={uuid()}
          rowItem={rowItem}
        />
      )}
    </MUIList>
  );
};

Sidebar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default withRouter(Sidebar);