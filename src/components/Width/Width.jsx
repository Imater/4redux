import React, { Component, PropTypes as pt } from 'react';

const WidthWrapper = ({ children, width }) => children(width);
WidthWrapper.propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node), pt.func]),
  width: pt.number
};

const WindowWrapper = ({ children }) => children(window.innerWidth);
WindowWrapper.propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node), pt.func])
};

export default class Width extends Component {
  static propTypes = {
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
  }
  static defaultProps = {
    mode: 'h5'
  }
  render() {
    return (
      <div>
        <WidthWrapper width={500}>
          {width => <b>Width is {width}</b>}
        </WidthWrapper>
        <WindowWrapper width={500}>
          {width => <b>Window width is {width}</b>}
        </WindowWrapper>
      </div>
    );
  }
}
