import React, { Component } from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import cx from 'classnames'
import Title from '../../components/Title'
import CalendarPage from '../../routes/CalendarPage'

import styles from './Demo.styl'

export default class Demo extends Component {
  render() {
    return (
      <div className={cx(styles.demo)}>
        <Helmet title='Demo' />
        <Link to={'calendar'}>
          Календарь
        </Link>
      </div>
    )
  }
}
