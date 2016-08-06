import React from 'react';
import { storiesOf, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { browserHistory } from 'react-router';
import { withContext } from 'recompose';

const addWithInfo = {
  ...infoAddon,
  addWithInfo(a, b, c) {
    return infoAddon.addWithInfo.call(this, a, b, c, {
      source: true,
      inline: true,
      header: false
    });
  }
};

setAddon(addWithInfo);

export default name => storiesOf(name, module)
  .addDecorator(story => {
    const Component = withContext(
      {
        router: React.PropTypes.object
      },
      () => ({
        router: browserHistory
      }),
    )(story);

    return <Component />;
  })
  .addDecorator(story =>
    <div
      style={{
        fontFamily: 'Open Sans'
      }}
    >
      {story()}
    </div>
  );

