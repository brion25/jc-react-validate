import React, { Component } from 'react'
import _isEmpty from 'lodash/isEmpty'

import { withValidations } from '../src/index'

function flatErrors(error) {
  return Object.keys(error).reduce((errorList, eKey) => {
    return [].concat(errorList, error[eKey])
  }, [])
}

class MultipleInputs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fname: '',
      lname: ''
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
      input,
      _validation = {}
    } = this.state

    return (
      <div className="example--multiple-input">
        <h2>Multiple Inputs Example</h2>
        <input name="fname" value={input} onChange={this.onChange} className={_validation.fname ? 'invalid' : ''} />
        <input name="lname" value={input} onChange={this.onChange} className={_validation.lname ? 'invalid' : ''} />
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
    on: 'state',
    attrs: ['fname', 'lname']
  },
  constraint: {
    presence: true
  }
}

export default withValidations(MultipleInputs, options)
