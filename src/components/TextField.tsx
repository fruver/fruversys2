import React from 'react';
import {FieldProps} from 'formik';
import MUITextField from '@material-ui/core/TextField';

const TextField = ({
  field,
  form,
  ...otherProps
}: FieldProps<any>) => (
  <MUITextField
    id={field.name}
    value={field.value}
    error={!!(form.errors[field.name] && form.touched[field.name])}
    helperText={form.errors[field.name] && form.touched[field.name] ? form.errors[field.name] : null}
    variant='outlined'
    margin='normal'
    fullWidth
    {...field}
    {...otherProps}
  />
);

export default TextField;