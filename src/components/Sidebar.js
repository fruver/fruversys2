// @flow
import React from 'react';
import clsx from 'clsx';
import uuidv4 from 'uuid';
import {NavLink, withRouter} from 'react-router-dom';
import type {RouteComponentProps} from 'react-dom';
import {useSelector} from 'react-redux';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import type {IconProps} from '@fortawesome/fontawesome-svg-core';
import {
  faScanner,
  faChevronUp,
  faChevronDown
} from '@fortawesome/pro-duotone-svg-icons';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import MUIListItemIcon from '@material-ui/core/ListItemIcon';
import MUIListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider/Divider';
import Collapse from '@material-ui/core/Collapse';

import {DASH_ROUTES} from '../constants/Routes';

const useStyles = makeStyles((theme) =>
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

type ItemProp = {|
  labelName: string,
  urlName: string
|}

type ListItemProps = {|
  labelName: string,
  urlName: IconProps,
  iconName: mixed,
  items: Array<ItemProp>
|}

const NavItems: Array<ListItemProps> = [
  {
    labelName: 'Catalogo',
    iconName: faScanner,
    urlName: DASH_ROUTES.CATALOGUE,
    items: [
      {
        labelName: 'Productos',
        urlName: DASH_ROUTES.PRODUCTS
      },
      {
        labelName: 'Departamentos',
        urlName: DASH_ROUTES.CATEGORY
      },
      {
        labelName: 'Marca',
        urlName: DASH_ROUTES.BRANDS
      }
    ]
  }
];

const ListItem = (props: {
  rowItem: ListItemProps,
  isOpen?: boolean,
  location: any,
  match: any
}) => {
  const classes = useStyles();
  const {rowItem, isOpen, location, match} = props;
  const [open, setOpen] = React.useState(false);

  // eslint-disable-next-line react/display-name
  // const renderLink = React.forwardRef((props, ref) => (
  //   //   <NavLink {...props} innerRef={ref} />
  //   // ));

  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef((props, ref) => (
        <NavLink {...props} innerRef={ref} />
      )),
    ['/catalogue/products'],
  );

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

const Sidebar = (props) => {
  const classes = useStyles();
  const {currentUser} = useSelector(store => store.user);

  const [open, setOpen] = React.useState(false);

  const rowItem = NavItems[0];

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