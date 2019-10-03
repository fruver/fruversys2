import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faStoreAlt} from '@fortawesome/pro-duotone-svg-icons';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import {green, grey} from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import getStatic from '../../static';
import Logo from '../../components/Logo';
import TextField from '../../components/TextField';
import {ROUTES} from '../../constants/Routes';
import {fetchToken, fetchUser} from '../../redux/action/userAction';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      backgroundColor: grey[900],
      alignItems: 'center'
    },
    toolbar: theme.mixins.toolbar,
    container: {
      minHeight: '100vh',
      backgroundImage: `url(${getStatic('welcome.svg')})`,
      backgroundColor: grey[900],
      backgroundBlendMode: 'color-burn',
      backgroundPosition: 'center 10%',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    },
    card: {
      width: '45%'
    },
    cardHeader: {
      borderBottom: `1px solid ${grey[300]}`
    },
    cardHeaderTitle: {
      ...theme.typography.h5
    },
    greenAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: green[500],
    },
    submit: {
      margin: theme.spacing(2, 0, 0)
    },
    logo: {
      width: '10rem',
      height: '100%',
      color: '#fff'
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={classes.appBar}
        color='default'
      >
        <Toolbar>
          <Link to={ROUTES.SUMMARY}>
            <Logo className={classes.logo} />
          </Link>
        </Toolbar>
      </AppBar>
      
      {/* <div className={classes.toolbar} /> */}

      <Grid
        className={classes.container}
        container
        justify='center'
        alignItems='center'
      >
        <Paper elevation={8}>
          <Card>
            <CardHeader
              className={classes.cardHeader}
              classes={{
                title: classes.cardHeaderTitle
              }}
              avatar={
                <Avatar
                  aria-label='recipe'
                  className={classes.greenAvatar}
                >
                  <Icon icon={faStoreAlt}/>
                </Avatar>
              }
              title='Iniciar Sesión'
            />
            <CardContent>
              <Formik
                initialValues={{email: 'andres@fruver.com', password: 'admin123'}}
                validationSchema={SignInSchema}
                validateOnBlur={false}
                onSubmit={(values, {setSubmitting}) => {
                  dispatch(
                    fetchToken(values.email, values.password)
                  ).then((response) => {
                    console.log(response);
                  }).finally(() => {
                    setSubmitting(false);
                  });
                }}
              >
                {({isSubmitting}) => (
                  <Form noValidate autoComplete='off'>
                    <Field
                      name='email'
                      label='Correo electrónico'
                      autoFocus
                      component={TextField}
                    />
                    <Field
                      name='password'
                      label='Contraseña'
                      type='password'
                      component={TextField}
                    />
                    <Button
                      className={classes.submit}
                      type='submit'
                      variant='contained'
                      color='primary'
                      size='large'
                      disabled={isSubmitting}
                      fullWidth
                    >
                      Iniciar Sesión
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;