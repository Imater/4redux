import React from 'react';
import { shallow } from 'enzyme';
import Demo from '.';

describe('@component Demo', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Demo />)).to.have.length(1);
  });
});

