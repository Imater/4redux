import path from 'path';
import http from 'http';
import Express from 'express';
import PrettyError from 'pretty-error';
import React from 'react';
import { renderToString } from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import httpProxy from 'http-proxy';
import cookieParser from 'cookie-parser';
import reactCookie from 'react-cookie';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import Html from './helpers/Html';
import config from './config';
import createStore from '../src/redux/create';
import getRoutes from './routes';

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  xfwd: false,
  ws: true
});

const authUrl = `${config.authServer}`;
const targetUrlAuth = `${authUrl}/oauth`;
const proxyAuth = httpProxy.createProxyServer({
  target: targetUrlAuth,
  xfwd: false,
  changeOrigin: true
});

const apiUrl = `${config.apiServer}`;
const targetUrlApi = `${apiUrl}/v1`;
const proxyApi = httpProxy.createProxyServer({
  target: targetUrlApi,
  xfwd: false,
  changeOrigin: true
});

const targetUrlUpload = `${apiUrl}/upload`;
const proxyUpload = httpProxy.createProxyServer({
  target: targetUrlUpload,
  xfwd: false,
  changeOrigin: true
});

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard relef', resave: false, saveUninitialized: false }));

app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3031',
    'http://localhost:3031',
    'http://relef.csssr.ru'];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(Express.static(path.join(__dirname, '..', 'static')));

const errorHandler = (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  res.end(JSON.stringify({ error: 'proxy_error', reason: error.message }));
};

// Proxy to oauth API server
app.use('/oauth', (req, res) => {
  proxyAuth.web(req, res, { target: targetUrlAuth });
});
proxyAuth.on('error', errorHandler);

// Proxy to API server
app.use('/v1', (req, res) => {
  proxyApi.web(req, res, { target: targetUrlApi });
});
proxyApi.on('error', errorHandler);

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});
proxy.on('error', errorHandler);

// Proxy to Upload server
app.use('/upload', (req, res) => {
  proxyUpload.web(req, res, { target: targetUrlUpload });
});
proxyUpload.on('error', errorHandler);

// Proxy to Upload server
app.use('/home/relefopt/beta.relefopt.ru/www/upload/', (req, res) => {
  proxyUpload.web(req, res, { target: targetUrlUpload });
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/ws` });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', errorHandler);

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  reactCookie.setRawCookie(req.headers.cookie);
  reactCookie.plugToRequest(req, res);

  const historyNotSync = createHistory(req.originalUrl);

  const store = createStore(historyNotSync, {
    userAgent: req.headers['user-agent']
  });
  const history = syncHistoryWithStore(historyNotSync, store);
  function hydrateOnClient() {
    res.send(`<!doctype html>\n
             ${renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />)}`);
  }

  if (__DISABLE_SSR__) {
    console.info('render on client only');
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store, helpers: {} }).then(() => {
        const component = (
          <Provider store={store} key='provider'>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        global.navigator = { userAgent: req.headers['user-agent'] };

        res.send(`<!doctype html>\n
                 ${renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />)}`);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

