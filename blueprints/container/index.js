module.exports = {
  description() {
    return 'Generates a plain route structure'
  },
  locals(options) {
    return {
      __route__: options.settings.getSetting('routesPath'),
      __dumb__: options.settings.getSetting('dumbPath'),
      __smart__: options.settings.getSetting('smartPath'),
      __module__: options.settings.getSetting('modulesPath')
    }
  },
  fileMapTokens() {
    return {
      __dumb__: options =>
        options.settings.getSetting('dumbPath'),
      __smart__: options =>
        options.settings.getSetting('smartPath'),
      __module__: options =>
        options.settings.getSetting('modulesPath')
    }
  }
}
