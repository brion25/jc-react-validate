import React from 'react'
import PropTypes from 'prop-types'
import validate from 'validate.js'

import { formatObjectToValidate, buildConstraint } from './lib/helpers'

class ValidateProvider extends React.Component {
  constructor(props) {
    super(props)

    this.validate = this.validate.bind(this)
  }

  validate(obj, attrs) {
    const { constraint } = this.props

    const objToValidate = formatObjectToValidate(obj, attrs)
    const _constraint = buildConstraint(attrs, constraint)

    return validate(objToValidate, _constraint)
  }

  getChildContext() {
    return { validate: this.validate }
  }

  render() {
    const { passOnProps } = this.props

    if (passOnProps) {
      const children = React.Children.map(this.props.children, (Child) => {
        return React.cloneElement(Child, {
          validate: this.validate
        })
      })

      return (
        <div className="validate-provider-wrapper">
          {children}
        </div>
      )
    }

    return React.Children.only(this.props.children)
  }
}

ValidateProvider.defaultProps = {
  passOnProps: false
}

ValidateProvider.propTypes = {
  constraint: PropTypes.object.isRequired,
  passOnProps: PropTypes.bool
}

ValidateProvider.childContextTypes = {
  validate: PropTypes.func.isRequired,
}

export default ValidateProvider