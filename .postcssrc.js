var focusVisible = require('postcss-focus-visible')
var customProperties = require('postcss-custom-properties')

module.exports = config

function config (ctx) {
  var plugins = [focusVisible]

  if (ctx.env !== 'development') {
    plugins.push(customProperties)
  }

  return { plugins }
}
