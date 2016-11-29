import dictGenerator from '../hor/dict'

const dictsParams = [
  {
    name: 'demoStore',
    url: () => '/',
    data: {
      data: {
        placements: {
          1: {
            id: 1,
            name: 'Офис',
            color: '#cdcdcd'
          }
        }
      }
    }
  }
]

const reducers = {}
const fetches = {}
const isLoadList = {}
dictsParams.forEach(params => {
  const { fetch, reducer, isLoaded } = dictGenerator(params)
  reducers[params.name] = reducer
  fetches[params.name] = fetch
  isLoadList[params.name] = isLoaded
})

export {
  fetches,
  isLoadList
}

export default reducers
