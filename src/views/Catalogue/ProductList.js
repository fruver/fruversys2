import React from 'react';
import MaterialTable from 'material-table';

import Layout from '../../components/Layout';
import Topbar from '../../components/Topbar';

const columns = [
  {title: 'Ref', field: 'sku'},
  {title: 'Producto', field: 'name'},
  {title: 'Categoría', field: 'category'},
  {title: 'Marca', field: 'brand'},
  {title: 'Embalaje', field: 'packaging'},
  {title: 'Unidad', field: 'unit'},
  {title: 'Cantidad', field: 'quantity'},
  {title: 'Fecha', field: 'date_created'}
];

const ProductList = () => {
  const title = 'Productos';
  const subtitle = '';

  return (
    <React.Fragment>
      <Topbar />
      <MaterialTable
        columns={columns}
      />
    </React.Fragment>

  );
};

export default ProductList;
