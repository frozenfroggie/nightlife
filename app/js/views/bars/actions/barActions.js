import { SET_ACTIVE_BAR, SAVE_USER } from '../../../constants/actionTypes';
import { logout } from '../../shared/actions/authActions';
import axios from 'axios';

export const setActiveBar = barIdx => ({
  type: SET_ACTIVE_BAR,
  payload: barIdx
});

export const saveUser = user => ({
  type: SAVE_USER,
  user
});

export function wantToGo(bar) {
  return dispatch => {
    return axios.patch('/users', {bar})
                .then(res => {
                  dispatch(saveUser(res.data.user));
                })
                .catch(err => {
                  throw err;
                });
  }
}

export function removeBarFromUser(id) {
  return dispatch => {
    return axios.delete(`/users/${id}`)
                .then(res => {
                  console.log(res);
                  dispatch(saveUser(res.data.user));
                })
                .catch(err => {
                  console.log(err);
                  dispatch(logout());
                });
  }
}
