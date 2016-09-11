import React, { Component, PropTypes as pt } from 'react'
import cx from 'classnames'

import styles from './Handle.styl'

export default class Handle extends Component {
  static propTypes = {
    mode: pt.oneOf(['default']),
    onChange: pt.func,
    value: pt.number
  }

  static defaultProps = {
    mode: 'default',
    value: 0,
    onChange: () => {}
  }

  handleMouseDown = event => {
    // текущие координаты
    this.startX = event.clientX
    this.value = this.props.value
    // поставить обработчик на window
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
    // создать функцию убирающую обработчик
    this.removeListener = () => {
      document.removeEventListener('mouseup', this.handleMouseUp)
      document.removeEventListener('mousemove', this.handleMouseMove)
    }
  }

  handleMouseUp = () => {
    this.removeListener()
  }

  handleMouseMove = event => {
    const { onChange, value } = this.props
    const newClientX = event.clientX
    const diff = newClientX - this.startX
    onChange(this.value + diff)
  }

  handleChange = value => {
    const { onChange } = this.props
    onChange(value)
  };

  render() {
    const { mode, value } = this.props
    return (
      <div
        className={
          cx(styles[`mode_${mode}`], {
          })
        }
        style={{ left: value }}
        onMouseDown={this.handleMouseDown}
      />
    )
  }
}
