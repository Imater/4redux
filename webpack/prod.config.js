require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
var prefix = process.env.PREFIX || ''
module.exports = {
  // devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'theme/optimize.js',
      'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
      './src/client.js',
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: prefix + '/dist/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel-loader'] },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=2&sourceMap!autoprefixer-loader?browsers=last 2 version!stylus-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=2&sourceMap!autoprefixer-loader?browsers=last 2 version!less-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=2&sourceMap!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
        })
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /icons/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, exclude: /fonts|theme/, loader: "raw-loader" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['/', '.json', '.js', '.jsx']
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({ filename: '[name]-[chunkhash].css', allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: false
    //   // compress: {
    //   //   warnings: false
    //   // }
    // }),

    webpackIsomorphicToolsPlugin
  ]
};
