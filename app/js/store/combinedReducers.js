import { combineReducers } from 'redux';
import searchReducer from '../views/bars/reducers/searchReducer';
import scrollReducer from '../views/shared/reducers/scrollReducer';
import menuReducer from '../views/shared/reducers/menuReducer';
import authReducer from '../views/shared/reducers/authReducer';
import activityReducer from '../views/bars/reducers/activityReducer';
import titleReducer from '../views/home/reducers/titleReducer';

const combinedReducers = combineReducers({
  menuReducer,
  searchReducer,
  scrollReducer,
  activityReducer,
  titleReducer,
  authReducer
});

export default combinedReducers;
