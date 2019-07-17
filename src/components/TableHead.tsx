import React from 'react';

// MaterialUI
import MUITableHead from '@material-ui/core/TableHead';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';

export interface HeadRowsProps {
  id: string;
  label: string;
  disablePadding: boolean;
  numeric: boolean;
}

export interface TableHeadProps {
  headRows: HeadRowsProps[];
}

const TableHead = ({headRows}: TableHeadProps) => {
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

export default TableHead;