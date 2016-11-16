import React, { Component, PropTypes as pt } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import moment from 'moment'

import styles from './Calendar.styl'

const getMonday = date => date.startOf('isoweek')

const dateFromYearWeekDay = (year, week, weekDay) => {
  const startYearDate = getMonday(moment(`${year}-01-01`))
  const weekFirstDay = startYearDate.add(week - 1, 'week')
  const date = weekFirstDay.add(weekDay - 1, 'day')
  return date
}

const printDate = weekDay => weekDay.format(weekDay.format('D') === '1' ? 'LL' : 'D')

export default class Calendar extends Component {
  static propTypes = {
    mode: pt.oneOf(['default']),
    // eslint-disable-next-line react/forbid-prop-types
    holidays: pt.object,
    year: pt.string
  };
  static defaultProps = {
    mode: 'default',
    holidays: {},
    year: '2013'
  };
  renderDay = weekDay => {
    const { holidays } = this.props
    const currentDate = weekDay.format('YYYY-MM-DD')
    const found = holidays[currentDate]
    const title = found && found.length ? found[0].name : ''
    return (
      <div className={styles.dayCell} key={weekDay.format('LL')}>
        {printDate(weekDay)}
        {title &&
          <div className={styles.title}>
            {title}
          </div>
        }
      </div>
    )
  };
  renderWeek = (year, week) => {
    const weekDays = [1, 2, 3, 4, 5, 6, 7]
    const weekDates = weekDays.map(weekDay => dateFromYearWeekDay(year, week, weekDay))
    return (
      <div className={styles.weekRow} key={`${year}-${week}`}>
        {weekDates.map(this.renderDay)}
      </div>
    )
  };
  renderCalendar = () => {
    const { year } = this.props
    const calendar = []
    for (let i = 1; i < (365 / 7) * 3; i += 1) {
      calendar.push(
        this.renderWeek(year, i)
      )
    }
    return calendar
  };
  render() {
    const { mode } = this.props
    return (
      <div
        className={
          cx(styles[`mode_${mode}`], styles.calendarWrapper)
        }
      >
        <Link to={'/'}>
          Home
        </Link>
        <div className={styles.calendar}>
          {this.renderCalendar()}
        </div>
      </div>
    )
  }
}
