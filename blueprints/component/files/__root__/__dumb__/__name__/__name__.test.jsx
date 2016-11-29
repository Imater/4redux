import React from 'react'
import { shallow } from 'enzyme'
import <%= pascalEntityName %> from '.'

describe('@component <%= pascalEntityName %>', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<<%= pascalEntityName %> />)).not.toBeNull()
  })
})

