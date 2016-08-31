import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import ChildrenTypes from '.';

storiesOf('ChildrenTypes')
  .addWithInfo('Default without props', () => (
    <ChildrenTypes />
  ))
  .addWithInfo('Default with children', () => (
    <ChildrenTypes>ChildrenTypes</ChildrenTypes>
  ))
  .addWithInfo('Default with Hello word', () => (
    <ChildrenTypes>Hello</ChildrenTypes>
  ));

