require('babel-core/register');
var webpack = require('webpack')

var webpackConfig = require('./webpack/dev.config')

module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: !!process.env.CI,

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      instrumenterOptions: {
        istanbul: {
          includeAllSources : true
        }
      },
      reporters: [
        { type: 'lcovonly', subdir: '.' },
        { type: 'html', subdir: '.' },
        { type: 'json', subdir: '.' },
        { type: 'text-summary' }
      ]
    },

    plugins: [
      'karma-webpack',
      'karma-chai',
      'karma-mocha',
      'karma-sinon',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader'
    ],

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    }
  })
}
