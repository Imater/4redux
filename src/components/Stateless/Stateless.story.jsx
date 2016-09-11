import React from 'react'
import storiesOf from '../../utils/storiesOf.js'
import Stateless from '.'

storiesOf('Stateless')
  .addWithInfo('Default without props', () => (
    <Stateless />
  ))
  .addWithInfo('Default with children', () => (
    <Stateless>Stateless</Stateless>
  ))
  .addWithInfo('Default with Hello word', () => (
    <Stateless title='Hello' />
  ))

