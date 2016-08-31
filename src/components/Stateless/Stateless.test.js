import React from 'react';
import { shallow } from 'enzyme';
import Stateless from '.';

describe('@component Stateless', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Stateless />)).to.have.length(1);
  });
  it('should render normal with children content', () => {
    expect(shallow(<Stateless>Stateless</Stateless>)).to.have.length(1);
  });
});

