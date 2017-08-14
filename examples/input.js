import React, { Component } from 'react'
import { withValidations } from '../index'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const { value, name } = event.target

    this.setState({
      [name]: value
    })
  }

  componentDidUpdate() {
    console.log('Component got Updated!')
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
      <div className="example--input">
        <h2>Simple Input Example</h2>
        <input name="input" value={input} onChange={this.onChange} className={_validation.input ? 'invalid' : ''} />
        {
          _validation.input&&
          <ul className="errors-list">
            {_validation.input.map((msg, i) => (<li key={i}>{msg}</li>))}
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
    attrs: 'input'
  },
  constraint: {
    presence: true
  }
}

export default withValidations(Input, options)
