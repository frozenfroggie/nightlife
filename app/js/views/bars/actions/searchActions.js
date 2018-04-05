import { SEARCH_ERROR, HANDLE_CITY_INPUT_CHANGE, HANDLE_BARS_INPUT_CHANGE, SAVE_SEARCH_DATA, SAVE_FILTERED_SEARCH_DATA, START_SEARCHING, DELETE_SEARCH_DATA } from '../../../constants/actionTypes';
import axios from 'axios';

export const handleCityInputChange = event => ({
  type: HANDLE_CITY_INPUT_CHANGE,
  payload: event.target.value
});

export const forceCityInputChange = city => ({
  type: HANDLE_CITY_INPUT_CHANGE,
  payload: city
});

export const handleBarsInputChange = event => ({
  type: HANDLE_BARS_INPUT_CHANGE,
  payload: event.target.value
});

const startSearching = () => ({
  type: START_SEARCHING
})

const saveSearchData = data => ({
  type: SAVE_SEARCH_DATA,
  payload: data
});

export const saveFilteredSearchData = data => ({
  type: SAVE_FILTERED_SEARCH_DATA,
  payload: data
});

const searchError = () => ({
    type: SEARCH_ERROR
});

export function search(city) {
  return function(dispatch) {
    dispatch(startSearching());
    return axios.get(`/search/${city}`)
      .then(res => dispatch(saveSearchData(res.data.businesses)))
      .catch(err => dispatch(searchError()));
  }
}

export const deleteSearchData = () => ({
  type: DELETE_SEARCH_DATA
});
