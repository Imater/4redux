import React, { Component, PropTypes as pt } from 'react';

import styles from './Title.styl';

export default class Demo extends Component {
  static propTypes = {
    mode: pt.oneOf(['h2']),
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
  }
  render() {
    const { mode, children } = this.props;
    return (
      <div className={styles[`mode_${mode}`]}>
        {children}
      </div>
    );
  }
}
