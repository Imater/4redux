import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'

import CalendarPage from '../components/CalendarPage'

const mapActionCreators = {
  action: () => {}
}

const mapStateToProps =
  ({
    demoStore: { data }
  }) => ({
    data
  })

export default asyncConnect([{
  promise: (/* { store: { dispatch, getState } } */) => new Promise(resolve => resolve())
}])(connect(mapStateToProps, mapActionCreators)(CalendarPage))
