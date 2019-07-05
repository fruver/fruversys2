import * as React from 'react';

import CatAPI from '../CatAPI';

interface BrandProps {
  id: number;
  name: string;
  date_created: Date;
}

interface ProductProps {
  id: number;
  name: string;
}

interface CategoryProps {
  id: number;
  name: string; 
}

export type ObjectsProps = BrandProps | ProductProps | CategoryProps;

const useListView = (url: string) => {
  const [objects, setObjects] = React.useState<ObjectsProps[]>([]);
  const [errors, setErrors] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    CatAPI.listView(url).then(resp => {
      setObjects(resp);
    }).catch(reason => {
      setErrors(reason);
    }).finally(() => setIsLoading(false));
  }, [url]);

  return [{objects, errors, isLoading}];
};

export default useListView;