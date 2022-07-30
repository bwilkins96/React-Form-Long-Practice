import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';

const Root = () => {
  return (
    <BrowserRouter>
      <Route path="/">
        <App />
      </Route>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
    <Root />
  //</React.StrictMode>,
);

//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);
