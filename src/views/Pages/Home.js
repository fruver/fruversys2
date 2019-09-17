import React from 'react';
import LayoutBase from '../../components/LayoutBase';

const Home = () => {
  const title = 'Panel';

  return (
    <LayoutBase title={title}>
      {title}
    </LayoutBase>
  );
};

export default Home;