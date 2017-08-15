import React from 'react'
import validate from 'validate.js'
import _isEqual from 'lodash/isEqual'

import { buildConstraint, formatObjectToValidate } from './lib/helpers'

function propsWrapper(WrappedComponent, { attrs, addErrorsTo = 'state' }, constraints, format) {
  const _constraints = buildConstraint(attrs, constraints)
  let cmpErrors = null

  switch (addErrorsTo) {
    default:
    case 'state':
      return class extends WrappedComponent {
        componentWillReceiveProps(nextProps) {
          const state = formatObjectToValidate(nextProps, attrs)

          const errors = validate(state, _constraints, {format})

          if (!_isEqual(cmpErrors, errors)) {
            cmpErrors = errors

            this.setState(Object.assign({}, this.state, {
              _validation: errors || {}
            }))
          }

          if (super.componentWillReceiveProps) {
            super.componentWillReceiveProps(...arguments)
          }
        }

        render() {
          return super.render()
        }
      }
    case 'props':
      return (props) => {
        const state = formatObjectToValidate(props, attrs)
        const errors = validate(state, _constraints, {format})

        return <WrappedComponent {...props} _validation={errors || {}} />
      }

  }
}

export default propsWrapper
