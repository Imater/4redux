import React from 'react'
import storiesOf from '../../../utils/storiesOf.js'
import Handle from '.'

storiesOf('Handle')
  .addWithInfo('Default without props', () => (
    <Handle />
  ))
  .addWithInfo('Default with children', () => (
    <Handle>Handle</Handle>
  ))

