import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import _castArray from 'lodash/castArray'
import _get from 'lodash/get'

import { sanitizeKey } from './utils'

export function buildConstraint(values, constraint) {
  const _values = _castArray(values)
  const constraintValues = Object.keys(constraint)

  if (_isEqual(_values, constraintValues) || _isEmpty(values) || constraintValues.some(v => _values.includes(v))) {
    return constraint
  }

  return _values.reduce((_constraint, v) => {
    return Object.assign({}, _constraint, {
      [sanitizeKey(v)]: constraint
    })
  }, {})
}

export function formatObjectToValidate(obj, attr) {
  return _castArray(attr).reduce((_obj, _attr) => {
    return Object.assign({}, _obj, {
      [sanitizeKey(_attr)]: _get(obj, _attr, '')
    })
  }, {})
}
