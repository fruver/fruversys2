import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as Yup from 'yup';
import {Formik, Form as IKForm, Field} from 'formik';
import useDetailView from '../../hooks/useDetailView';
import TextField from '../../components/TextField';

const validationSchema = Yup.object().shape({
  id: Yup.number().required('Este campo es obligatorio'),
  name: Yup.string().trim().required('Este campo es obligatorio'),
  description: Yup.string().trim(),
  sku: Yup.number().required('Este campo es obligatorio'),
});

const Form = ({
  match,
  location,
  history
}) => {
  const [{
    isLoading,
    isError,
    object,
    errors
  }] = useDetailView(`${match.url}`);

  return (
    <Formik
      initialValues={object}
      validationSchema={validationSchema}
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
        </form>
      )}
    />
  );
};

Form.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Form);
