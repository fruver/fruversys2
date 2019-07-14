import React from 'react';
import PropTypes from 'prop-types';

// MaterialUI
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';

// Styles
const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    empty: {
      padding: theme.spacing(3)
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

const TableList = ({
  headRows,
  objects
}) => {
  const classes = useStyles();

  if (objects) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            {headRows.map(row => (
              <TableCell key={row.id} align={row.align}>
                {row.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {objects.map(object =>
            <TableRow
              key={object.id}
              hover
            >
              {Object.entries(object).map(([key, value]) =>
                <TableCell key={key}>
                  {value}
                </TableCell>
              )}
            </TableRow>
          )}
            <TableRow>
              <TableCell>

              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <Typography
      align="center"
      className={classes.empty}
    >
      Ups!, aun no tenemos un registro sobre esto,
      por favor crea uno o contacta al administrador.
    </Typography>
  )
};

TableList.propTypes = {
  headRows: PropTypes.arrayOf(PropTypes.object),
  objects: PropTypes.arrayOf(PropTypes.object)
}

export default TableList;

