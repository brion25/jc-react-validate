import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import { withValidations } from '../index'

const SET_INPUT = 'SET_INPUT'

const defaultState = {
  input: ''
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_INPUT:
      return Object.assign({}, state, {
        input: action.input
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

  render() {
    const { input, onChange, _validation = {} } = this.props
    return (
      <div className="example--redux">
        <h2>Redux Input Example</h2>
        <input value={input} onChange={({target}) => onChange(target.value)} />
        {
          _validation.input&&
          <ul className="errors-list">
            {_validation.input.map((msg, i) => (<li key={i}>{msg}</li>))}
          </ul>
        }
        <div>
          <h4>Component props</h4>
          <pre>
            {JSON.stringify(this.props)}
          </pre>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    input: state.input
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange(input) {
      dispatch({type: SET_INPUT, input})
    }
  }
}

const validationOptions = {
  inspect: {
    on: 'props',
    addErrorsTo: 'props',
    attrs: 'input'
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
