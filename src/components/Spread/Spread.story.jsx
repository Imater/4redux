import React from 'react'
import storiesOf from '../../utils/storiesOf.js'
import Spread from '.'

const isOpenName = 'isOpen'
const spreadProps = {
  [isOpenName]: true,
  title: 'hello'
}

storiesOf('Spread')
  .addWithInfo('Default without props', () => (
    <Spread />
  ))
  .addWithInfo('Default with children', () => (
    <Spread>Spread</Spread>
  ))
  .addWithInfo('Default with many props', () => (
    <Spread
      title='bye'
      {...spreadProps}
    >
      Hello
    </Spread>
  ))

