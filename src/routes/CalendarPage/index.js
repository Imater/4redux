import { injectReducer } from '../../store/reducers'

export default store => ({
  path: '/calendar',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      const CalendarPage = require('./containers/CalendarPageContainer')
      const reducer = require('./modules/holidays').default

      injectReducer(store, { key: 'holidays', reducer })

      cb(null, CalendarPage)
    }, 'CalendarPage')
  }
})
