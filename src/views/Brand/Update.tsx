import * as React from 'react';

// MaterialUI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

// Layout
import Layout from '../../layouts/Layout';

// Form
import Form from './Form';

const Create = () => {
  const title = 'Actualizar Marca';
  const subtitle = 'Estas a punto de actualizar una marca';

  return (
    <Layout title={title}>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={title}
              subheader={subtitle}
            />
            <CardContent>
              <Form />
            </CardContent>
          </Card>
          <Form />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Create;