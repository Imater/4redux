#!/usr/bin/env node
if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: false
  })) {
    return
  }
}
require('../server.babel')
require('../api/api')
