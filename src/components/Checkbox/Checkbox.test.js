import React from 'react'
import { shallow } from 'enzyme'
import Checkbox from '.'

describe('@component Checkbox', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Checkbox />)).to.have.length(1)
  })
  it('should render normal with children content', () => {
    expect(shallow(<Checkbox>Checkbox</Checkbox>)).to.have.length(1)
  })
})

