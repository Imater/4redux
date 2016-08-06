import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import Demo from '.';

storiesOf('Title')
  .addWithInfo('Default without props', () => (
    <Demo />
  ))
  .addWithInfo('Title mode h2', () => (
    <Demo mode='h2'>
      Заголовок h2
    </Demo>
  ))
  .addWithInfo('Title without mode', () => (
    <Demo>
      Заголовок по умолчанию
    </Demo>
  ))
  .addWithInfo('Title with long text', () => (
    <Demo>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
      tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
      vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
      no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </Demo>
  ));

