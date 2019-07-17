import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';

// Yup validation form
import * as Yup from 'yup';

// Fromik
import {Formik, withFormik, Field} from 'formik';

// React Select
import Select from 'react-select';

// MaterialUI
import MUIButton from '@material-ui/core/Button';
import MUIHidden from '@material-ui/core/Hidden';

// Hooks
import useOptions from '../../hooks/useOptions';

// Components
import TextField from '../../components/TextField';

// Generic Views
import FormView from '../FormView';

// API
import CatAPI from '../../CatAPI';

const validationSchema = Yup.object().shape({
  id: Yup.number().required('Este campo es obligatorio'),
  name: Yup.string().trim().required('Este campo es obligatorio'),
  sku: Yup.string().required('Este campo es obligatorio'),
  description: Yup.string().trim(),
  brands: Yup.array().min(1, 'Elige una opción').of(
    Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.number().required()
    })
  )
});

const ProductCreate = () => {
  const brandOptions = useOptions('/brands');

  return (
    <FormView
      title="Crear nuevo producto"
    >
      {console.log(brandOptions)}
      <Formik
        initialValues={{id: '', name: '', description: '', sku: ''}}
        validationSchema={validationSchema}
        onSubmit={() => alert('submitting')}
        render={({
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <MUIHidden xsUp>
              <Field
                name="id"
                type="hidden"
                component={TextField}
              />
            </MUIHidden>
            <Field
              name="name"
              label="Nombre"
              component={TextField}
            />
            <Field
              name="description"
              label="Descripción"
              multiline={true}
              rows={5}
              component={TextField}
            />
            <Field
              name="sku"
              label="Código (SKU)"
              component={TextField}
            />
            <Select
              cacheOptions
              options={brandOptions}
            />
            <MUIButton>
              Crear
            </MUIButton>
          </form>
        )}
      />
    </FormView>
  );
};

export default ProductCreate;