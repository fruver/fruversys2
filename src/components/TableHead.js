// @flow
import React from 'react';
import uuidv4 from 'uuid/v4';

import Checkbox from '@material-ui/core/Checkbox';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';
import MUITableSortLabel from '@material-ui/core/TableSortLabel';

export type Column = {
  title: string,
  field: string,
  type?: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency',
  disablePadding?: boolean
}

const TableHead = (props : {
  classes: Object,
  columns: [Column],
  onSelectAllClick: Function,
  order: string,
  orderBy: string,
  numSelected: number,
  rowCount: number,
  onRequestSort: Function
}) => {
  const {
    classes,
    columns,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;

  const createSortHandler = property => event => {
    onRequestSort(property, event);
  };

  return (
    <MUITableHead>
      <MUITableRow>
        <MUITableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all desserts'}}
          />
        </MUITableCell>
        {columns.map(column => (
          <MUITableCell
            key={uuidv4()}
            align={column.type === 'numeric' ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === column.field ? order : false}
          >
            <MUITableSortLabel
              active={orderBy === column.field}
              direction={order}
              onClick={createSortHandler(column.field)}
            >
              {column.title}
              {orderBy === column.field ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending': 'sorted ascending'}
                </span>
              ) : null}
            </MUITableSortLabel>
          </MUITableCell>
        ))}
      </MUITableRow>
    </MUITableHead>
  );
};

export default TableHead;