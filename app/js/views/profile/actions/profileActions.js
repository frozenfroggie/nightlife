import axiosNightlife from '../../../utils/axiosNightlife';

import { SAVE_USER } from '../../../constants/actionTypes';

export const saveUser = user => ({
  type: SAVE_USER,
  user
});

export function uploadAvatar(avatar) {
  return dispatch => {
    return axiosNightlife.post('/users/uploadAvatar', { avatar })
                .then(res => {
                  console.log(req.data);
                })
                .catch(err => {
                  throw err;
                });
  }
}
