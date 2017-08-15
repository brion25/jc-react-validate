import React, { Component } from 'react'
import { withValidations } from '../index'

class Phones extends Component {
  constructor(props) {
    super(props)

    this.state = {
      phones: [
        {
          number: '',
          ext: '',
          name: 'Mobile'
        },
        {
          number: '',
          ext: '',
          name: 'House'
        },
        {
          number: '',
          ext: '',
          name: 'Other'
        }
      ]
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(i) {
    const phone = Object.assign({}, this.state.phones[i])
    return (event) => {
      const { value, name } = event.target
      phone[name] = value

      const modifiedPhones = this.state.phones.slice()
      modifiedPhones.splice(i, 1, phone)

      this.setState({
        phones: modifiedPhones
      })
    }
  }

  renderErrors(validation) {
    return Object.keys(validation).reduce((errors, eKey, i) => {
      const error = validation[eKey]
      return [].concat(errors, error.map((msg, j) => (<li key={`${i}.${j}`}>{msg}</li>)))
    }, [])
  }

  render() {
    const {
      phones,
      _validation = {}
    } = this.state

    return (
      <div className="example--input">
        <h2>Validating collections</h2>
        {phones.map(({number, ext, name}, i) => (
          <div key={i}>
            <h4>{name}</h4>
            <input onChange={this.onChange(i)} name="number" value={number} placeholder="Phone Number"/>
            <input onChange={this.onChange(i)} name="ext" value={ext} placeholder="Phone Ext"/>
          </div>
        ))}
        <ul className="errors-list">
          {this.renderErrors(_validation)}
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
    on: 'state',
    attrs: ['phones.0.number', 'phones.2.number']
  },
  constraint: {
    presence: true
  }
}

export default withValidations(Phones, options)
