import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';

import styles from './Conditional.styl';

export default class Conditional extends Component {
  static propTypes = {
    mode: pt.oneOf([]),
    isHello: pt.bool,
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
  }
  static defaultProps = {
    mode: 'h5'
  }
  render() {
    const { mode, children, isHello } = this.props;
    return (
      <div
        className={
          cx(styles[`mode_${mode}`], {
          })
        }
      >
        {isHello && 'Hello - if'}
        {isHello || 'Bye - unless'}
        {isHello ? <b>True</b> : <i>False</i>}
        {children}
      </div>
    );
  }
}
