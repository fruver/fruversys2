import React from 'react'
import {Redirect, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import MUIGrid from '@material-ui/core/Grid';
import MUICard from '@material-ui/core/Card';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUICardContent from '@material-ui/core/CardContent';
import MUIButton from '@material-ui/core/Button';
import MUISnackbar from '@material-ui/core/Snackbar';

import Logo from '../../components/Logo';
import TextField from '../../components/TextField';
import {ROUTES} from '../../constants/Routes';
import {login, user} from '../../redux/action/userAction';

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
    },
    logo: {
      justifyContent: 'center',
      padding: '0 8px'
    },
  })
);

const SignInSchema = Yup.object().shape({
  email: Yup.string().trim()
    .email('El correo electronico ingresado no es válido.')
    .required('Este campo es obligatorio'),
  password: Yup.string()
    .required('Este campo es obligatorio')
    .min(8, 'La contraseña debe tener minimo 8 caracteres')
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {currentUser, error} = useSelector(store => store.user);

  if(currentUser) {
    return <Redirect to={ROUTES.SUMMARY}/>;
  }

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Box justifyContent="center" className={classes.logo}>
            <Logo />
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Login;