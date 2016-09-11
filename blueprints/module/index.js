module.exports = {
  description() {
    return 'Generates a plain route structure'
  },
  fileMapTokens() {
    return {
      __module__: options =>
        options.settings.getSetting('modulesPath')
    }
  }
}
