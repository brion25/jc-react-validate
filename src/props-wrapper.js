import validate from 'validate.js'
import _isEqual from 'lodash/isEqual'

import { buildConstraint, formatState } from './helpers'

function propsWrapper(WrappedComponent, { attrs, addErrorsTo = 'state' }, constraint) {
  const _constraint = buildConstraint(attrs, constraint)
  let cmpErrors = null

  switch (addErrorsTo) {
    default:
    case 'state':
      return class extends WrappedComponent {
        componentWillReceiveProps(nextProps) {
          const errors = validate(nextProps, _constraint)

          if (!_isEqual(cmpErrors, errors)) {
            cmpErrors = errors

            this.setState(formatState(errors, this.state))
          }

          if (super.componentWillReceiveProps) {
            super.componentWillReceiveProps(...arguments)
          }
        }

        render() {
          return super.render()
        }
      }
  }
}

export default propsWrapper
