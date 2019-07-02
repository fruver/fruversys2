import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {withRouter, Link} from 'react-router-dom';
import Layout from '../../layouts/Layout';
       
const List = ({
  match,
}: RouteComponentProps) => {
  const title = 'Productos';

  return (
    <Layout title={title}>
      <Link to={`${match.url}/create`}>Crear Producto</Link>
      <h1>Productos</h1>
    </Layout>
  );
};

export default withRouter(List);