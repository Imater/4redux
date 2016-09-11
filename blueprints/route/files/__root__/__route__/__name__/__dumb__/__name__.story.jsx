import React from 'react'
import storiesOf from '../../../utils/storiesOf.js'
import <%= pascalEntityName %> from './<%= pascalEntityName %>'

storiesOf('<%= pascalEntityName %>')
  .addWithInfo('Default without props', () => (
    <<%= pascalEntityName %> />
  ))
  .addWithInfo('Default with children', () => (
    <<%= pascalEntityName %>><%= pascalEntityName %></<%= pascalEntityName %>>
  ));

