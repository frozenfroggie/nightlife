import { TOOGLE_EXPAND_MENU, UPDATE_WINDOW_DIMENSIONS } from '../../../constants/actionTypes';

const menuReducer = (state = {expandMenu: false}, action) => {
  switch(action.type) {
    case TOOGLE_EXPAND_MENU:
      return {
        ...state,
        expandMenu: !state.expandMenu
      }
    default:
      return state;
  }
};

export default menuReducer;
