import { HANDLE_CITY_INPUT_CHANGE, HANDLE_BARS_INPUT_CHANGE, SAVE_SEARCH_DATA, SAVE_FILTERED_SEARCH_DATA, SET_ACTIVE_BAR, START_SEARCHING, DELETE_SEARCH_DATA } from '../../../constants/actionTypes';

const searchReducer = (state = { cityInputValue: '', barsInputValue: '', searchData: [], filteredSearchData: [], isSearching: false }, action) => {
  switch(action.type) {
    case HANDLE_CITY_INPUT_CHANGE:
      return {
        ...state,
        cityInputValue: action.payload
      }
    case HANDLE_BARS_INPUT_CHANGE:
      return {
        ...state,
        barsInputValue: action.payload
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
        filteredSearchData: action.payload,
        isSearching: false
      }
    case SAVE_FILTERED_SEARCH_DATA:
      return {
        ...state,
        filteredSearchData: action.payload
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
