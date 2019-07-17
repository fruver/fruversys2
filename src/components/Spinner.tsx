import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

// Styles
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const Spinner = () => {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{minHeight: '100vh'}}
    >
      <CircularProgress />
    </Grid>
  );
};

export const SpinnerLinear = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
      <br />
      <LinearProgress color="secondary" />
    </div>
  );
};