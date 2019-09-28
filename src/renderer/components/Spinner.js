import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import MUIGrid from '@material-ui/core/Grid';
import MUILinearProgress from '@material-ui/core/LinearProgress';

// Styles
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const Spinner = () => {
  return (
    <MUIGrid
      container
      alignItems="center"
      justify="center"
      style={{minHeight: '100vh'}}
      component={<MUILinearProgress />}
    />
  );
};

export const SpinnerLinear = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MUILinearProgress />
      <br />
      <MUILinearProgress color="secondary" />
    </div>
  );
};