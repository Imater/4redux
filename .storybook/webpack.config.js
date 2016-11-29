require('babel-register');
const commonConfig = require(`../webpack/dev.config`);
const config = commonConfig;
console.info(config.plugins)

module.exports = (storybookBaseConfig) => {
  return Object.assign({}, storybookBaseConfig, {
    target: config.target,
    module: config.module,
    resolve: Object.assign({}, config.resolve, {
      modulesDirectories: config.resolve.modules,
      extensions: [''].concat(config.resolve.extensions)
    }),
    plugins: process.env.NODE_ENV === 'development'
      ? storybookBaseConfig.plugins.concat(config.plugins[0])
      : [config.plugins[0]],
  });
};

