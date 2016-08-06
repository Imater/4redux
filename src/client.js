/**
 * ENTRY POINT FOR THE CLIENT
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import Perf from 'react-addons-perf';
import createStore from './redux/create';

import getRoutes from './routes';

const dest = document.getElementById('content');
const store = createStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

function initSocket() {
  const socket = io('', { path: '/ws' });
  socket.on('news', data => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', data => {
    console.log(data);
  });

  return socket;
}

// global.socket = initSocket(); // remove unused socket
global.Perf = Perf;

const component = (
  <Router
    render={props =>
      <ReduxAsyncConnect {...props} helpers={{}} filter={item => !item.deferred} />
    }
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

render(
  <Provider store={store} key='provider'>
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }

  // const { whyDidYouUpdate } = require('why-did-you-update');  // eslint-disable-line global-require
  //
  // whyDidYouUpdate(React, {
  //   include: /^ProductList$/
  // });
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools'); // eslint-disable-line global-require
  render(
    <Provider store={store} key='provider'>
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest,
    Perf.start
  );
}

