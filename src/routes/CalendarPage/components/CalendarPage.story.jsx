import React from 'react'
import storiesOf from '../../../utils/storiesOf'
import CalendarPage from './CalendarPage'

storiesOf('CalendarPage')
  .addWithInfo('Default without props', () => (
    <CalendarPage />
  ))
  .addWithInfo('Default with children', () => (
    <CalendarPage>CalendarPage</CalendarPage>
  ))

