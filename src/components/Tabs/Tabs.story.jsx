import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import Tabs from '.';

const renderer = active => <b>{active}</b>;
const sampleTabs = [{
  id: 1,
  title: 'First tab'
}, {
  id: 2,
  title: 'Second tab'
}];

storiesOf('Tabs')
  .addWithInfo('Default without props', () => (
    <Tabs />
  ))
  .addWithInfo('Default with children', () => (
    <Tabs>Tabs</Tabs>
  ))
  .addWithInfo('Default with Hello word', () => (
    <Tabs>Hello</Tabs>
  ))
  .addWithInfo('Default with renderer', () => (
    <Tabs
      tabs={sampleTabs}
      active={1}
      renderer={renderer}
    />
  ));

