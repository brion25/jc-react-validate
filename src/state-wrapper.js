import validate from 'validate.js'
import _isEqual from 'lodash/isEqual'
import _omit from 'lodash/omit'

import { buildConstraint } from './helpers'

function stateWrapper(WrappedComponent, { attrs }, constraints, format) {
  const _constraints = buildConstraint(attrs, constraints)
  let cmpErrors = null

  return class extends WrappedComponent {
    componentDidUpdate(prevProps, prevState) {
      const errors = validate(this.state, _constraints, {format})

      if (!_isEqual(cmpErrors, errors) && !_isEqual(_omit(prevState, ['_validation']), _omit(this.state, ['_validation']))) {
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
