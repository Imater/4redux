import React from 'react'
import { shallow } from 'enzyme'
import CalendarPage from './CalendarPage'

describe('@component CalendarPage', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<CalendarPage />)).to.have.length(1)
  });
  it('should render normal with children content', () => {
    expect(shallow(<CalendarPage>CalendarPage</CalendarPage>).children()).to.be.equal('CalendarPage')
  });
});
