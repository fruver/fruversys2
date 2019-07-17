import * as React from 'react';
import * as Yup from 'yup';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Formik, Field} from 'formik';

import MUIButton from '@material-ui/core/Button';

import TextField from '../../components/TextField';
import useDetailView from '../../hooks/useDetailView';
import FormView from '../FormView';

const validationSchema = Yup.object().shape({
  id: Yup.number().required('Este campo es obligatorio'),
  name: Yup.string().trim().required('Este campo es obligatorio'),
  description: Yup.string().trim(),
  sku: Yup.number().required('Este campo es obligatorio'),
});

const ProductCreate = ({
  match,
  history
}: RouteComponentProps) => {
  return (
    <FormView
      title="Crear nuevo producto"
    >
      <Formik
        initialValues={{id: '', name: '', description: '', sku: ''}}
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
            <MUIButton>Crear</MUIButton>
          </form>
        )}
      />
    </FormView>
  );
};

export default withRouter(ProductCreate);