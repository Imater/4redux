import React, { PureComponent, PropTypes as pt } from 'react'
import Helmet from 'react-helmet'
import Calendar from '../../../components/Calendar'

import styles from './CalendarPage.scss'

class CalendarPage extends PureComponent {
  static propTypes = {
    holidays: pt.object,
    country: pt.string,
    year: pt.number,
    error: pt.string
  };

  render() {
    const { holidays, country, year, error } = this.props

    return (
      <div>
        <Helmet title='Calendar' />
        { error && <b>{error}</b> }
        <Calendar
          holidays={holidays}
          country={country}
          year={year}
        />
      </div>
    )
  }
}

export default CalendarPage
