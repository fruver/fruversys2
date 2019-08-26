import * as React from 'react';
import LayoutBase from '../components/LayoutBase';

const Summary = () => {
  const title = 'Panel';

  return (
    <LayoutBase title={title}>
      {title}
    </LayoutBase>
  );
};

export default Summary;