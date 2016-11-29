import Main from './components/Main'

export default (/* store */) => ({
  getComponent(/* nextState ,*/cb) {
    require.ensure([], (/* require */) => {
      cb(null, Main)
    }, 'Main')
  }
})

