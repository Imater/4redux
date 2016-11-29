/* eslint-disable new-cap */
import CoreLayout from '../layout/CoreLayout'

import CalendarPage from './CalendarPage'
import Main from './Main'
import zNotFound from './NotFound'

const routes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Main(store),
  childRoutes: [
    CalendarPage(store),
    zNotFound(store) // need to be last
  ]
})

export default routes
