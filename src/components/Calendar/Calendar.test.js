import React from 'react'
import { shallow } from 'enzyme'
import Calendar from '.'

describe('@component Calendar', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Calendar />)).to.have.length(1)
  })
  it('should render normal with children content', () => {
    expect(shallow(<Calendar>Calendar</Calendar>)).to.have.length(1)
  })
})

