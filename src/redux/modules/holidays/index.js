import { createReducer, createAction } from 'redux-act';

export const fetchSuccess = createAction('4redux/holidays/getHolidaysSuccess');

const holidaysData = {
  '01-08': {
    title: 'День рождения'
  },
  '01-29': {
    title: 'На работу'
  }
};

const initialState = {
  data: {}
};

const handleFetchSuccess = (state, payload) => {
  return {
    ...state,
    data: holidaysData
  };
};

const reducer = createReducer(on => {
  on(fetchSuccess, handleFetchSuccess);
}, initialState);

export default reducer;
