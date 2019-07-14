import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './app';

const AppRouter = () => {
  return(
    <Router>
      <App />
    </Router>
  );
};

ReactDOM.render(
  <AppRouter />,
  document.getElementById('app')
);