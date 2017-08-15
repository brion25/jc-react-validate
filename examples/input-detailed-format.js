import React, { Component } from 'react'
import { withValidations } from '../index'

function renderError({attribute, error, value}, i) {
  console.log(attribute, error, value, i)
  return (
    <div key={i}>
      <p>Attribute: <i>{attribute}</i></p>
      <p>Value: <i>{value}</i></p>
      <p>error: <i>{error}</i></p>
    </div>
  )
}

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

  componentDidUpdate(prevProps, prevState) {
    console.log('Component got Updated!', prevProps, prevState)
  }

  render() {
    /*
     * _validation is injected by the HOC withValidations
     * */
    const {
      input,
      _validation = []
    } = this.state

    return (
      <div className="example--input">
        <h2>Simple Input Example</h2>
        <input name="input" value={input} onChange={this.onChange} />
        {
          _validation.length > 0&&
          <div className="errors-list">
            {_validation.map(renderError)}
          </div>
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
  format: 'detailed',
  constraint: {
    presence: true
  }
}

export default withValidations(Input, options)
