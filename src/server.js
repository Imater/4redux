/* eslint-disable react/jsx-filename-extension */
import path from 'path'
import http from 'http'
import Express from 'express'
import PrettyError from 'pretty-error'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import favicon from 'serve-favicon'
import compression from 'compression'
import bodyParser from 'body-parser'
import httpProxy from 'http-proxy'
import cookieParser from 'cookie-parser'
import reactCookie from 'react-cookie'
import { match } from 'react-router'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import { syncHistoryWithStore } from 'react-router-redux'
import createHistory from 'react-router/lib/createMemoryHistory'
import { Provider } from 'react-redux'
import Html from './helpers/Html'
import config from './config'
import createStore from '../src/store/create'
import createRoutes from './routes'

const targetUrl = `http://${config.apiHost}:${config.apiPort}`
const pretty = new PrettyError()
const app = new Express()
const server = new http.Server(app)
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  auth: 'dev.moygrafik.ru:JndO3jdZ',
  xfwd: false,
  ws: true
})

const targetUrlApi = `http://${config.apiRemoteServer}:${config.apiRemoteServerPort}/api`
const proxyApi = httpProxy.createProxyServer({
  target: targetUrlApi,
  auth: 'dev.moygrafik.ru:JndO3jdZ',
  xfwd: false,
  changeOrigin: true
})

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use(favicon(path.join(__dirname, '..', 'static', 'image', 'favicon.gif')))

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3031',
    'http://localhost:3031',
    'http://relef.csssr.ru']
  const origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use(Express.static(path.join(__dirname, '..', 'static')))

if (config.prefix) {
  app.use(config.prefix, Express.static(path.join(__dirname, '..', 'static')))
}

const printError = error =>
  error.code !== 'ECONNRESET' && console.error('proxy error', error) // eslint-disable-line no-console

const errorHandler = (error, req, res) => {
  printError(error)
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }

  res.end(JSON.stringify({ error: 'proxy_error', reason: error.message }))
}

// Proxy to API server
app.use('/api', (req, res) => {
  proxyApi.web(req, res, { target: targetUrlApi })
})
proxyApi.on('error', errorHandler)

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/ws` })
})

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head)
})

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', errorHandler)

// eslint-disable-next-line complexity
app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }

  reactCookie.setRawCookie(req.headers.cookie)
  reactCookie.plugToRequest(req, res)

  const historyNotSync = createHistory(req.originalUrl)

  const store = createStore(historyNotSync, {
    userAgent: req.headers['user-agent']
  })
  const history = syncHistoryWithStore(historyNotSync, store)
  const assets = webpackIsomorphicTools.assets()

  // assets.styles.z_datePicker = `${config.prefix}/DatePicker.css` to add css to index.html

  function hydrateOnClient() {
    res.send(`<!doctype html>\n
      ${renderToStaticMarkup(<Html assets={assets} store={store} />)}`)
  }

  if (__DISABLE_SSR__) {
    console.log('render on client only') // eslint-disable-line no-console
    hydrateOnClient()
    return
  }

  // eslint-disable-next-line complexity
  match({ history, routes: createRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error)) // eslint-disable-line no-console
      res.status(500)
      hydrateOnClient()
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store, helpers: {} }).then(() => {
        const component = (
          <Provider store={store} key='provider'>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )

        res.status(200)

        global.navigator = { userAgent: req.headers['user-agent'] }

        res.send(`<!doctype html>\n
          ${renderToString(<Html assets={assets} component={component} store={store} />)}`)
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})

if (config.port) {
  server.listen(config.port, err => {
    if (err) {
      console.error(err) // eslint-disable-line no-console
    }
    console.log('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort)  // eslint-disable-line no-console
    console.log('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port) // eslint-disable-line no-console
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified') // eslint-disable-line no-console
}

