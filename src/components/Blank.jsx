import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Blank = ({title}) => {
  return (
    <Typography>
      
    </Typography>
  )
}

Blank.propTypes = {
  title: PropTypes.string.isRequired
};

export default Blank;