import R from 'ramda'
import { setParams } from '../store/updateData'
import { fetches, isLoadList } from '../store/dicts'

let store

const updateData = {
  main: (force = false) => {
    const { getState, dispatch } = store
    const { params } = updateData.get()
    const promises = R.compose(
      R.values,
      R.map(name => dispatch(fetches[name](params))),
      R.filter(name => force || !isLoadList[name](getState())),
      R.keys
    )(fetches)
    return Promise.all(promises)
  },

  get: () => store.getState().updateData,

  set: params => store.dispatch(setParams(params)),

  setStore: _store => {
    store = _store
  },

  update: (view = updateData.get().view) => R.composeP(
    () => updateData.updateView(false, view)
  )(),

  updateView: (force, view = updateData.get().view) => updateData[view] && updateData[view](force),

  updateAll: () => Promise.all([
    updateData.main(true),
    updateData.updateView(true)
  ])
}

export default updateData
