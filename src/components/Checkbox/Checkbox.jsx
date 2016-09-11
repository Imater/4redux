import React, { Component, PropTypes as pt } from 'react'
import cx from 'classnames'

import styles from './Checkbox.styl'

export default class Checkbox extends Component {
  static propTypes = {
    mode: pt.oneOf(['default']),
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
    onChange: pt.func,
    checked: pt.bool
  }
  static defaultProps = {
    mode: 'default',
    onChange: () => {}
  }
  handleChange = () => {
    const { onChange, checked } = this.props
    onChange(!checked)
  }
  render() {
    const { mode, children, checked } = this.props
    return (
      <div
        className={
          cx(styles[`mode_${mode}`], {
          })
        }
      >
        {checked ? 'checked ' : 'notchecked '}
        <label>
          {children}
          <input type='checkbox' checked={checked} onChange={this.handleChange} />
        </label>
      </div>
    )
  }
}
