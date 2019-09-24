import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUIPaper from '@material-ui/core/Paper';
import MUITable from '@material-ui/core/Table';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';

import TableToolbar from './TableToolbar';
import TableHead from './TableHead';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    tableWrapper: {
      overflowX: 'auto'
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    }
  })
);

const Table = (props) => {
  const {title, dense, fieldOrderBy, columns} = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(fieldOrderBy); // field
  const [selected, setSelected] = React.useState([]);
  //const [page, setPage] = React.useState(0);
  //const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if(event.target.checked) {
      // rows data
      const newSelects = [];
      setSelected(newSelects);
      return;
    }
    setSelected([]);
  };

  return (
    <div className={classes.root}>
      <MUIPaper className={classes.paper}>
        <TableToolbar
          title={title}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <MUITable
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead
              classes={classes}
              columns={columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={0}
            />
          </MUITable>
        </div>
      </MUIPaper>
    </div>
  );
};

Table.propTypes = {
  title: PropTypes.string,
  dense: PropTypes.bool,
  fieldOrderBy: PropTypes.string,
  columns: TableHead.propTypes.columns
};

export default Table;