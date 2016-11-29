import React from 'react'
import { shallow } from 'enzyme'
import Image from './Image.jsx'

describe('@component Image', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Image />)).not.toBeNull()
  })
})
