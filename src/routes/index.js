import CoreLayout from '../layout/CoreLayout'

import CalendarPage from './CalendarPage'
import Demo from '../components/Demo'
import NotFound from '../routes/NotFound'

const routes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Demo,
  childRoutes: [
    CalendarPage(store),
    NotFound(store)
  ]
})

export default routes
