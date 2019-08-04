import * as React from 'react';
import CatAPI from '../CatAPI';

const useOptions = (url: string) => {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {  
    CatAPI.Fetch(url).then(resp => {
      setOptions(resp);
    }).catch(reason => {
      console.log(reason);
    });
  }, [url]);

  return options;
};

export default useOptions;