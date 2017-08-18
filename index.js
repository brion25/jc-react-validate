const utils = require('./src/lib/utils')
const withValidations = require('./src/with-validations')
const Validate = require('./src/validate')

const _module = {
  withValidations: withValidations.default,
  Validate: Validate.default
}

module.exports = Object.assign({}, utils, _module)
