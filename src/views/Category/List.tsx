import * as React from 'react';
import {withRouter, Link} from 'react-router-dom';
import Layout from '../../layouts/Layout';
       
const CategoryList = ({
  match
}: any) => {
  const title = 'Categorías';

  return (
    <Layout title={title}>
      <Link to={`${match.url}/create`}>Crear Categoría</Link>
      <h1>{title}</h1>
    </Layout>
  );
};

export default withRouter(CategoryList);