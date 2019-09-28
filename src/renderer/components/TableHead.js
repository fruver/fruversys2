import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import Checkbox from '@material-ui/core/Checkbox';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';
import MUITableSortLabel from '@material-ui/core/TableSortLabel';

const TableHead = (props) => {
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
            key={uuid()}
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

TableHead.propTypes = {
  classes: PropTypes.object,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        'boolean',
        'numeric',
        'date',
        'datetime',
        'time',
        'currency'
      ])
    })
  ),
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired
}

export default TableHead;