import * as React from 'react';

import CatAPI from '../CatAPI';
import {BrandProps, CategoryProps} from '../constants/types';

type OptionsProps = BrandProps[]|CategoryProps[];

const useOptions = (url: string) => {
  const [options, setOptions] = React.useState<OptionsProps>([]);

  React.useEffect(() => {  
    CatAPI.Fetch(url).then(resp => {
      const newOptions = resp.map((opt: BrandProps|CategoryProps) => ({
        label: opt.name,
        value: opt.id
      }));
      setOptions(newOptions);
    }).catch(reason => {
      console.log(reason.message);
    });
  }, [url]);

  return options;
};

export default useOptions;