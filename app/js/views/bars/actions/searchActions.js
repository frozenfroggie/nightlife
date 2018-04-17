import { SEARCH_ERROR, HANDLE_CITY_INPUT_CHANGE, HANDLE_BARS_INPUT_CHANGE, SAVE_SEARCH_DATA, SAVE_FILTERED_SEARCH_DATA, START_SEARCHING, DELETE_SEARCH_DATA } from '../../../constants/actionTypes';
import axiosNightlife from '../../../utils/axiosNightlife';

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

export function search(city, coordinates) {
  if(!city) {
    return function(dispatch) {
      dispatch(startSearching());
      return axiosNightlife.get(`/search/coordinates?lat=${coordinates.lat}&lng=${coordinates.lng}`)
        .then(res => dispatch(saveSearchData(res.data.businesses)))
        .catch(err => dispatch(searchError()));
    }
  }
  let cityAfterReplace = city.replace(/ą/g, 'a').replace(/Ą/g, 'A')
      .replace(/ć/g, 'c').replace(/Ć/g, 'C')
      .replace(/ę/g, 'e').replace(/Ę/g, 'E')
      .replace(/ł/g, 'l').replace(/Ł/g, 'L')
      .replace(/ń/g, 'n').replace(/Ń/g, 'N')
      .replace(/ó/g, 'o').replace(/Ó/g, 'O')
      .replace(/ś/g, 's').replace(/Ś/g, 'S')
      .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
      .replace(/ź/g, 'z').replace(/Ź/g, 'Z');
  return function(dispatch) {
    dispatch(startSearching());
    return axiosNightlife.get(`/search/${cityAfterReplace}`)
      .then(res => dispatch(saveSearchData(res.data.businesses)))
      .catch(err => dispatch(searchError()));
  }
}

export const deleteSearchData = () => ({
  type: DELETE_SEARCH_DATA
});
