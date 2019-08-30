import * as React from 'react';
import CatAPI from '../resources/CatAPI';

const useListView = (url: string) => {
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

export default useListView;