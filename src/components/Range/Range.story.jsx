import React from 'react'
import storiesOf from '../../utils/storiesOf.js'
import Range from '.'

class RangeWrapper extends React.Component {
  state = {
    valueLeft: 10,
    valueRight: 80
  }

  handleChange = (valueLeft, valueRight) => {
    this.setState({
      valueLeft,
      valueRight
    })
  };

  render() {
    return (
      <Range
        {...this.props}
        valueLeft={this.state.valueLeft}
        valueRight={this.state.valueRight}
        onChange={this.handleChange}
      />
    )
  }
}

storiesOf('Range')
  .addWithInfo('Default without props', () => (
    <Range />
  ))
  .addWithInfo('Default with props', () => (
    <RangeWrapper />
  ))

