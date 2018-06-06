import axiosNightlife from '../../../utils/axiosNightlife';

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
    return axiosNightlife.delete(`/socialAuth/disconnect/${socialName}`)
                .then(res => {
                  console.log(res);
                  dispatch(saveUser(res.data.user));
                })
                .catch(err => {
                  console.log(err);
                });
  }
}

export function signup(data) {
  return dispatch => {
    return axiosNightlife.post('/users', data)
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
    return axiosNightlife.get(`/auth/${type}`)
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
    console.log(data);
    return axiosNightlife.post('/users/login', data)
                .then(res => {
                  console.log('res', res);
                  console.log('resDataAuthorization', res.data.authorization);

                  const authToken = res.data.authorization;
                  sessionStorage.setItem('authToken', authToken);

                  const refreshToken = res.data.refreshToken;
                  localStorage.setItem('refreshToken', refreshToken);

                  dispatch(saveUser(res.data.user));
                  return res;
                })
                .catch(err => {
                  console.log('errS', err);
                  throw err.response
                });
  }
}

export function logout() {
  return dispatch => {
    dispatch(saveUser({}));
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    return axiosNightlife.delete('/socialAuth/logout');
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axiosNightlife.get(`/users/search/${identifier}`);
  }
}
