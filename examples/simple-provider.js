import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Validate } from '../src/index'

class InputWithValidateInContext extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: ''
    }
  }



  render() {
    const errors = this.context.validate(this.state, 'input')
    const isNotValid = !!errors

    return (
      <div>
        <h2>Example with Validate in the context</h2>
        <input onChange={({target}) => this.setState({input: target.value})}/>
        {isNotValid &&
          <div>
            <h4>There are some errors:</h4>
            {errors.input.map((msg, i) => <p key={i}>{msg}</p>)}
          </div>
        }
      </div>
    )
  }
}

InputWithValidateInContext.contextTypes = {
  validate: PropTypes.func.isRequired
}

class InputWithValidateInProps extends Component {
  constructor(props) {
    super(props)

    this.state= {
      input: ''
    }
  }

  render() {
    const errors = this.props.validate(this.state, 'input')
    const isNotValid = !!errors

    return (
      <div>
        <h2>Example with Validate in the props</h2>
        <input onChange={({target}) => this.setState({input: target.value})}/>
        {isNotValid &&
        <div>
          <h4>There are some errors:</h4>
          {errors.input.map((msg, i) => <p key={i}>{msg}</p>)}
        </div>
        }
      </div>
    )
  }
}

const SimpleProvider = () => {
  const constraint = {
    presence: true
  }

  return (
    <div>
      <Validate constraint={constraint}>
        <InputWithValidateInContext/>
      </Validate>
      <Validate constraint={constraint} passOnProps={true}>
        <InputWithValidateInProps/>
      </Validate>
    </div>
  )
}

export default SimpleProvider
