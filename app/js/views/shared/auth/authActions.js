import axios from 'axios';

import { SAVE_USER, SAVE_ERRORS } from '../../../constants/actionTypes';
import setAuthorizationToken from './utils/setAuthorizationToken';

export const saveUser = user => ({
  type: SAVE_USER,
  user
});

export const saveErrors = errors => ({
  type: SAVE_ERRORS,
  errors
});

export function signup(data) {
  return dispatch => {
    return axios.post('/users', data)
                .then(res => {
                  const token = res.headers.authorization.split(' ')[1];
                  localStorage.setItem('jwtToken', token);
                  setAuthorizationToken(token);
                  dispatch(saveUser(res.data));
                  return res;
                })
                .catch(err => {
                  throw err.response.data.errors;
                });
  }
}


export function login(data) {
  return dispatch => {
    return axios.post('/users/login', data)
                .then(res => {
                  const token = res.headers.authorization.split(' ')[1];
                  localStorage.setItem('jwtToken', token);
                  setAuthorizationToken(token);
                  dispatch(saveUser(res.data));
                  return res;
                })
                .catch(err => {
                  throw err.response.data.errors;
                });
  }
}

export function logout() {
  return dispatch => {
    dispatch(saveUser({}));
    setAuthorizationToken(false);
    localStorage.removeItem('jwtToken');
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/users/search/${identifier}`);
  }
}
