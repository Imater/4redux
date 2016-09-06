import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import CalendarPage from './containers/CalendarPage';
import Demo from './containers/Demo';
import NotFound from './containers/NotFound';

/**
 * Please keep routes in alphabetical order
 */
const routes = (/* store */) => (
  <Route path='/' component={App}>
    <IndexRoute component={Demo} />
	<Route path='/calendar' component={CalendarPage} />
    <Route path='*' component={NotFound} status={404} />
  </Route>
);

export default routes;
