import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import MUIPaper from '@material-ui/core/Paper';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUIButton from '@material-ui/core/Button';
import MUITablePagination from '@material-ui/core/TablePagination';

import {SpinnerLinear} from '../components/Spinner';
import Layout from '../layouts/Layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
  })
);

interface ListViewProps extends RouteComponentProps {
  verboseName: string;
  verboseNamePlural: string;
  isLoading: boolean;
  isError: boolean;
  errors: any;
  objectsLength?: number|undefined;
  pagination?: boolean|undefined;
  paginateBy?: number|undefined;
  children: any;
}

const ListView = ({
  verboseName,
  verboseNamePlural,
  isLoading,
  isError,
  errors,
  children,
  match,
  history
}: ListViewProps) => {
  // Styles MUI
  const classes = useStyles();

  const handleBtnClick = () => {
    history.push(`${match.url}/create`);
  };

  if (isLoading) {
    return (
      <Layout title={verboseNamePlural}>
        <SpinnerLinear />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout title={verboseNamePlural}>
        <h1>Errors</h1>
        {alert(errors)}
      </Layout>
    );
  }

  return (
    <Layout title={verboseNamePlural}>
      {/* Toolbar */}
      <MUIToolbar
        disableGutters
        className={classes.toolbar}
      >
        <MUIButton
          color="primary"
          variant="contained"
          onClick={handleBtnClick}
        >
          {`Crear ${verboseName}`}
        </MUIButton>
      </MUIToolbar>

      {/* Paper */}
      <MUIPaper className={classes.paper}>
        {children}
      </MUIPaper>
    </Layout>
  );
};

export default withRouter(ListView);