import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import menuReducer from './menuReducer';

const combinedReducers = combineReducers({
  sampleReducer,
  menuReducer,
});

export default combinedReducers;
