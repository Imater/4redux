import React, { Component, PropTypes as pt } from 'react'
import Helmet from 'react-helmet'
import config from '../config'

import styles from './CoreLayout.scss'

class CoreLayout extends Component {
  static propTypes = {
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
  }

  render() {
    console.info(children)
    const { children } = this.props

    return (
      <div className={styles.root}>
        <Helmet {...config.app.head} />
        {children}
      </div>
    )
  }
}

export default CoreLayout
