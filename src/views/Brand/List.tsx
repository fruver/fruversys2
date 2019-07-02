import * as React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../../layouts/Layout';
       
const List = () => {
  const title = 'Marcas';

  return (
    <Layout title={title}>
      <Link to='/brands/create'>Crear Marca</Link>
      <h1>{title}</h1>
    </Layout>
  );
};

export default List;