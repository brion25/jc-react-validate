import _castArray from 'lodash/castArray'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'

export function buildConstraint(values, constraint) {
  const _values = _castArray(values)
  const constraintValues = Object.keys(constraint)

  if (_isEqual(_values, constraintValues) || _isEmpty(values)) {
    return constraint
  }

  return _values.reduce((_constraint, v) => {
    return Object.assign({}, _constraint, {
      [v]: constraint
    })
  }, {})
}
