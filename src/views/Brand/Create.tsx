import * as React from 'react';

// MaterialUI
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

// Layout
import Layout from '../../layouts/Layout';

// Form
import Form from './Form';

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      fontSize: innerHeight
    },
    header: {
      borderBottom: `1px solid ${theme.palette.action.selected}`
    }
  })
);

const Create = () => {
  const classes = useStyles();
  const title = 'Crear Marca';
  const subtitle = 'Estas a punto de crear una marca';

  return (
    <Layout title={title}>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              className={classes.header}
              title={title}
              subheader={subtitle}
            />
            <CardContent>
              <Form />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Create;