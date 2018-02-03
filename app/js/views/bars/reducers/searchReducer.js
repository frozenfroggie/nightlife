import { HANDLE_INPUT_CHANGE, SAVE_SEARCH_DATA, SET_ACTIVE_BAR, START_SEARCHING, DELETE_SEARCH_DATA } from '../../../constants/actionTypes';

const searchReducer = (state = { inputValue: '', searchData: [], isSearching: false }, action) => {
  switch(action.type) {
    case HANDLE_INPUT_CHANGE:
      return {
        ...state,
        inputValue: action.payload
      }
    case START_SEARCHING:
      return {
        ...state,
        isSearching: true
      }
    case SAVE_SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload,
        isSearching: false
      }
    case DELETE_SEARCH_DATA:
      return {
        ...state,
        searchData: [],
        isSearching: false
      }
    default:
      return state;
  }
};

export default searchReducer;
