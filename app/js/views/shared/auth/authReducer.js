import { SAVE_USER, SAVE_ERRORS } from '../../../constants/actionTypes';
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
        isAuthenticated: !isEmpty(action.payload)
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
