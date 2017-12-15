import { HANDLE_INPUT_CHANGE, SAVE_SEARCH_DATA, SET_ACTIVE_BAR } from '../../../constants/actionTypes';

const searchReducer = (state = { inputValue: '', searchData: [] }, action) => {
  switch(action.type) {
    case HANDLE_INPUT_CHANGE:
      return {
        ...state,
        inputValue: action.payload
      }
    case SAVE_SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload
      }
    default:
      return state;
  }
};

export default searchReducer;
