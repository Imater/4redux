import React, { PureComponent, PropTypes as pt } from 'react'
import Helmet from 'react-helmet'

import styles from './CalendarPage.scss'

class CalendarPage extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: pt.object
  };

  static defaultProps = {
    holidays: {}
  };

  render() {
    const { holidays, country, year, error } = this.props

    return (
      <div className={styles.demo}>
        <Helmet title='Calendar demo page' />
        { error && <b>{error}</b> }
        <b>calendar demo</b>
      </div>
    )
  }
}

export default CalendarPage
