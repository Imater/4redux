// Webpack config for development
import 'babel-polyfill'
import HappyPack from 'happypack'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import babelLoaderQuery from './babelLoaderQuery'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

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
      `babel-loader?${JSON.stringify(babelLoaderQuery())}`,
    ],
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.IgnorePlugin(/webpack-stats\.json$/),
  new ExtractTextPlugin({ filename: 'styles.css' }),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true
  }),
  webpackIsomorphicToolsPlugin.development()
]


module.exports = {
  devtool: 'source-map',
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
    noParse: [
      /node_modules\/sinon\//
    ],
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.styl$/, exclude: /node_modules/, loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 2 version!stylus-loader?outputStyle=expanded&sourceMap' },
      { test: /\.less$/, exclude: /node_modules/, loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 2 version!less-loader?outputStyle=expanded&sourceMap' },
      { test: /\.scss$/, exclude: /node_modules/, loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&sourceMap' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /icons/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, exclude: /fonts|theme/, loader: "raw-loader" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': ''
  },
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon'
    },
    modules: [
      'node_modules',
      'src'
    ],
    extensions: ['/', '.json', '.js', '.jsx']
  },
  plugins
}
