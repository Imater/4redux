import React from 'react';
import { shallow } from 'enzyme';
import Conditional from '.';

describe('@component Conditional', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Conditional />)).to.have.length(1);
  });
  it('should render normal with children content', () => {
    expect(shallow(<Conditional>Conditional</Conditional>)).to.have.length(1);
  });
});

