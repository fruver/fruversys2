import React from 'react';

import Table from '../../components/Table';
import Layout from '../../components/Layout';

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
    <Layout title={title}>
      <Table
        title={title}
        columns={columns}
        fieldOrderBy='Ref'
      />
    </Layout>
  );
};

export default ProductList;
