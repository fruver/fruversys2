import React, {useEffect} from 'react';
import MaterialTable from 'material-table';

import {ROUTES} from '../../constants/Routes';
import Layout from '../../components/Layout';
import {SpinnerLinear} from '../../components/Spinner'
import {TableList} from '../../components/TableList';

const DepartamentList = () => {
  const title = 'Departamentos';
  const [fetchData, setFetchData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000${ROUTES.DEPARTAMENTS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 5a797231e74558e704160e84f9c04097a214fe54'
      }
    }).then(response => response.json()).then(response => {
      setFetchData(response);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Layout title={title}>
        <SpinnerLinear />
      </Layout>
    );
  }

  return (
    <Layout title={title}>
      <TableList
        title={title}
        data={fetchData}
        columns={[
          {title: 'Nombre', field: 'name'}
        ]}
        parentChildData={(row, rows) => rows.find(a => a.id == row.parent)}
      />
    </Layout>
  );
};

export default DepartamentList;
