import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import Calendar from '../../components/Calendar';
import { fetch } from '../../redux/modules/holidays';

import styles from './CalendarPage.styl';

@asyncConnect([{
  promise: ({ store: { dispatch }, store }) => {
    const { country, year } = store.getState().routing.locationBeforeTransitions.query;
    return new Promise((resolve) => {
      dispatch(fetch({ country, year })).then(resolve);
    });
  }
}])
@connect((store) => {
  const { holidays, holidays: { data, error } , routing: { locationBeforeTransitions: { query: { country, year } } } } = store;
  return ({
    holidays: data,
    country,
    year,
    error
  });
})
export default class CalendarPage extends Component {
  static propTypes = {
    holidays: PropTypes.object
  };

  render() {
    const { holidays, country, year, error } = this.props;

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
    );
  }
}
