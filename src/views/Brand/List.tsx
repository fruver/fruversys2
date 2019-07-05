import * as React from 'react';
import Moment from 'react-moment';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';

// MaterialUI
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// TableList
import TableList from '../../components/TableList';

// Layout
import Layout from '../../layouts/Layout';

// Hooks
import useListView from '../../hooks/useListView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    cellId: {
      fontWeight: 400,
      textDecoration: 'none'
    }
  }),
);

const List = () => {
  const classes = useStyles();
  const [{objects, errors, isLoading}] = useListView('/brands');

  if (isLoading) {
    return (
      <Layout title='Marcas'>
        <Paper>
          <span>Loading...</span>
        </Paper>
      </Layout>
    );
  }

  return (
    <Layout title='Marcas'>
      <Paper className={classes.root}>
        {console.log(objects)}
        {console.log(`objects: ${objects}`)}
        <TableList objects={objects} />
      </Paper>
    </Layout>
  );
};

export default List;