export function castArray(value) {
  return [].concat(value)
}

export function get(obj, path, def = '') {
  const value = path.split('.').reduce((_obj, _path) => {
    if (_obj && _obj[_path]) {
      return _obj[_path]
    }

    return null
  }, obj)

  return value || def
}

export function sanitizeKey(key) {
  return key.replace(/\./g, '*')
}

export function unsanitizeKey(key) {
  return key.replace(/\*/g, '.')
}

export function parseValidations(validation) {
  return Object.keys(validation).reduce((_validation, v) => {
    return Object.assign({}, _validation, {
      [unsanitizeKey(v)]: validation[v]
    })
  }, {})
}
