import validate from 'validate.js'
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'

import { buildConstraint } from './helpers'

function stateWrapper(WrappedComponent, { attrs }, constraint) {
  const _constraint = buildConstraint(attrs, constraint)
  let cmpErrors = null

  return class extends WrappedComponent {
    componentDidUpdate() {
      const errors = validate(this.state, _constraint)

      if (!_isEqual(cmpErrors, errors)) {
        cmpErrors = errors

        let state

        if (!_isEmpty(errors)) {
          state = Object.assign({}, this.state, {
            _validation: errors
          })
        } else {
          state = Object.assign({}, this.state, {
            _validation: {}
          })
        }

        this.setState(state)
      }

      if (super.componentDidUpdate) {
        super.componentDidUpdate()
      }
    }

    render() {
      return super.render()
    }
  }
}

export default stateWrapper
