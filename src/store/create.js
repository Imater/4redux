import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { install } from 'redux-loop'
import makeReducers from './reducers'

// eslint-disable-next-line complexity
const createStore = (history, data) => {
  const reduxRouterMiddleware = routerMiddleware(history)

  // const middleware = [createMiddleware(client), reduxRouterMiddleware];

  let finalCreateStore
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools') // eslint-disable-line global-require, import/no-extraneous-dependencies
    const DevTools = require('../containers/DevTools/DevTools') // eslint-disable-line global-require

    finalCreateStore = compose(
      install(),
      applyMiddleware(reduxRouterMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore)
  } else {
    finalCreateStore = compose(
      install(),
      applyMiddleware(reduxRouterMiddleware)
    )(_createStore)
  }

  const store = finalCreateStore(makeReducers(), data)

  store.asyncReducers = {}

  // reduxRouterMiddleware.listenForReplays(store);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default // eslint-disable-line global-require

      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

export default createStore
