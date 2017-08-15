const utils = require('./src/lib/utils')
const withValidations = require('./src/with-validations')

const _module = {
  withValidations: withValidations.default
}

module.exports = Object.assign({}, utils, _module)
