import React from 'react';
import {Redirect} from 'react-router';
import {useSelector} from 'react-redux';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUIGrid from '@material-ui/core/Grid';
import MUICard from '@material-ui/core/Card';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUICardContent from '@material-ui/core/CardContent';
import MUIButton from '@material-ui/core/Button';
import MUISnackbar from '@material-ui/core/Snackbar';

import TextField from '../../components/TextField';
import {DASH_ROUTES} from '../../constants/Routes';
import {login} from '../../redux/action/userAction';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minHeight: '100vh'
    },
    card: {
      width: '45%'
    },
    cardHeader: {
      textAlign: 'center',
      borderBottom: '1px solid #ddd'
    },
    submit: {
      margin: theme.spacing(2, 0, 0),
    }
  })
);


const Base = ({
  title,
  children
}) => {
  const classes = useStyles();
  const {currentUser, isLoading, error} = useSelector(store => store.user);

  if(currentUser) {
    return <Redirect to={DASH_ROUTES.SUMMARY}/>;
  }

  return (
    <MUIGrid className={classes.root} container justify='center' alignItems='center'>
      <MUICard className={classes.card}>
        <MUICardHeader className={classes.cardHeader} title={title} />
        <MUICardContent>
          {children}
        </MUICardContent>
      </MUICard>
    </MUIGrid>
  );
};

export default Base;