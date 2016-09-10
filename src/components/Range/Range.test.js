import React from 'react'
import { shallow } from 'enzyme'
import Range from '.'

describe('@component Range', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Range />)).to.have.length(1)
  })
  it('should render normal with children content', () => {
    expect(shallow(<Range>Range</Range>)).to.have.length(1)
  })
})

