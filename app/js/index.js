import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../styles/index.scss';
import configureStore from './store/configureStore';
import App from './views/app/App';

const store = configureStore();

import './views/shared/utils/setAuthorizationToken';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
