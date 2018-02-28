import { HANDLE_INPUT_CHANGE, SAVE_SEARCH_DATA, START_SEARCHING, DELETE_SEARCH_DATA } from '../../../constants/actionTypes';

export const handleInputChange = event => ({
  type: HANDLE_INPUT_CHANGE,
  payload: event.target.value
});

const startSearching = () => ({
  type: START_SEARCHING
})

const saveSearchData = data => ({
  type: SAVE_SEARCH_DATA,
  payload: data
});

export function search(city) {
  return function(dispatch) {
    dispatch(startSearching());
    return fetch('/search/' + city)
      .then( res => res.json())
      .then( json => {
        dispatch(saveSearchData(json.businesses));
      });
  }
}

export const deleteSearchData = () => ({
  type: DELETE_SEARCH_DATA
});
