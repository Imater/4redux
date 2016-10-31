import React from 'react'
import { storiesOf, setAddon, addDecorator } from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'
import backgrounds from 'react-storybook-addon-backgrounds'
import { browserHistory } from 'react-router'
import { withContext } from 'recompose'

const addWithInfo = {
  ...infoAddon,
  addWithInfo(a, b) {
    return infoAddon.addWithInfo.call(this, a, b, {
      source: true,
      inline: true,
      header: false
    })
  }
}

setAddon(addWithInfo)
addDecorator(backgrounds([
  { name: 'primary', value: '#3b5998' }
]))

export default name => storiesOf(name, module)
  .addDecorator(story => {
    const Component = withContext(
      {
        router: React.PropTypes.object
      },
      () => ({
        router: browserHistory
      }),
    )(story)

    return <Component />
  })
  .addDecorator(story =>
    <div
      style={{
        fontFamily: 'Open Sans',
        padding: '1em'
      }}
    >
      {story()}
    </div>
  )

