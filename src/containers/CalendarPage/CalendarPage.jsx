import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import Calendar from '../../components/Calendar';
import { fetchSuccess } from '../../redux/modules/holidays';

import styles from './CalendarPage.styl';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    return new Promise((resolve) => {
      dispatch(fetchSuccess()).then(resolve);
    });
  }
}])
@connect((store) => {
  const { holidays, holidays: { data } , routing: { locationBeforeTransitions: { query: { country, year } } } } = store;
  return ({
    holidays: data,
    country,
    year
  });
})
export default class CalendarPage extends Component {
  static propTypes = {
    holidays: PropTypes.object
  };

  render() {
    const { holidays, country, year } = this.props;

    return (
      <div>
        <Helmet title='Calendar' />
        <Calendar
          holidays={holidays}
          country={country}
          year={year}
        />
      </div>
    );
  }
}
