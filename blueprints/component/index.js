module.exports = {
  description() {
    return 'Generates a dumb (aka Pure) component with dumbPath'
  },
  fileMapTokens() {
    return {
      __dumb__: options =>
        options.settings.getSetting('dumbPath')
    }
  }
}
