import axiosNightlife from '../../../utils/axiosNightlife';

import { SAVE_USER } from '../../../constants/actionTypes';

export const saveUser = user => ({
  type: SAVE_USER,
  user
});

export function uploadAvatar(formData) {
  return dispatch => {
    console.log('before send', formData);
    return axiosNightlife.post('/users/uploadAvatar', formData)
                .then(res => {
                  console.log('after send', req.data);
                })
                .catch(err => {
                  throw err;
                });
  }
}
