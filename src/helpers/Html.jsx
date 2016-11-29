/* eslint-disable global-require, react/no-danger, react/forbid-prop-types */
import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import config from '../config'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
const Html = ({ assets, component, store }) => {
  const content = component ? renderToString(component) : ''
  const head = Helmet.rewind()

  return (
    <html lang='en-US'>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel='shortcut icon' href={`${config.prefix}/image/favicon.gif`} />

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta httpEquiv='X-UA-Compatible' content='IE=9' />

        {/* Fonts */}
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{ __html: require('../theme/font-awesome.config.js') }} /> : null}
        {Object.keys(assets.styles).sort((a, b) => a < b ? 1 : -1).map((style, key) =>
          <link
            href={assets.styles[style]}
            key={key}
            media='screen, projection'
            rel='stylesheet' type='text/css' charSet='UTF-8'
          />
        )}
      </head>
      <body>
        <div id='content' dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} charSet='UTF-8' />
        <script src={assets.javascript.main} charSet='UTF-8' />
      </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object
}

export default Html
