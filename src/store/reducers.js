import { combineReducers } from 'redux-loop'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'
import { reducer as form } from 'redux-form'

export const makeRootReducer =
  asyncReducers =>
    combineReducers({
      // Add sync reducers here
      reduxAsyncConnect,
      form,
      routing,
      ...asyncReducers
    })

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
