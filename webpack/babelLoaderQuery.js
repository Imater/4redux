const fs = require('fs')
const path = require('path')

const babelrc = fs.readFileSync(path.join(__dirname, '../.babelrc'))
let babelrcObject = {}

module.exports = function getBabelLoaderQuery() {
  try {
    babelrcObject = JSON.parse(babelrc)
  } catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.') // eslint-disable-line no-console
    console.error(err) // eslint-disable-line no-console
  }

  if (process.env.NODE_ENV !== 'development') {
    return babelrcObject
  }

  const babelrcObjectDevelopment = babelrcObject.env ? babelrcObject.env.development : {}

  // merge global and dev-only plugins
  let combinedPlugins = babelrcObject.plugins || []
  combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins)

  var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {
      plugins: combinedPlugins
  });

  delete babelLoaderQuery.env

  // Since we use .babelrc for client and server,
  // and we don't want HMR enabled on the server, we have to add
  // the babel plugin react-transform-hmr manually here.

  // make sure react-transform is enabled
  babelLoaderQuery.plugins = babelLoaderQuery.plugins || []
  let reactTransform = null

  for (let i = 0; i < babelLoaderQuery.plugins.length; i += 1) { // eslint-disable-line id-length
    const plugin = babelLoaderQuery.plugins[i]

    if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
      reactTransform = plugin
    }
  }

  if (!reactTransform) {
    reactTransform = ['react-transform', { transforms: [] }]
    babelLoaderQuery.plugins.push(reactTransform)
  }

  if (!reactTransform[1] || !reactTransform[1].transforms) {
    reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] })
  }

  // make sure react-transform-hmr is enabled
  reactTransform[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module'],
  })

  return babelLoaderQuery
}

