import React from 'react'
import { shallow } from 'enzyme'
import Width from '.'

describe('@component Width', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Width />)).to.have.length(1)
  })
  it('should render normal with children content', () => {
    expect(shallow(<Width>Width</Width>)).to.have.length(1)
  })
})

