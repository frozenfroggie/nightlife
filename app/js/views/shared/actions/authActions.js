import axios from 'axios';

import { SAVE_USER, SAVE_ERRORS } from '../../../constants/actionTypes';

export const saveUser = user => ({
  type: SAVE_USER,
  user
});

export const saveErrors = errors => ({
  type: SAVE_ERRORS,
  errors
});

export function disconnect(socialName) {
  return dispatch => {
    return axios.delete(`/disconnect/${socialName}`)
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                });
  }
}

export function signup(data) {
  return dispatch => {
    return axios.post('/users', data)
                .then(res => {

                  const authToken = res.headers.authorization.split(' ')[1];
                  const refreshToken = res.data.refreshToken;
                  try {
                    sessionStorage.setItem('authToken', authToken);
                    localStorage.setItem('refreshToken', refreshToken);
                  } catch(err) {
                    console.log(err);
                  }
                  dispatch(saveUser(res.data.user));
                  return res;
                })
                .catch(err => {
                  console.log('catch', err.response);
                  throw err.response.data.errors;
                });
  }
}

export function socialAuth(type) {
  return dispatch => {
    return axios.get(`/auth/${type}`)
                .then(res => {
                  console.log('social', res.data);
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
                  console.log(res.data);
                  console.log(res.headers.authorization);
                  const authToken = res.headers.authorization.split(' ')[1];
                  sessionStorage.setItem('authToken', authToken);

                  const refreshToken = res.data.refreshToken;
                  localStorage.setItem('refreshToken', refreshToken);

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
    return axios.delete('/socialAuth/logout');
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/users/search/${identifier}`);
  }
}
