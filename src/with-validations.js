import stateWrapper from './state-wrapper'
import propsWrapper from './props-wrapper'
import _isEmpty from 'lodash/isEmpty'

function withValidations(WrappedComponent, {inspect, constraint}) {
  if (_isEmpty(inspect)) {
    throw new Error('inspect must be defined')
  }

  switch (inspect.on) {
    case 'state':
      return stateWrapper(WrappedComponent, inspect, constraint)
    case 'props':
      return propsWrapper(WrappedComponent, inspect, constraint)
    default:
      return WrappedComponent
  }
}

export default withValidations
