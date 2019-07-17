import * as React from 'react';
import CatAPI from '../CatAPI';

const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    CatAPI.listView(url).then(resp => {
      setData(resp);
    }).catch(reason => {
      setIsError(true);
      console.log(reason.message);
    }).finally(() => setIsLoading(false));
  }, [url]);

  return [{
    isLoading,
    isError,
    data
  }];
};

export default useFetch;