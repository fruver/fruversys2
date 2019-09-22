// @flow
import React from 'react';
import clsx from 'clsx';

import {lighten, makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faTrash, faFilter} from '@fortawesome/pro-duotone-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const TableToolbar = (props: {
  numSelected: number,
  title: string
}) => {
  const classes = useStyles();
  const {numSelected, title} = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <Icon icon={faTrash} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter List">
            <IconButton aria-label="table list">
              <Icon icon={faFilter} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

export default TableToolbar;