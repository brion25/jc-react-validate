import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import { withValidations } from '../index'

const SET_PHONES = 'SET_PHONES'

const defaultState = {
  phones: [
    {
      number: '',
      ext: '',
      name: 'Mobile'
    },
    {
      number: '',
      ext: '',
      name: 'Home'
    }
  ]
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_PHONES:
      return Object.assign({}, state, {
        phones: action.phones
      })
    default:
      return state
  }
}

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  renderErrors(validation) {
    return Object.keys(validation).reduce((errors, eKey, i) => {
      const error = validation[eKey]
      return [].concat(errors, error.map((msg, j) => (<li key={`${i}.${j}`}>{msg}</li>)))
    }, [])
  }

  render() {
    const { _validation = {} } = this.state
    const { phones = [], onChange } = this.props
    return (
      <div className="example--input">
        <h2>Validating collections</h2>
        {phones.map(({number, ext, name}, i) => (
          <div key={i}>
            <h4>{name}</h4>
            <input onChange={onChange(i, phones)} name="number" value={number} placeholder="Phone Number"/>
            <input value={ext} onChange={onChange(i, phones)} name="ext" placeholder="Phone Ext"/>
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

const mapStateToProps = state => {
  return {
    phones: state.phones
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange(i, phones) {
      const phone = Object.assign({}, phones[i])
      return (event) => {
        const { value, name } = event.target
        phone[name] = value

        const modifiedPhones = phones.slice()
        modifiedPhones.splice(i, 1, phone)

        dispatch({type: SET_PHONES, phones: modifiedPhones})
      }
    }
  }
}

const validationOptions = {
  inspect: {
    on: 'props',
    attrs: 'phones.1.number'
  },
  constraint: {
    presence: true
  }
}

const ReduxInput = connect(mapStateToProps, mapDispatchToProps)(withValidations(Input, validationOptions))

const App = () => (
  <Provider store={createStore(reducer)}>
    <ReduxInput/>
  </Provider>
)

export default App
