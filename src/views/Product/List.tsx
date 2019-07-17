import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUITable from '@material-ui/core/Table';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableFooter from '@material-ui/core/TableFooter';
import MUITablePagination from '@material-ui/core/TablePagination';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';

import useListView from '../../hooks/useListView';
import TableHead, {HeadRowsProps} from '../../components/TableHead';
import {ProductProps} from '../../constants/types';
import ListView from '../ListView';

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

const headRows: HeadRowsProps[] = [
  {id:'name', label: 'Producto', disablePadding: false, numeric: false},
  {id: 'brand', label: 'Marca', disablePadding: false, numeric: false},
  {id: 'category', label: 'Categoría', disablePadding: false, numeric: false},
  {id: 'sku', label: 'Código', disablePadding: false, numeric: true},
  {id: 'stockrecord', label: 'Inventario', disablePadding: false, numeric: true}
];

const ProductList = ({
  match,
  history
}: RouteComponentProps) => {
  // Styles
  const classes = useStyles();
  // Hook useListView
  const [{isLoading, isError, objects, errors}] = useListView(`${match.url}`);

  {/* PAGINATION */}
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, objects.length - page * rowsPerPage);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (id: number) => {
    history.push(`${match.url}/${id}`);
  };

  return (
    <ListView
      verboseName="Producto"
      verboseNamePlural="Productos"
      isLoading={isLoading}
      isError={isError}
      errors={errors}
    >
      {objects && objects.length > 0 ? (
        <div className={classes.root}>
          <MUITable className={classes.table}>
            <TableHead headRows={headRows} />
            <MUITableBody>
              {objects.map((product: ProductProps) => (
                <MUITableRow
                  hover
                  key={product.id}
                  className={classes.tableRow}
                  onClick={() => handleClick(product.id)}
                >
                  <MUITableCell component="th" scope="row">{product.name}</MUITableCell>
                  <MUITableCell>{product.brand && product.brand.name}</MUITableCell>
                  <MUITableCell>{product.category && product.category.name}</MUITableCell>
                  <MUITableCell align="right">{product.sku}</MUITableCell>
                  <MUITableCell align="right">{product.sku}</MUITableCell>
                </MUITableRow>
              ))}
              {emptyRows > 0 && (
                <MUITableRow style={{ height: 49 * emptyRows }}>
                  <MUITableCell colSpan={6} />
                </MUITableRow>
              )}
            </MUITableBody>
            <MUITableFooter>
              <MUITableRow>
                <MUITablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={5}
                  count={objects.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {'aria-label': 'Rows per Page'},
                    native: true
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </MUITableRow>
            </MUITableFooter>
          </MUITable>
        </div>
      ):(
        <h1>Not objects.</h1>
      )}
    </ListView>
  );
};

export default withRouter(ProductList);