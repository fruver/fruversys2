import * as React from 'react';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';
import {TableHeadProp} from '../constants/types';

interface Props {
  headRows: TableHeadProp[];
}

const TableHead = ({headRows}: Props) => {
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