import React from 'react'
import { shallow } from 'enzyme'
import Handle from '.'

describe('@component Handle', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Handle />)).to.have.length(1)
  })
  it('should render normal with children content', () => {
    expect(shallow(<Handle>Handle</Handle>)).to.have.length(1)
  })
})

