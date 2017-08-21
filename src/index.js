const utils = require('./lib/utils')
const withValidations = require('./with-validations')
const Validate = require('./validate')

const _module = {
  withValidations: withValidations.default,
  Validate: Validate.default
}

module.exports = Object.assign({}, utils, _module)
