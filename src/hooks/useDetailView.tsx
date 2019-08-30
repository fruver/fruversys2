import * as React from 'react';
import CatAPI from '../resources/CatAPI';

const useDetailView = (url: string) => {
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

export default useDetailView;