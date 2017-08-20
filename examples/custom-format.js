import React, { Component } from 'react'
import validate from 'validate.js'

import { withValidations } from '../src/index'

validate.formatters.validatorTypeFormat = errors => {
  return errors.map((error) => error.validator)
}

const passwordChecks = {
  length: false,
  exclusion: false
}

const reduceChecks = (checks, curr) => {
  return Object.assign({}, checks, {[curr]: true})
}

class CustomFormat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const { value, name } = event.target

    this.setState({
      [name]: value
    })
  }

  render() {
    /*
     * _validation is injected by the HOC withValidations
     * */
    const {
      password,
      _validation = []
    } = this.state

    // Create the password validation checks object
    // The _validation.password will return an array of validation type strings that are not met
    const checks = Array.isArray(_validation) ? _validation.reduce(reduceChecks, passwordChecks) : passwordChecks

    return (
      <div className="example--input">
        <h2>Confirm passwords Example</h2>
        <div>
          <input name="password" placeholder="password" type="password" value={password} onChange={this.onChange} className={_validation.password ? 'invalid' : ''} />
        </div>

        {/* Always visible check of validations */}
        <ul className="errors-list">
          <li>{checks.length ? '✖' : '✓'} Password must be at least 8 characters</li>
          <li>{checks.exclusion ? '✖' : '✓'} Password must not contain 'password' word</li>
        </ul>

        <div>
          <h4>Component state</h4>
          <pre>
            {JSON.stringify(this.state)}
          </pre>
        </div>
      </div>
    )
  }
}

const options = {
  inspect: {
    on: 'state'
  },
  format: 'validatorTypeFormat',
  constraint: {
    password: {
      presence: true,
      length: {
        minimum: 10,
      },
      exclusion: {
        within: ['password'],
      }
    }
  }
}

export default withValidations(CustomFormat, options)
