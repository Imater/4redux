import React from 'react'
import { shallow } from 'enzyme'
import Spread from '.'

describe('@component Spread', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Spread />)).to.have.length(1)
  })
  it('should render normal with children content', () => {
    expect(shallow(<Spread>Spread</Spread>)).to.have.length(1)
  })
})

