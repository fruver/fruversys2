import React from 'react';
import PropTypes from 'prop-types';

import CatAPI from '../CatAPI';

const useListView = (url) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [objects, setObjects] = React.useState([]);
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    CatAPI.listView(url).then(resp => {
      setObjects(resp);
    }).catch(reason => {
      setIsError(true);
      setErrors(reason);
    }).finally(() => setIsLoading(false));
  }, [url]);

  return [{
    isLoading,
    isError,
    objects,
    errors
  }];
};

useListView.propTypes = {
  url: PropTypes.string
};

export default useListView;