import { LOAD_DATA, LOADING_IMAGE } from '../constants/actionTypes';
import 'isomorphic-fetch';

const loadData = data => ({
  type: LOAD_DATA,
  payload: data
});

const isLoading = bool => ({
  type: LOADING_IMAGE,
  payload: bool
});

export function sampleAsyncAction() {
  return function(dispatch) {
    dispatch(isLoading(true));
    return fetch('https://yesno.wtf/api')
      .then( res => res.json())
      .then( json => {
        dispatch(loadData([json.answer, json.image]));
        dispatch(isLoading(false));
      });
  };
}
