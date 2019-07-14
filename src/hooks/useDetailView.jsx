import React from 'react';
import PropTypes from 'prop-types';

import CatAPI from '../CatAPI';

const useDetailView = (url) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [object, setObject] = React.useState([]);
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    CatAPI.detailView(url).then(resp => {
      setObject(resp);
    }).catch(reason => {
      setIsError(true);
      setErrors(reason);
    }).finally(() => setIsLoading(false));
  }, [url]);

  return [{
    isLoading,
    isError,
    object,
    errors
  }];
};

useDetailView.propTypes = {
  url: PropTypes.string
};

export default useDetailView;