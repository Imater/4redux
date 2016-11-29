import React, { Component, PropTypes as pt } from 'react'

class ClickOutside extends Component {
  static propTypes = {
    onClick: pt.func,
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }

  handleClick = event => {
    if (this.clickOutside && !this.clickOutside.contains(event.target)) {
      return this.props.onClick(event)
    }
    return false
  };

  render() {
    return (
      <span ref={ref => (this.clickOutside = ref)}>
        {this.props.children}
      </span>
    )
  }
}

export default ClickOutside

