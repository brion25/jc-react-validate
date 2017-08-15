import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'

import { castArray, get, sanitizeKey } from './utils'

export function buildConstraint(values, constraint) {
  const _values = castArray(values)
  const constraintValues = Object.keys(constraint)

  if (_isEqual(_values, constraintValues) || _isEmpty(values)) {
    return constraint
  }

  return _values.reduce((_constraint, v) => {
    return Object.assign({}, _constraint, {
      [sanitizeKey(v)]: constraint
    })
  }, {})
}

export function formatObjectToValidate(obj, attr) {
  return castArray(attr).reduce((_obj, _attr) => {
    return Object.assign({}, _obj, {
      [sanitizeKey(_attr)]: get(obj, _attr, '')
    })
  }, {})
}
