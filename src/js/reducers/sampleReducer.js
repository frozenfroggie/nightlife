import { SAMPLE_ACTION, LOAD_DATA, LOADING_IMAGE } from '../constants/actionTypes';

const sampleReducer = (state = {sampleInput: []}, action) => {
  switch(action.type) {
  case SAMPLE_ACTION:
    return {
      ...state,
      sampleInput: action.payload
    };
  case LOAD_DATA:
    return {
      ...state,
      sampleInput: action.payload
    };
  case LOADING_IMAGE:
    return {
      ...state,
      loading: action.payload
    }
  default:
    return state;
  }
};

export default sampleReducer;
