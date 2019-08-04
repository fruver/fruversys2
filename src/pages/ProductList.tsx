import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import MUIPaper from '@material-ui/core/Paper';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUIButton from '@material-ui/core/Button';
import MUITable from '@material-ui/core/Table';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableFooter from '@material-ui/core/TableFooter';
import MUITablePagination from '@material-ui/core/TablePagination';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';

import Layout from '../components/Layout';
import Link from '../components/Link';
import TableHead from '../components/TableHead';
import {ProductProp, TableHeadProp} from '../constants/types';
import useFetch from '../hooks/useFetch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowX: 'auto'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    table: {
      minWidth: 750
    },
    tableRow: {
      cursor: 'pointer'
    }
  })
);

const headRows: TableHeadProp[] = [
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
  const [{isLoading, isError, data}] = useFetch(`${match.url}`);

  {/* PAGINATION */}
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
    <Layout
      title="Productos"
      isLoading={isLoading}
      isError={isError}
    >
  
      <MUIToolbar
        disableGutters
        className={classes.toolbar}
      >
        <MUIButton
          color="primary"
          variant="contained"
          component={Link}
          to={`${match.path}/create`}
        >
          Crear Producto
        </MUIButton>
      </MUIToolbar>
  
      <MUIPaper>
        <div className={classes.root}>
          <MUITable className={classes.table}>
            <TableHead headRows={headRows} />
            <MUITableBody>
              {data.map((product: ProductProp) => (
                <MUITableRow
                  hover
                  key={product.id}
                  className={classes.tableRow}
                  onClick={() => handleClick(product.id)}
                >
                  <MUITableCell component="th" scope="row">{product.name}</MUITableCell>
                  <MUITableCell>{product.brand && product.brand}</MUITableCell>
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
                  count={data.length}
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
      </MUIPaper>
    </Layout>
  );
};

export default withRouter(ProductList);