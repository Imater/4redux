/* eslint-disable react/jsx-filename-extension */
/**
 * ENTRY POINT FOR THE CLIENT
 */
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, match, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import Perf from 'react-addons-perf'
import createStore from './store/create'

import getRoutes from './routes'

const dest = document.getElementById('content')
const store = createStore(browserHistory, window.__data)
const history = syncHistoryWithStore(browserHistory, store)

// function initSocket() {
//   const socket = io('', { path: '/ws' })
//   socket.on('news', data => {
//     console.log(data)
//     socket.emit('my other event', { my: 'data from client' })
//   })
//   socket.on('msg', data => {
//     console.log(data)
//   })
//
//   return socket
// }

// global.socket = initSocket(); // remove unused socket
global.Perf = Perf

const getFilter = item => !item.deferred

const getReduxAsyncConnect = renderProps =>
  <div>
    <ReduxAsyncConnect {...renderProps} />
  </div>

match({ history, routes: getRoutes(store) }, (/* error, redirectLocation, renderProps */) => {
  render(
    <Provider store={store} key='provider'>
      <Router
        render={getReduxAsyncConnect}
        history={history}
      >
        {getRoutes(store)}
      </Router>
    </Provider>,
    dest
  )
})

if (process.env.NODE_ENV !== 'production') {
  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.') // eslint-disable-line no-console
  }

  // const { whyDidYouUpdate } = require('why-did-you-update');  // eslint-disable-line global-require
  //
  // whyDidYouUpdate(React, {
  //   include: /^ProductList$/
  // });
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools') // eslint-disable-line global-require

  match({ history, routes: getRoutes(store) }, (error, redirectLocation, renderProps) => {
    render(
      <Provider store={store} key='provider'>
        <div>
          <ReduxAsyncConnect {...renderProps} helpers={{}} filter={getFilter} />
          <DevTools />
        </div>
      </Provider>,
      dest
    )
  })
}
