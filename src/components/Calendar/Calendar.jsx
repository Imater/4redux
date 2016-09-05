import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';
import moment from 'moment';

import styles from './Calendar.styl';

const dateFromYearWeekDay = (year, week, weekDay) => {
  const startYearDate = moment(`${year}-01-01`);
  const weekFirstDay = startYearDate.add(week - 1, 'week');
  const date = weekFirstDay.add(weekDay - 1, 'day');
  return date;
};

export default class Calendar extends Component {
  static propTypes = {
    mode: pt.oneOf(['default']),
    holidays: pt.object
  };
  static defaultProps = {
    mode: 'default',
    holidays: {}
  };
  renderDay = weekDay => {
    const { holidays } = this.props;
    const currentDate = weekDay.format('MM-DD');
    const found = holidays[currentDate];
    const title = found ? found.title : '';
    return (
      <div className={styles.dayCell} key={weekDay.format('LL')}>
        {weekDay.format( weekDay.format('D') === '1' ? 'LL' : 'D')}
        {title &&
          <div>
            {title}
          </div>
        }
      </div>
    );
  };
  renderWeek = (year, week) => {
    const weekDays = [1, 2, 3, 4, 5, 6, 7];
    const weekDates = weekDays.map(weekDay => {
      return dateFromYearWeekDay(year, week, weekDay);
    });
    return (
      <div className={styles.weekRow} key={`${year}-${week}`}>
        {weekDates.map(this.renderDay)}
      </div>
    );
  };
  renderCalendar = () => {
    const calendar = [];
    for (let i = 1; i < 530; i++) {
      calendar.push(
        this.renderWeek(2016, i)
      );
    }
    return calendar;
  };
  render() {
    const { mode } = this.props;
    return (
      <div
        className={
          cx(styles[`mode_${mode}`], styles.calendarWrapper)
        }
      >
        <div className={styles.calendar}>
          {this.renderCalendar()}
        </div>
      </div>
    );
  }
}
