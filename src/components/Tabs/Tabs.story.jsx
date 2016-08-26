import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import stateDecorator from '../../helpers/decorators/stateDecorator.js';
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
const index = 0;


const DecoratedTabs = stateDecorator('activeId', 1)(Tabs);
// const DecoratedTabs = tabsDecorator('checked')(Checkbox);

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
  ))
  .addWithInfo('Default with state and can change tab by click', () => (
    <DecoratedTabs
      tabs={sampleTabs}
      activeId={sampleTabs[index].id}
      renderer={renderer}
    />
  ));

