import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUIPaper from '@material-ui/core/Paper';
import MUITable from '@material-ui/core/Table';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';

import TableListToolbar from './TableListToolbar';
import TableListHead from './TableListHead';
import {Checkbox} from '@material-ui/core';

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

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

const TableList = ({
  title,
  columns,
  data
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(null); // field
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if(event.target.checked) {
      const newSelects = data.map(n => n.name);
      setSelected(newSelects);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if(selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if(selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if(selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if(selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <MUIPaper className={classes.paper}>

        {/* Table List Toolbar */}
        <TableListToolbar
          title={title}
          numSelected={selected.length}
        />
        
        <div className={classes.tableWrapper}>
          <MUITable
            className={classes.table}
            aria-labelledby="tableTitle"
          >
            {/* <TableListHead
              classes={classes}
              columns={columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={0}
            /> */}
            <MUITableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <MUITableRow key={uuid()}>
                      <MUITableCell>
                        asasdkasdk
                      </MUITableCell>
                    </MUITableRow>
                    // <MUITableRow
                    //   hover={true}
                    //   onClick={event => handleClick(event, row.name)}
                    //   role="checkbox"
                    //   aria-checked={isItemSelected}
                    //   tabIndex={-1}
                    //   key={uuid()}
                    //   selected={isItemSelected}
                    // >
                    //   <MUITableCell padding="checkbox">
                    //     <Checkbox
                    //       checked={isItemSelected}
                    //       inputProps={{'aria-labelledby': labelId}}
                    //     />
                    //   </MUITableCell>
                    // </MUITableRow>
                  );
                })
              }
            </MUITableBody>
          </MUITable>
        </div>
      </MUIPaper>
    </div>
  );
};

TableList.propTypes = {
  title: PropTypes.string.isRequired,
  columns: TableListHead.propTypes.columns.isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default TableList;