import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './Main.styl'

const cx = classNames.bind(styles)

export default class Checkboxes extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <div
        className={styles.main}
      >
        Redux/react boilerplate
      </div>
    )
  }
}

