const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require(`../webpack/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}.config`);
const babelLoaderQuery = require('../webpack/babelLoaderQuery')


module.exports = (storybookBaseConfig) => {
  return Object.assign({}, storybookBaseConfig, {
    module: {
      loaders: [
        {
          test: /\.styl$/,
          exclude: /node_modules/,
          loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer!stylus?outputStyle=expanded&sourceMap'
        },
        { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel', query: babelLoaderQuery() },
        { test: /\.js?$/, exclude: /node_modules/, loader: 'babel', query: babelLoaderQuery() },
        ...config.module.loaders.filter((item, index) => index !== 0 && index !== 2)
      ]
    },
    resolve: config.resolve
  })
}
