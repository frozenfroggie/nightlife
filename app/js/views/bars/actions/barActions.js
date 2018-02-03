import { SET_ACTIVE_BAR } from '../../../constants/actionTypes';

export const setActiveBar = barIdx => ({
  type: SET_ACTIVE_BAR,
  payload: barIdx
});
