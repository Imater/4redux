import { handleActions } from 'redux-actions';
import { loop, Effects } from 'redux-loop';

import client from 'helpers/apiClient';

const LOAD = '4redux/settings/LOAD';
const LOAD_SUCCESS = '4redux/settings/LOAD_SUCCESS';
const LOAD_FAIL = '4redux/settings/LOAD_FAIL';

const initialState = {
  loaded: false
};

const fetchSettings = () =>
  client.get('/loadSettings')
    .then(result =>
      ({
        type: LOAD_SUCCESS,
        result: result.data
      })
    )
    .catch(error =>
      ({
        type: LOAD_FAIL,
        error: error.data
      })
    );

const settings = handleActions({
  [LOAD_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    data: action.result.data
  }),

  [LOAD_FAIL]: (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.error
  }),

  [LOAD]: state => loop(
    {
      ...state,
      loaded: false,
      loading: true
    },
    Effects.batch([
      Effects.promise(fetchSettings)
    ])
  )
}, initialState);

export default settings;

export function isLoaded(globalState) {
  return globalState.settings && globalState.settings.loaded;
}

export const loadSettings = () =>
  ({
    type: LOAD
  });
