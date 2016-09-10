import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'

import { fetch } from '../modules/holidays'
import CalendarPage from '../components/CalendarPage'

const mapActionCreators = {
  action: () => {}
}

const mapStateToProps =
  ({
    holidays,
    holidays: { data, error },
    routing: { locationBeforeTransitions: { query: { country, year } } }
  }) => ({
    holidays: data,
    country,
    year,
    error
  })

export default asyncConnect([{
  promise: ({ store: { dispatch }, store }) => {
    const { country, year } = store.getState().routing.locationBeforeTransitions.query
    return new Promise(resolve => {
      dispatch(fetch({ country, year })).then(resolve)
    })
  }
}])(connect(mapStateToProps, mapActionCreators)(CalendarPage))
