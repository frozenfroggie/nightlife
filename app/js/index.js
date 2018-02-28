import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import '../styles/index.scss';
import configureStore from './store/configureStore';
import App from './views/app/App';
import setAuthorizationToken from './views/shared/auth/utils/setAuthorizationToken';
//import { saveUser } from './views/app/actions/authActions';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  //store.dispatch(saveUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
