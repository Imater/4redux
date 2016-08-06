import { combineReducers } from 'redux-loop';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';

import settings from './settings';

const reducers = combineReducers({
  reduxAsyncConnect,
  form,
  settings,
  routing
});

export default reducers;
