#!/usr/bin/env node
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
require('../server.babel'); // babel registration (runtime transpilation for node)
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = process.env.__DISABLE_SSR__ || false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({ // eslint-disable-line global-require
    hook: true,
    ignore: /(\/\.|~$|\.json|\.less|\.scss$)/i
  })) {
    return;
  }
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');  // eslint-disable-line global-require
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))  // eslint-disable-line global-require
  .development(__DEVELOPMENT__)
  .server(rootDir, () => {
    require('../src/server'); // eslint-disable-line global-require
  });
