import React from 'react';
import {Redirect} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';

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
  const {currentUser} = useSelector(store => store.user);
  // const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false);
  // const [formError, setFormError] = React.useState(null);

  if(currentUser) {
    return <Redirect to={DASH_ROUTES.SUMMARY}/>;
  }

  return (
    <MUIGrid className={classes.root} container justify='center' alignItems='center'>
      {/*{isSnackBarOpen ? (*/}
      {/*  <MUISnackbar*/}
      {/*    anchorOrigin={{*/}
      {/*      vertical: 'top',*/}
      {/*      horizontal: 'center'*/}
      {/*    }}*/}
      {/*    open={isSnackBarOpen}*/}
      {/*    autoHideDuration={6000}*/}
      {/*    onClose={() => setIsSnackBarOpen(!isSnackBarOpen)}*/}
      {/*    message={formError}*/}
      {/*  />*/}
      {/*) : null}*/}
      <MUICard className={classes.card}>
        <MUICardHeader className={classes.cardHeader} title='Iniciar Sesión' />
        <MUICardContent>
          <Formik
            initialValues={{email: 'andres@fruver.com', password: 'admin123'}}
            validationSchema={SignInSchema}
            validateOnBlur={false}
            onSubmit={(values, {setSubmitting}) => {
              dispatch(login(values.email, values.password));
              // dispatch(login(values.email, values.password)).then( () => {
              //   console.log('success');
              // }).finally( () => {
              //   console.log('setSubmitting to false');
              //   setSubmitting(false);
              // });
              // dispatch();
              // Auth.signIn(
              //   values.email,
              //   values.password
              // ).then(() => {
              //   console.log('success login');
              // }).catch((reason: any) => {
              //   setIsSnackBarOpen(!isSnackBarOpen);
              //   setFormError(reason.message);
              // }).finally(() => {
              //   setSubmitting(false);
              // });
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
                <MUIButton
                  className={classes.submit}
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  disabled={isSubmitting}
                  fullWidth
                >
                  Iniciar Sesión
                </MUIButton>
              </Form>
            )}
          </Formik>
        </MUICardContent>
      </MUICard>
    </MUIGrid> 
  );
};

export default Login;