import React, { Component, PropTypes as pt } from 'react'

const IsOpen = ({ isOpen, title, children }) => (
  <div
    {...{ title }}
    style={{
      color: isOpen ? 'black' : 'gray'
    }}
  >
    {children}
  </div>
)

IsOpen.propTypes = {
  isOpen: pt.bool,
  title: pt.string,
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
}

export default class Spread extends Component {
  static propTypes = {
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
    isOpen: pt.bool
  }
  static defaultProps = {
  }
  render() {
    const { children, isOpen } = this.props
    return (
      <IsOpen {...this.props}>
        isOpen = {isOpen ? 'true' : 'false'}
      </IsOpen>
    )
  }
}
