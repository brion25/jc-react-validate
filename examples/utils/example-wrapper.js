import './examples-styles.scss'
import React from 'react'
import { render } from 'react-dom'

const Example = require(`../${EXAMPLE_TO_SERVE}`).default

const ExampleWrapper = () => (
  <div className="example">
    <Example/>
  </div>
)

setTimeout(() => {
  const node = document.createElement('div')
  document.body.appendChild(node)

  render(<ExampleWrapper/>, node)
}, 0)
