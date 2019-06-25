import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';

interface TextFieldProps {
  field: any;
  form: any;
}

export const TextField = ({field, form, ...props}: TextFieldProps) => (
  <MaterialTextField
    id={field.name}
    value={field.value}
    error={form.errors[field.name] && form.touched[field.name] ? true : false}
    helperText={form.errors[field.name] && form.touched[field.name] ? form.errors[field.name] : null}
    variant='outlined'
    margin='normal'
    fullWidth
    {...field}
    {...props}
  />
);