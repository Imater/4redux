require('babel-polyfill') // eslint-disable-line import/no-require

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

export default Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  // apiRemoteServer: process.env.API_REMOTE_SERVER || 'private-19210-moygrafik.apiary-mock.com',
  apiRemoteServer: process.env.API_REMOTE_SERVER || 'dev.moygrafik.ru',
  apiRemoteServerPort: process.env.API_REMOTE_SERVER_PORT || '80',
  prefix: environment.isProduction ? '/web' : '',
  app: {
    title: 'mg',
    description: 'moyGrafik',
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: 'moyGrafik' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'MyGrafik' },
        { property: 'og:image', content: 'http://stat.moygrafik.ru/bundles/app/static/images/logo.png' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: 'Mg' },
        { property: 'og:description', content: 'MyGrafik' },
        { property: 'og:card', content: 'Gaze from your telescope' },
        { property: 'og:site', content: '@imater' },
        { property: 'og:creator', content: '@imater' },
        { property: 'og:image:width', content: '104' },
        { property: 'og:image:height', content: '41' }
      ]
    }
  }
}, environment)
