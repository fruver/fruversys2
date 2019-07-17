import * as React from 'react';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUITable from '@material-ui/core/Table';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';

import {ProductProps, CategoryProps, BrandProps} from '../CatAPI';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      overflowX: 'auto'
    },
    table: {
      minWidth: 750
    },
    tableRow: {
      cursor: 'pointer'
    }
  })
);

export interface HeadRowsProps {
  id: string;
  label: string;
  disablePadding: boolean;
  numeric: boolean;
}

export interface TableProps {
  objectList: any;
  headRows: HeadRowsProps[];
  paginateBy?: number;
}

const Table = ({
  objectList,
  headRows,
  paginateBy
}: TableProps) => {
  const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(paginateBy);
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, objectList.length - page * rowsPerPage);

  const handleClick = (id: number) => {
    // history.push(`${match.url}/${id}`);
    alert('Click');
  };

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = () => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <div className={classes.root}>
      <MUITable className={classes.root}>
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
        <MUITableBody>
          {objectList.map((object) => (
            <MUITableRow
              hover
              className={classes.tableRow}
              onClick={() => handleClick(object.id)}
              key={object.id}
            >
              <MUITableCell component="th" scope="row">{object.name}</MUITableCell>
              <MUITableCell>{object.brand}</MUITableCell>
              <MUITableCell>{object.category}</MUITableCell>
              <MUITableCell align="right">{object.sku}</MUITableCell>
              <MUITableCell align="right">0</MUITableCell>
            </MUITableRow>
          ))}
          {/* {emptyRows > 0 && (
            <MUITableRow style={{height: 49 * emptyRows }}>
              <MUITableCell colSpan={5} />
            </MUITableRow>
          )} */}
        </MUITableBody>

      </MUITable>
    </div>
  );
};

export default Table;