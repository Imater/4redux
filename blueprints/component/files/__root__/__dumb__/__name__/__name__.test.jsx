import React from 'react'
import { shallow } from 'enzyme'
import <%= pascalEntityName %> from '.'

describe('@component <%= pascalEntityName %>', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<<%= pascalEntityName %> />)).to.have.length(1);
  })
  it('should render normal with children content', () => {
    expect(shallow(<<%= pascalEntityName %>><%= pascalEntityName %></<%= pascalEntityName %>>).children()).to.be.equal('<%= pascalEntityName %>');
  })
});

