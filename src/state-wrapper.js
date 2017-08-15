import validate from 'validate.js'
import _isEqual from 'lodash/isEqual'

import { buildConstraint, formatObjectToValidate } from './lib/helpers'

function stateWrapper(WrappedComponent, { attrs }, constraints, format) {
  const _constraints = buildConstraint(attrs, constraints)
  let cmpErrors = null

  return class extends WrappedComponent {
    componentDidUpdate(prevProps, prevState) {
      const state = formatObjectToValidate(this.state, attrs)
      const prev = formatObjectToValidate(prevState, attrs)
      const errors = validate(state, _constraints, {format})

      if (!_isEqual(cmpErrors, errors) && !_isEqual(state, prev)) {
        cmpErrors = errors

        this.setState(Object.assign({}, this.state, {
          _validation: errors || {}
        }))
      }

      if (super.componentDidUpdate) {
        super.componentDidUpdate(...arguments)
      }
    }

    render() {
      return super.render()
    }
  }}

export default stateWrapper
