import { createAction, createReducer } from 'redux-act'

const initialState = {
  view: 'app'
}

export const setParams = createAction('mg/updateData/SET_PARAMS')


const handleSetParams = (state, payload) => ({
  ...state,
  ...payload
})

const reducer = createReducer(on => {
  on(setParams, handleSetParams)
}, initialState)

export default reducer
