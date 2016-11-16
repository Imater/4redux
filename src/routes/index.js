/* eslint-disable new-cap */
import CoreLayout from '../layout/CoreLayout'

import CalendarPage from './CalendarPage'
import DemoPage from './DemoPage'
import NotFound from './NotFound'

const routes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: DemoPage(store),
  childRoutes: [
    CalendarPage(store),
    NotFound(store)
  ]
})

export default routes
