import React, { Component } from 'react'
import _isEmpty from 'lodash/isEmpty'
import { withValidations } from '../src/index'

function flatErrors(error) {
  return Object.keys(error).reduce((errorList, eKey) => {
    return [].concat(errorList, error[eKey])
  }, [])
}

class ConfirmPasswords extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      confirm: ''
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
      confirm,
      password,
      _validation = {}
    } = this.state

    return (
      <div className="example--input">
        <h2>Confirm passwords Example</h2>
        <div>
          <input name="password" placeholder="password" type="password" value={password} onChange={this.onChange} className={_validation.password ? 'invalid' : ''} />
        </div>
        <div>
          <input name="confirm" placeholder="confirm password" type="password" value={confirm} onChange={this.onChange} className={_validation.confirm ? 'invalid' : ''} />
        </div>
        {
          !_isEmpty(_validation) &&
          <ul className="errors-list">
            {flatErrors(_validation).map((msg, i) => (<li key={i}>{msg}</li>))}
          </ul>
        }
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
  constraint: {
    password: {
      presence: true
    },
    confirm: {
      presence: true,
      equality: "password"
    }
  }
}

export default withValidations(ConfirmPasswords, options)
