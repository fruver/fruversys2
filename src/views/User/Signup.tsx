import * as React from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import MUIGrid from '@material-ui/core/Grid';
import MUICard from '@material-ui/core/Card';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUICardContent from '@material-ui/core/CardContent';
import MUIButton from '@material-ui/core/Button';
import MUISnackbar from '@material-ui/core/Snackbar';

import TextField from '../../components/TextField';

const useStyles = makeStyles((theme: Theme) => 
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
      margin: theme.spacing(2,0,0)
    }
  })
);

const YupSchema = Yup.object().shape({
  name: Yup.string().trim(),
  email: Yup.string().trim()
    .email('El correo electronico ingresado no es válido.')
    .required('Este campo es obligatorio'),
  password: Yup.string()
    .required('Este campo es obligatorio')
    .min(6, 'La contraseña debe tener minimo 6 caracteres')
});

const Signup = () => {
  const classes = useStyles();
  const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false);
  // const [formError, setFormError] = React.useState(null);

  return (
    <MUICard>
      <MUICardContent>
        asdasd
      </MUICardContent>
    </MUICard>
  );
};

export default Signup;