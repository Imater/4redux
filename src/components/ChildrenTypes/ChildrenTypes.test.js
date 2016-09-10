import React from 'react'
import { shallow } from 'enzyme'
import ChildrenTypes from '.'

describe('@component ChildrenTypes', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<ChildrenTypes />)).to.have.length(1)
  })
  it('should render normal with children content', () => {
    expect(shallow(<ChildrenTypes>ChildrenTypes</ChildrenTypes>)).to.have.length(1)
  })
})

