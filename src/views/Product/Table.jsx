import React from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';

// MaterialUI
import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUIPaper from '@material-ui/core/Paper';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUIButton from '@material-ui/core/Button';
import MUITable from '@material-ui/core/Table';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableFooter from '@material-ui/core/TableFooter';
import MUITablePagination from '@material-ui/core/TablePagination';
import MUITableRow from '@material-ui/core/TableRow';
import MUITableCell from '@material-ui/core/TableCell';

// Layout
import Layout from '../../layouts/Layout';
import {SpinnerLinear} from '../../components/Spinner';
import useListView from '../../hooks/useListView';
import TableHead from './TableHead';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    table: {
      minWidth: 750,
    },
    tableRow: {
      cursor: 'pointer'
    }
  })
);

const headRows = [
  {
    id:'name',
    label: 'Producto',
    disablePadding: false,
    align: false
  },
  {
    id: 'brand',
    label: 'Marca',
    disablePadding: false,
    numeric: false
  },
  {
    id: 'category',
    label: 'Categoría',
    disablePadding: false,
    numeric: false
  },
  {
    id: 'sku',
    label: 'Código',
    disablePadding: false,
    numeric: true
  },
  {
    id: 'stockrecord',
    label: 'Inventario',
    disablePadding: false,
    numeric: true
  }
];

const ProductList = ({
  match,
  history
}) => {
  const title = 'Productos';
  const styles = useStyles();
  const [{isLoading, isError, objects: products, errors}] = useListView('/products');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  const handleClick = (event, id) => {
    history.push(`${match.url}/${id}`);
  };

  const handleBtnClick = (event) => {
    history.push(`${match.url}/create`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Layout title={title}>
        <SpinnerLinear />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout title={title}>
        {alert(errors)}
      </Layout>
    );
  }

  return (
    <Layout title={title}>
      <MUIToolbar
        disableGutters
        className={styles.toolbar}
      >
        <MUIButton
          color="primary"
          variant="contained"
          onClick={handleBtnClick}
        >
          Crear Producto
        </MUIButton>
      </MUIToolbar>
      <MUIPaper className={styles.paper}>
        {products && products.length ? (
          <div className={styles.tableWrapper}>
            <MUITable>
              <TableHead headRows={headRows} />
              <MUITableBody>
                {products.map(product => (
                  <MUITableRow
                    hover
                    className={styles.tableRow}
                    onClick={event => handleClick(event, product.id)}
                    key={product.id}
                  >
                    <MUITableCell component="th" scope="row">{product.name}</MUITableCell>
                    <MUITableCell>{product.brand}</MUITableCell>
                    <MUITableCell>{product.category}</MUITableCell>
                    <MUITableCell align="right">{product.sku}</MUITableCell>
                    <MUITableCell align="right">0</MUITableCell>
                  </MUITableRow>
                ))}
                {emptyRows > 0 && (
                  <MUITableRow style={{height: 49 * emptyRows }}>
                    <MUITableCell colpsan="5" />
                  </MUITableRow>
                )}
              </MUITableBody>
              <MUITableFooter>
                <MUITableRow>
                  <MUITablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={5}
                    count={products.length}
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
        ) : (
          <div>empty</div>
        )}
      </MUIPaper>
    </Layout>
  );
};

ProductList.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(ProductList);