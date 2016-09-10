import React from 'react'
import hoistStatics from 'hoist-non-react-statics'

export default (stateName = 'activeId', defaultStateValue) => WrappedComponent => {
  class StateWrapper extends React.Component {
    state = {
      [stateName]: defaultStateValue
    }
    handleChange = newActiveId => {
      this.setState({
        [stateName]: newActiveId
      })
    }
    render() {
      const newProps = {
        [stateName]: this.state[stateName],
        onChange: this.handleChange
      }
      return (
        <WrappedComponent
          {...this.props}
          {...newProps}
        />
      )
    }
  }
  return hoistStatics(StateWrapper, WrappedComponent)
}

