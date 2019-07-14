import React from 'react';
import PropTypes from 'prop-types';
// MaterialUI
import MUITableHead from '@material-ui/core/TableHead';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';

const TableHead = ({
  headRows,
}) => {
  return (
    <MUITableHead>
      <MUITableRow>
        {headRows.map(row => (
          <MUITableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
          >
            {row.label}
          </MUITableCell>
        ))}
      </MUITableRow>
    </MUITableHead>
  );
};

TableHead.propTypes = {
  headRows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableHead;