import { injectReducer } from '../../store/reducers'

export default store => ({
  path: '<%= dashesEntityName %>',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      const <%= pascalEntityName %> = require('./<%= __smart__ %>/<%= pascalEntityName %>Container')
      const reducer = require('./<%= __module__ %>/<%= camelEntityName %>').default

      injectReducer(store, { key: '<%= pascalEntityName %>', reducer })

      cb(null, <%= pascalEntityName %>)

    }, '<%= pascalEntityName %>')
  }
})
