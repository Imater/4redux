import React from 'react';
import { shallow } from 'enzyme';
import Slider from '.';

describe('@component Slider', () => {
  it('should render normal without any props supplied', () => {
    expect(shallow(<Slider />)).to.have.length(1);
  });
  it('should render normal with children content', () => {
    expect(shallow(<Slider>Slider</Slider>)).to.have.length(1);
  });
});
