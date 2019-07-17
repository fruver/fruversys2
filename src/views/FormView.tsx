import * as React from 'react';

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import MUIGrid from '@material-ui/core/Grid';
import MUIPaper from '@material-ui/core/Paper';

import Layout from '../layouts/Layout';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {},
    paper: {
      padding: theme.spacing(2)
    }
  })
);

interface FormView {
  title: string;
  children: React.ReactNode;
}

const FormView = ({
  title,
  children
}: FormView) => {
  const classes = useStyles();
  return (
    <Layout title={title}>
      <MUIGrid container>
        <MUIGrid item xs={12}>
          <MUIPaper className={classes.paper}>
            {children}
          </MUIPaper>
        </MUIGrid>
      </MUIGrid>
    </Layout>
  );
};

export default FormView;