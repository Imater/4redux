import React from 'react'
import { shallow } from 'enzyme'
import Title from '.'

describe('@component Title', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Title />)).to.have.length(1)
  })
})

