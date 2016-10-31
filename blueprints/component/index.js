module.exports = {
  description() {
    return 'Generates a dumb (aka Pure) component'
  },
  fileMapTokens() {
    return {
      __dumb__: options =>
        options.settings.getSetting('dumbPath')
    }
  }
}
