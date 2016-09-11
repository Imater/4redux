import React from 'react'
import storiesOf from '../../utils/storiesOf.js'
import Width from '.'

storiesOf('Width')
  .addWithInfo('Default without props', () => (
    <Width />
  ))
  .addWithInfo('Default with children', () => (
    <Width>Width</Width>
  ))
  .addWithInfo('Default with Hello word', () => (
    <Width>Hello</Width>
  ))

