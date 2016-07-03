require('babel-polyfill'); // eslint-disable-line import/no-require

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

export default Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  apiAuth: {
    client_id: 'node_thing',
    client_secret: 'e4c25cec64c71d10001ae4c768fb9fc76c5191be'
  },
  authServer: 'http://connect.4redux.ru',
  apiServer: 'http://api.4redux.ru',
  app: {
    title: '4redux',
    description: 'redux boilerplate',
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: 'Big distribution store' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Redux template' },
        { property: 'og:image', content: 'http://4redux.ru/images/logo.png' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: '4redux' },
        { property: 'og:description', content: 'Big distribution store' },
        { property: 'og:card', content: 'Gaze from your telescope' },
        { property: 'og:site', content: '@imater' },
        { property: 'og:creator', content: '@imater' },
        { property: 'og:image:width', content: '104' },
        { property: 'og:image:height', content: '41' }
      ]
    }
  }
}, environment);
