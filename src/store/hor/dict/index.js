import { createReducer, createAction } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import client from '../../../helpers/apiClient'

const initialState = {
  isLoaded: false,
  isLoading: false,
  data: {
  }
}

export default function (params) {
  const fetch = createAction(`4redux/${params.name}/fetch`)
  const fetchSuccess = createAction(`4redux/${params.name}/fetchSuccess`)
  const fetchFailure = createAction(`4redux/${params.name}/fetchFailure`)

  const request = ({ companyId }) =>
    client.get(params.url({ companyId }), {
      params: params.params
    })
      .then(fetchSuccess)
      .catch(fetchFailure)

  const handleFetch = (state, { companyId }) => loop({
    ...state,
    isLoaded: false,
    isLoading: true,
    error: undefined
  }, Effects.promise(request, { companyId }))

  const handleFetchSuccess = (state, payload) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    data: payload.data
  })

  const handleFetchFailure = (state, payload) => ({
    ...state,
    isLoaded: false,
    isLoading: false,
    error: String(payload)
  })

  const reducer = createReducer(on => {
    on(fetch, handleFetch)
    on(fetchSuccess, handleFetchSuccess)
    on(fetchFailure, handleFetchFailure)
  }, {
    ...initialState,
    ...params.data
  })

  const isLoaded = stores => stores[params.name].isLoaded

  return {
    reducer,
    fetch,
    isLoaded
  }
}

