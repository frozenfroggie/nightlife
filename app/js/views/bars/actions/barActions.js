import { SET_ACTIVE_BAR, SAVE_USER } from '../../../constants/actionTypes';
import axios from 'axios';

export const setActiveBar = barIdx => ({
  type: SET_ACTIVE_BAR,
  payload: barIdx
});

export const saveUser = user => ({
  type: SAVE_USER,
  payload: user
});

export function wantToGo(bar) {
  return dispatch => {
    return axios.patch('/users', bar)
                .then(res => {
                  dispatch(saveUser(res.data));
                })
                .catch(err => {
                  console.log(err);
                });
  }
}
