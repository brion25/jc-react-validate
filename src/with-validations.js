import stateWrapper from './state-wrapper'
import propsWrapper from './props-wrapper'
import _isEmpty from 'lodash/isEmpty'

function withValidations(WrappedComponent, {inspect, constraint, format = 'grouped'}) {
  if (_isEmpty(inspect)) {
    throw new Error('inspect must be defined')
  }

  switch (inspect.on) {
  case 'state':
    return stateWrapper(WrappedComponent, inspect, constraint, format)
  case 'props':
    return propsWrapper(WrappedComponent, inspect, constraint, format)
  default:
    return WrappedComponent
  }
}

export default withValidations
