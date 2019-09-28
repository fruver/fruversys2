import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import {categories} from '../../redux/action/categoryAction';
import Table from '../../components/Table';
import Layout from '../../components/Layout';

const columns = [
  {title: 'Nombre', field: 'name'}
];

const CategoryList = () => {
  const title = 'Departamentos';
  const dispatch = useDispatch();
  const {category} = useSelector(state => state);

  console.log(category)

  useEffect(() => {
    console.log('fetch...')
    dispatch(categories());
  },[]);

  if(category.data) {
    return 'loading...';
  }

  return (
    <Layout title={title}>
      <Table
        title={title}
        columns={columns}
        data={category.items}
        fieldOrderBy='name'
      />
    </Layout>
  );
};

export default CategoryList;
