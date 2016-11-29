import React from 'react'
import { shallow } from 'enzyme'
import CalendarPage from './CalendarPage'

describe('@component CalendarPage', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<CalendarPage />)).not.toBeNull()
  })
  it('should render normal with children content', () => {
    expect(shallow(<CalendarPage>CalendarPage</CalendarPage>).children()).not.toBeNull()
  })
})
