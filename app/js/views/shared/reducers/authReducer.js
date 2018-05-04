import { SAVE_USER, SAVE_ERRORS, REMOVE_BAR_FROM_USER } from '../../../constants/actionTypes';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  user: {},
  isAuthenticated: false,
  errors: []
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: !isEmpty(action.user)
      }
    case REMOVE_BAR_FROM_USER:
      return {
        ...state,
        user: {
          ...state.user,
          bars: state.user.bars.filter(bar => bar.id !== action.id)
        }
      }
    case SAVE_ERRORS:
      return {
        ...state,
        errors: action.user
      }
    default:
      return state;
  }
};

export default userReducer;
