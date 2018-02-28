import { createStore, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';
import combinedReducers from './combinedReducers';
import { loadState, saveState } from './localStorage';
import thunk from 'redux-thunk';

const middlewares = [];
middlewares.push(thunk);
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const configureStore = () => {
  const persistedState = loadState();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combinedReducers,
    persistedState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );

  store.subscribe(throttle(() => {
    saveState({authReducer: store.getState().authReducer});
  }, 1000));

  return store;
};

export default configureStore;
