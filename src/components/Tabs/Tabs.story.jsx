import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import Tabs from '.';

const sampleTabs = [
  {
    id: 1,
    title: 'First tab'
  },
  {
    id: '2',
    title: 'Second tab'
  },
  {
    id: '3',
    title: 'Third tab'
  }
];
const renderer = activeId => <b>{activeId}</b>;
const index = 1;

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
  .addWithInfo('Default with Hello word', () => (
    <Tabs
      tabs={sampleTabs}
      activeId={sampleTabs[index].id}
      renderer={renderer}
    />
  ));

