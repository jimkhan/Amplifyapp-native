import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

const middleWare = [thunk];

import rootReducer from './reducer';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleWare),
);

export default store;
