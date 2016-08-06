import { combineReducers } from 'redux-loop';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';

const reducers = combineReducers({
  reduxAsyncConnect,
  form,
  routing
});

export default reducers;
