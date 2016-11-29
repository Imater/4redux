const babelJest = require('babel-jest');

module.exports = {
  process(src, filename) {
    if (filename.match(/\.(css|less|scss|styl|sss)$/)) {
      return `
        module.exports = new Proxy({}, {
          get(target, property) {
            if (property === '__esModule') {
              return false;
            }
            return property;
          },
        });
      `;
    }

    return babelJest.process(src, filename);
  },
};