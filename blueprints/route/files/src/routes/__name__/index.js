import { injectReducer } from '../../store/reducers'

export default store => ({
  path: '<%= dashesEntityName %>',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      const <%= pascalEntityName %> = require('./containers/<%= pascalEntityName %>Container').default
      const reducer = require('./modules/<%= pascalEntityName %>').default

      injectReducer(store, { key: '<%= pascalEntityName %>', reducer })

      cb(null, <%= pascalEntityName %>)

    }, '<%= pascalEntityName %>')
  }
})
