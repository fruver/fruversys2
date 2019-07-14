import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Link, withRouter} from 'react-router-dom';
// MaterialUI
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// FontAwesomeIcon
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/pro-regular-svg-icons';
// Components
import TableHeader from '../../components/TableHeader';
import {SpinnerLinear} from '../../components/Spinner';
// Layout
import Layout from '../../layouts/Layout';
// Hooks
import useListView from '../../hooks/useListView';

const headRows = [
  {
    id:'name',
    label: 'Nombre',
    disablePadding: false,
    align: false
  },
  {
    id: 'date',
    label: 'Fecha de creación',
    disablePadding: false,
    numeric: false
  }
];

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    }
  }),
);


// eslint-disable-next-line react/display-name
const AdapterLink = forwardRef((props, ref) => <Link innerRef={ref} {...props} /> );

const Table = ({match: {url}}) => {
  const title = 'Marcas';
  const classes = useStyles();
  const [{objects, errors, isLoading}] = useListView('/brands');

  if (isLoading) {
    return <SpinnerLinear />;
  }

  return (
    <Layout
      title={title}
      classes={{main: classes.root}}
    >
      <div className={classes.toolbar}>
        <Toolbar disableGutters>
          <Button
            color="primary"
            variant="contained"
            component={AdapterLink}
            to={`${url}/create`}
          >
            Crear Marca
          </Button>
        </Toolbar>
      </div>
      <Paper className={classes.paper}>
        {objects && objects.length ? (
          <div className={classes.tableWrapper}>
            <MUITable className={classes.table}>
              <TableHeader headRows={headRows} />
              <TableBody>
                {objects.map(object => (
                  <TableRow key={object.id} hover={true}>
                    <TableCell component="th" scope="row">
                      <Link to={`${url}/${object.id}`}>{object.name}</Link>
                    </TableCell>
                    <TableCell>
                      <Moment fromNow date={object.date_created} locale="es" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MUITable>
          </div>
        ) : (
          <h1>No tenemos nada que mostrar</h1>
        )}
      </Paper>
    </Layout>
  );
};

Table.propTypes = {
  match: PropTypes.object
};

export default withRouter(Table);