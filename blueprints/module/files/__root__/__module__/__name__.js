import { createAction, createReducer } from 'redux-act'
import { loop, Effects } from 'redux-loop'
import client from '../helpers/apiClient'
import constantName from '../utils/constantName'

// ------------------------------------
// Constants
// ------------------------------------

const an = constantName('<%= camelEntityName %>')

// ------------------------------------
// Actions
// ------------------------------------
export const action = createAction(an('ACTION'))

// ------------------------------------
// Action Handlers
// ------------------------------------
const handleAction = (state, payload) =>
  loop(
    state,
    Effects.none()
  )

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

const <%= camelEntityName %> = createReducer(on => {
  on(action, handleAction)
}, initialState)

export default <%= camelEntityName %>
