import React from 'react';
import PropTypes from 'prop-types';

import MUITextField from '@material-ui/core/TextField';

const TextField = ({field, form, ...otherProps}) => (
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

TextField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
};

export default TextField;