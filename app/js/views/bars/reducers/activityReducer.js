import { SET_ACTIVE_BAR, SAVE_SEARCH_DATA } from '../../../constants/actionTypes';

const activityReducer = (state = { activeBar: null }, action) => {
  switch(action.type) {
    case SET_ACTIVE_BAR:
      return {
        ...state,
        activeBar: action.payload
      }
    case SAVE_SEARCH_DATA:
      return {
        ...state,
        activeBar: null
      }

    default:
      return state;
  }
};

export default activityReducer;
