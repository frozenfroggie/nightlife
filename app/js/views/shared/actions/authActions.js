import axios from 'axios';

import { SAVE_USER, SAVE_ERRORS } from '../../../constants/actionTypes';
//import setAuthorizationToken from './utils/setAuthorizationToken';

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

                  console.log('res', res);

                  const authToken = res.headers.authorization.split(' ')[1];
                  console.log(authToken);
                  try {
                    sessionStorage.setItem('authToken', authToken);

                    const refreshToken = res.data.refreshToken;
                    localStorage.setItem('refreshToken', refreshToken);

                    // const time_to_logout = Date.now() + 60000;
                    // localStorage.setItem('timer', JSON.stringify(time_to_logout));
                  } catch(err) {
                    console.log(err);
                  }
                  dispatch(saveUser(res.data.user));
                  return res;
                })
                .catch(err => {
                  console.log('catch', err.response);
                  console.log('catch', err.response.data.errors);
                  throw err.response.data.errors;
                });
  }
}

export function socialAuth(type) {
  return dispatch => {
    return axios.get(`/auth/${type}`)
                .then(res => {
                  dispatch(saveUser(res.data.user));
                  return res;
                })
                .catch(err => {
                  console.log('catch', err.response);
                  throw err.response;
                });
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/users/login', data)
                .then(res => {

                  const authToken = res.headers.authorization.split(' ')[1];
                  sessionStorage.setItem('authToken', authToken);

                  const refreshToken = res.data.refreshToken;
                  localStorage.setItem('refreshToken', refreshToken);

                  // const time_to_logout = Date.now() + 60000;
                  // localStorage.setItem('timer', JSON.stringify(time_to_logout));

                  dispatch(saveUser(res.data.user));
                  return res;
                })
                .catch(err => {
                  throw err.response
                });
  }
}

export function logout() {
  return dispatch => {
    dispatch(saveUser({}));
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/users/search/${identifier}`);
  }
}
