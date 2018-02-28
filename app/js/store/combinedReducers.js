import { combineReducers } from 'redux';
import menuReducer from '../views/app/reducers/menuReducer';
import authReducer from '../views/shared/auth/authReducer';
import searchReducer from '../views/bars/reducers/searchReducer';
import scrollReducer from '../views/shared/scroll/scrollReducer';
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
