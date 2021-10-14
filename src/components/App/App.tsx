import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { routes } from '@routes/index';
import style from './App.scss';

export const App: React.FC = (): JSX.Element => {
  return (
    <div className={style.componentWrapper}>
      <Router>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Router>
    </div>
  );
};
