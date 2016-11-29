import { createReducer, createAction } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import client from '../../../helpers/apiClient'

export const fetch = createAction('mg/holidays/getHolidays')
export const fetchSuccess = createAction('mg/holidays/getHolidaysSuccess')
export const fetchFailure = createAction('mg/holidays/getHolidaysFailure')

const initialState = {
  isLoaded: false,
  isLoading: false,
  data: {}
}

const request = (country, year) => () =>
  client.get(`https://holidayapi.com/v1/holidays?key=f988097d-8481-420d-8f86-6b29abec97c4&country=${country}&year=${year}`)
    .then(fetchSuccess)
    .catch(fetchFailure)

const handleFetch = (state, payload) => {
  const { country, year } = payload

  return loop({
    ...state,
    isLoaded: false,
    isLoading: true,
    error: undefined
  },
  Effects.promise(request(country, year))
  )
}

const handleFetchSuccess = (state, payload) => {
  const { data: { holidays } } = payload
  const holidaysData = holidays
  return {
    ...state,
    isLoaded: true,
    isLoading: false,
    data: holidaysData
  }
}

const handleFetchFailure = (state, payload) =>
  ({
    ...state,
    isLoaded: false,
    isLoading: false,
    error: String(payload)
  })

const reducer = createReducer(on => {
  on(fetch, handleFetch)
  on(fetchSuccess, handleFetchSuccess)
  on(fetchFailure, handleFetchFailure)
}, initialState)

export default reducer
