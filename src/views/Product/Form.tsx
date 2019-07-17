import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import * as Yup from 'yup';
import {Formik, Field} from 'formik';

import MUIButton from '@material-ui/core/Button';

import TextField from '../../components/TextField';

const validationSchema = Yup.object().shape({
  id: Yup.number().required('Este campo es obligatorio'),
  name: Yup.string().trim().required('Este campo es obligatorio'),
  description: Yup.string().trim(),
  sku: Yup.number().required('Este campo es obligatorio'),
});

const Form = ({match}: RouteComponentProps) => {
  return (
    <Formik
      initialValues={object}
      validationSchema={validationSchema}
      onSubmit={() => alert('submitting')}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <Field
            name="id"
            type="hidden"
            component={TextField}
          />
          <Field
            name="name"
            label="Nombre"
            component={TextField}
          />
          <Field
            name="description"
            label="Descripción"
            component={TextField}
          />
          <Field
            name="sku"
            label="Código (SKU)"
            component={TextField}
          />
          <MUIButton>
            Crear
          </MUIButton>
        </form>
      )}
    />
  );
};

export default withRouter(Form);
