import { combineReducers } from 'redux-loop';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';
import holidays from './holidays';

const reducers = combineReducers({
  reduxAsyncConnect,
  form,
  routing,
  holidays
});

export default reducers;
