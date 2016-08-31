import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import Conditional from '.';

storiesOf('Conditional')
  .addWithInfo('Default without props', () => (
    <Conditional />
  ))
  .addWithInfo('Default with children', () => (
    <Conditional>Conditional</Conditional>
  ))
  .addWithInfo('Default with isHello=true', () => (
    <Conditional isHello>test</Conditional>
  ))
  .addWithInfo('Default with isHello=false', () => (
    <Conditional>test</Conditional>
  ));

