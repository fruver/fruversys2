import * as React from 'react';
import * as Yup from 'yup';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Formik, Form, Field, FormikProps} from 'formik';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import MUIPaper from '@material-ui/core/Paper';
import MUIButton from '@material-ui/core/Button';
import MUIMenuItem from '@material-ui/core/MenuItem';
import Layout from '../components/Layout';
import TextField from '../components/TextField';
import {BrandProp, CategoryProp, ProductProp} from '../constants/types';
import useOptions from '../hooks/useOptions';
import CatAPI from '../CatAPI';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    paper: {
      padding: theme.spacing(3)
    },
    menuItemChild: {
      paddingLeft: theme.spacing(3)
    },
    btnSubmit: {
      margin: theme.spacing(2, 0, 0)
    }
  })
);

const initialValues: ProductProp = {
  id: '',
  name: '',
  sku: '', 
  brand: '',
  brand_id: '',
  category: '',
  category_id: ''
};

const ProductCreate = ({match}: RouteComponentProps) => {
  // Styles
  const classes = useStyles();

  // Brand Options
  const brands = useOptions('/brands');

  // Category Options
  const categories = useOptions('/category');

  const menuItem = ((option: CategoryProp) => 
    <MUIMenuItem
      key={option.id}
      value={option.id}
      disabled={!!(option.children && option.children.length)}
    >{option.name}</MUIMenuItem>
  )

  return (
    <Layout
      title="Crear producto"
      isLoading={false}
    >
      <MUIPaper className={classes.paper}>
        <Formik
          initialValues={{
            id: product.id,
            name: product.name,
            sku: product.sku,
            brand_id: product.brand_id,
            category_id: product.category_id
          }}
          onSubmit={(values, {setSubmitting}) => {
            console.log(values);
            CatAPI.Fetch(`${match.url}`, {
              method: 'PUT',
              body: JSON.stringify(values)
            }).then(resp => {
              console.log(resp);
              if (resp.success) {
                alert('success');
                setSubmitting(false);
                setIsSubmitting(!isSubmitting);
              }
            })
          }}
          render={(formikBag: FormikProps<ProductProp>) => (
            <Form>
              <Field
                name="name"
                label="Nombre"
                component={TextField}
              />
              <Field
                name="sku"
                label="Código (SKU)"
                component={TextField}
              />
              <Field
                select
                name="category_id"
                label="Categoría"
                component={TextField}
              >
                {categories.map((parent: CategoryProp) => {
                  let data = [];
                  data.push(menuItem(parent))
                  parent.children.map((child: CategoryProp) => data.push(menuItem(child)))
                  return data;
                })}
              </Field>
              <Field
                select
                name="brand_id"
                label="Marca"
                component={TextField}
              >
                {brands.map((option: BrandProp) => (
                  <MUIMenuItem
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </MUIMenuItem>
                ))}
              </Field>
              <MUIButton
                className={classes.btnSubmit}
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                disabled={formikBag.isSubmitting}
                fullWidth
              >
                Actualizar producto
              </MUIButton>
            </Form>
          )}
        />
      </MUIPaper>
    </Layout>
  )
}

export default withRouter(ProductCreate);