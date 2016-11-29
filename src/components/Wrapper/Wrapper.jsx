import React, { Component, PropTypes as pt } from 'react'
import classNames from 'classnames'

import styles from './Wrapper.styl'

export default class Wrapper extends Component {

  static propTypes = {
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
    width: pt.number,
    className: pt.string
  };

  render() {
    const { children, className, width } = this.props

    const style = width ? {
      style: {
        maxWidth: width
      }
    } : {}

    return (
      <div
        {...style}
        className={classNames({
          [styles.wrapper]: true,
          [className]: className
        })}
      >
        {children}
      </div>
    )
  }
}
