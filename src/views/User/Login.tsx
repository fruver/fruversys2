import * as React from 'react';
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom';
import {Formik, Form, Field} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import TextField from '../../components/TextField';
import {SUMMARY as RouteSummary} from '../../constants/routes';
import {useSession, loginWithEmailAndPassword} from '@fruver/react-firebase';

const useStyles = makeStyles(theme => ({
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
}));


const SignupSchema = Yup.object().shape({
  email: Yup.string().trim()
    .email('El correo electronico ingresado no es válido.')
    .matches(/(\W|^)[\w.+-]*@fruver\.com(\W|$)/)
    .required('Este campo es obligatorio'),
  password: Yup.string()
    .required('Este campo es obligatorio')
    .min(8, 'La contraseña debe tener minimo 8 caracteres')
});


const Login = () => {
  const classes = useStyles();
  const user = useSession();
  const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false);
  const [formError, setFormError] = React.useState(null);

  if (user) {
    console.log('Already loggedIn, redirect..');
    return <Redirect to={RouteSummary} />;
  }

  return (
    <Grid className={classes.root} container justify='center' alignItems='center'>
      {isSnackBarOpen ? (
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={isSnackBarOpen}
          autoHideDuration={6000}
          onClose={() => setIsSnackBarOpen(!isSnackBarOpen)}
          message={formError}
        />
      ) : null}
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title='Iniciar Sesión' />
        <CardContent>
          <Formik
            initialValues={{email: 'andres@fruver.com', password: '12345678'}}
            validationSchema={SignupSchema}
            validateOnBlur={false}
            onSubmit={(values, {setSubmitting}) => {
              loginWithEmailAndPassword(values.email, values.password).then(() => {
                console.log('login successful');
              }).catch((reason) => {
                setIsSnackBarOpen(!isSnackBarOpen);
                setFormError(reason.message);
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
    </Grid> 
  );
};

export default Login;