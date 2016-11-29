import React from 'react'
import storiesOf from '../../utils/storiesOf'
import <%= pascalEntityName %> from '.'

storiesOf('<%= pascalEntityName %>')
  .addWithInfo('Default without props', () => (
    <<%= pascalEntityName %> />
  ))

