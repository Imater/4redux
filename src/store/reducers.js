import { combineReducers } from 'redux-loop'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { reducer as form } from 'redux-form'
import dictsReducers from './dicts'
import updateData from './updateData'

export const makeRootReducer =
  asyncReducers =>
    combineReducers({
      // Add sync reducers here
      routing,
      reduxAsyncConnect,
      form,
      ...dictsReducers,
      ...asyncReducers,
      updateData
    })

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
