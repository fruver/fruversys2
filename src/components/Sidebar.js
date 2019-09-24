import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuidv4 from 'uuid';
import {NavLink, withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faScanner, faChevronUp, faChevronDown} from '@fortawesome/pro-duotone-svg-icons';

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
    activeListItem: {
      backgroundColor: theme.palette.action.selected
    }
  }),
);

const NavItems = [
  {
    labelName: 'Catalogo',
    iconName: faScanner,
    items: [
      {
        labelName: 'Productos',
        urlName: ROUTES.PRODUCTS
      },
      {
        labelName: 'Departamentos',
        urlName: ROUTES.CATEGORY
      },
      {
        labelName: 'Marcas',
        urlName: ROUTES.BRANDS
      }
    ]
  }
];

const ListItem = (props) => {
  const classes = useStyles();
  const {rowItem, location, match} = props;
  const [open, setOpen] = React.useState(false);

  // eslint-disable-next-line react/display-name
  // const renderLink = React.forwardRef((props, ref) => (
  //   //   <NavLink {...props} innerRef={ref} />
  //   // ));

  // const renderLink = React.useMemo(
  //   () =>
  //     // eslint-disable-next-line react/display-name
  //     React.forwardRef((props, ref) => (
  //       <NavLink {...props} innerRef={ref} />
  //     )),
  //   ['/catalogue/products'],
  // );

  const setOpenValue = () => {
    console.log(location);
  };

  console.log(location);
  console.log(match);

  return (
    <React.Fragment>
      {rowItem && rowItem.items ? (
        <React.Fragment>
          <MUIListItem
            onClick={() => setOpen(!open)}
            button={true}
            key={uuidv4()}
          >
            <MUIListItemIcon>
              <Icon icon={rowItem.iconName} />
            </MUIListItemIcon>
            <MUIListItemText primary={rowItem.labelName} />
            {open ? <Icon icon={faChevronUp} /> : <Icon icon={faChevronDown} />}
          </MUIListItem>
          <Collapse in={open} timeout="auto">
            <MUIList component="div" disablePadding>
              {rowItem.items.map(({labelName, urlName}) =>
                <MUIListItem
                  button
                  to={urlName}
                  key={uuidv4()}
                >
                  <MUIListItemText primary={labelName} />
                </MUIListItem>
              )}
            </MUIList>
          </Collapse>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

ListItem.propTypes = {
  rowItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const Sidebar = (props) => {
  const classes = useStyles();
  const {currentUser} = useSelector(store => store.user);

  return (
    <MUIList className={classes.root}>
      <MUIListItem>
        <MUIListItemText
          primary={`Hola, ${currentUser.first_name}`}
          secondary={currentUser.email}
        />
      </MUIListItem>

      <Divider />

      {NavItems.map(rowItem =>
        <ListItem
          {...props}
          rowItem={rowItem}
          key={uuidv4()}
        />
      )}
    </MUIList>
  );
};

export default withRouter(Sidebar);