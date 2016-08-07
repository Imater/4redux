import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';

import styles from './Title.styl';

export default class Demo extends Component {
  static propTypes = {
    mode: pt.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
    isOneLine: pt.bool,
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
  }
  static defaultProps = {
    mode: 'h5',
    isOneLine: false
  }
  render() {
    const { mode, children, isOneLine } = this.props;
    return (
      <div
        className={
          cx(styles[`mode_${mode}`], {
            [styles.oneLine]: isOneLine
          })
        }
      >
        {children}
      </div>
    );
  }
}
