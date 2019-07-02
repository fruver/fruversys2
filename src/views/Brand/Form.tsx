import * as React from 'react';
import * as Yup from 'yup';

// MaterialUI
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Formik
import {Formik, Field} from 'formik';

// API
import {createBrand} from '../../API';

// Components
import TextField from '../../components/TextField';

// Styles
const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    btnSubmit: {
      marginTop: theme.spacing(2)
    }
  })
);

// Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().trim()
    .required('Este campo es requerido')
});

const Form = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{name: ''}}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting}) => {
        // Create new promise
        createBrand(values.name).then(resp => {
          alert(resp);
          console.log(resp);
        }).catch(reason => {
          alert(reason);
          console.log(reason);
          setSubmitting(false);
        });
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 1000);
      }}
      render={({
        errors,
        status,
        touched,
        handleChange,
        handleSubmit,
        handleReset,
        isSubmitting
      }) => (
        <form
          onReset={handleReset}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field
            name='name'
            label='Nombre'
            component={TextField}
            autoFocus
          />

          <Button
            className={classes.btnSubmit}
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            disabled={isSubmitting}
            fullWidth
          >
            Crear
          </Button>
        </form>
      )}
    />
  );
};

export default Form;