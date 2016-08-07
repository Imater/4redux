import React from 'react';
import storiesOf from '../../utils/storiesOf.js';
import Title from '.';

const modes = ['h1', 'h2', 'h3', 'h4', 'h5'];

storiesOf('Title')
  .addWithInfo('Default without props', () => (
    <div>
      <Title />
      <Title>Not empty</Title>
    </div>
  ))
  .addWithInfo('Title mode h1, h2, ..., h5', () => (
    <div>
      {
        modes.map(
          modeName =>
            <Title
              key={modeName}
              mode={modeName}
            >
              Заголовок {modeName}
            </Title>
        )
      }
    </div>
  ))
  .addWithInfo('Title without mode', () => (
    <Title>
      Заголовок по умолчанию
    </Title>
  ))
  .addWithInfo('Title with long text', () => (
    <Title>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
      tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
      vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
      no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </Title>
  ))
  .addWithInfo('Title with long text isOneLine', () => (
    <div>
      <Title isOneLine>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
        no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </Title>
      <Title isOneLine>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
        no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </Title>
    </div>
  ));

