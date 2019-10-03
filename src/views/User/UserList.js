import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

import Layout from '../../components/Layout';


const CategoryList = () => {
  const title = 'Usuarios';

  return (
    <Layout title={title}>
      {title}
      <Link to='/catalogue/category/create'>
        Crear, formulario.
      </Link>
    </Layout>
  );
};

export default CategoryList;
