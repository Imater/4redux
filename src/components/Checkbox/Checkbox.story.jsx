import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import stateDecorator from '../../helpers/decorators/stateDecorator.js';
import Checkbox from '.';

const DecoratedCheckbox = stateDecorator('checked', true)(Checkbox);

storiesOf('Checkbox')
  .addWithInfo('Default without props', () => (
    <Checkbox />
  ))
  .addWithInfo('Default with children', () => (
    <Checkbox>Checkbox</Checkbox>
  ))
  .addWithInfo('Default with Hello word', () => (
    <Checkbox>Hello</Checkbox>
  ))
  .addWithInfo('Default with DecoratedCheckbox', () => (
    <DecoratedCheckbox>DecoratedCheckbox</DecoratedCheckbox>
  ));

