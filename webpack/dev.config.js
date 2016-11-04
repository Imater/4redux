// Webpack config for development
import 'babel-polyfill'
import HappyPack from 'happypack'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import babelLoaderQuery from './babelLoaderQuery'

var host = (process.env.HOST || 'localhost')
var port = parseInt(process.env.PORT, 10) || 3001

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

var babelrc = fs.readFileSync('./.babelrc')
var babelrcObject = {}

try {
  babelrcObject = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.')
  console.error(err)
}

const plugins = [
  new HappyPack({
    loaders: [
      'transform-loader?envify',
      `babel?${JSON.stringify(babelLoaderQuery())}`,
    ],
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.IgnorePlugin(/webpack-stats\.json$/),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true
  }),
  webpackIsomorphicToolsPlugin.development()
]


module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './src/theme/optimize.js',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      'font-awesome-webpack!./src/theme/font-awesome.config.js',
      './src/client.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.styl$/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!stylus?outputStyle=expanded&sourceMap' },
      { test: /\.less$/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
      { test: /\.scss$/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "raw-loader" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  progress: false,
  resolve: {
    modules: [
      'node_modules'
    ],
    // TODO eslint-plugin-resole-webpack not support webpack@2 `resolve.modules` path
    // https://github.com/benmosher/eslint-plugin-import/pull/319
    // Waiting for merge this PR or webpack-2 resolver will be implemented as plugin
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins
}
