import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'

import { fetch } from '../modules/holidays'
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
  promise: ({ store: { dispatch, getState } }) => {
    const { demoStore } = getState()
    return new Promise(resolve => resolve())
  }
}])(connect(mapStateToProps, mapActionCreators)(CalendarPage))
